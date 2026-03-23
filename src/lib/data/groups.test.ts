import type { Match, Team } from "@prisma/client";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/prisma", () => ({
	prisma: {
		team: {
			findMany: vi.fn(),
		},
		match: {
			findMany: vi.fn(),
		},
	},
}));

vi.mock("@/lib/data/teams", () => ({
	getGroups: vi.fn(),
}));

import { getGroups as getGroupLetters } from "@/lib/data/teams";
import { prisma } from "@/lib/prisma";
import { getAllGroupStandings, getGroupStandings } from "./groups";

function makeTeam(overrides: Partial<Team>): Team {
	return {
		id: "t0",
		name: "Team",
		code: "TM0",
		flag: null,
		group: "A",
		confederation: "UEFA",
		ranking: null,
		coach: null,
		createdAt: new Date(),
		updatedAt: new Date(),
		...overrides,
	};
}

function makeMatch(overrides: Partial<Match>): Match {
	return {
		id: "m0",
		matchNumber: 1,
		stage: "GROUP",
		group: "A",
		dateTime: new Date(),
		homeTeamId: null,
		awayTeamId: null,
		homeScore: null,
		awayScore: null,
		homePenalties: null,
		awayPenalties: null,
		status: "COMPLETED",
		venueId: "v0",
		createdAt: new Date(),
		updatedAt: new Date(),
		...overrides,
	};
}

const teamA = makeTeam({ id: "t1", name: "USA", code: "USA", flag: "🇺🇸" });
const teamB = makeTeam({ id: "t2", name: "Mexico", code: "MEX", flag: "🇲🇽" });
const teamC = makeTeam({ id: "t3", name: "Canada", code: "CAN", flag: "🇨🇦" });
const teamD = makeTeam({ id: "t4", name: "Panama", code: "PAN", flag: "🇵🇦" });

describe("getGroupStandings", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("returns zeroed standings when no matches are COMPLETED", async () => {
		vi.mocked(prisma.team.findMany).mockResolvedValue([teamA, teamB]);
		vi.mocked(prisma.match.findMany).mockResolvedValue([]);

		const standings = await getGroupStandings("A");

		expect(standings).toHaveLength(2);
		for (const s of standings) {
			expect(s.played).toBe(0);
			expect(s.points).toBe(0);
		}
	});

	it("correctly calculates a win/loss", async () => {
		vi.mocked(prisma.team.findMany).mockResolvedValue([teamA, teamB]);
		vi.mocked(prisma.match.findMany).mockResolvedValue([
			makeMatch({
				homeTeamId: "t1",
				awayTeamId: "t2",
				homeScore: 2,
				awayScore: 1,
			}),
		]);

		const standings = await getGroupStandings("A");

		const usa = standings.find((s) => s.code === "USA");
		const mex = standings.find((s) => s.code === "MEX");

		expect(usa?.points).toBe(3);
		expect(usa?.won).toBe(1);
		expect(usa?.lost).toBe(0);
		expect(usa?.goalsFor).toBe(2);
		expect(usa?.goalsAgainst).toBe(1);
		expect(usa?.goalDifference).toBe(1);

		expect(mex?.points).toBe(0);
		expect(mex?.won).toBe(0);
		expect(mex?.lost).toBe(1);
		expect(mex?.goalsFor).toBe(1);
		expect(mex?.goalsAgainst).toBe(2);
		expect(mex?.goalDifference).toBe(-1);
	});

	it("correctly calculates a draw", async () => {
		vi.mocked(prisma.team.findMany).mockResolvedValue([teamA, teamB]);
		vi.mocked(prisma.match.findMany).mockResolvedValue([
			makeMatch({
				homeTeamId: "t1",
				awayTeamId: "t2",
				homeScore: 1,
				awayScore: 1,
			}),
		]);

		const standings = await getGroupStandings("A");

		for (const s of standings) {
			expect(s.points).toBe(1);
			expect(s.drawn).toBe(1);
			expect(s.won).toBe(0);
			expect(s.lost).toBe(0);
		}
	});

	it("sorts by points desc, then goal difference, then goals for", async () => {
		vi.mocked(prisma.team.findMany).mockResolvedValue([
			teamA,
			teamB,
			teamC,
			teamD,
		]);
		vi.mocked(prisma.match.findMany).mockResolvedValue([
			// USA beats all: 9 pts, GD=+6
			makeMatch({
				homeTeamId: "t1",
				awayTeamId: "t2",
				homeScore: 2,
				awayScore: 0,
			}),
			makeMatch({
				homeTeamId: "t1",
				awayTeamId: "t3",
				homeScore: 2,
				awayScore: 0,
			}),
			makeMatch({
				homeTeamId: "t1",
				awayTeamId: "t4",
				homeScore: 2,
				awayScore: 0,
			}),
			// Mexico beats Canada and Panama: 6 pts
			makeMatch({
				homeTeamId: "t2",
				awayTeamId: "t3",
				homeScore: 1,
				awayScore: 0,
			}),
			makeMatch({
				homeTeamId: "t2",
				awayTeamId: "t4",
				homeScore: 1,
				awayScore: 0,
			}),
			// Canada draws Panama: 1pt each
			makeMatch({
				homeTeamId: "t3",
				awayTeamId: "t4",
				homeScore: 0,
				awayScore: 0,
			}),
		]);

		const standings = await getGroupStandings("A");

		expect(standings[0].code).toBe("USA");
		expect(standings[0].points).toBe(9);
		expect(standings[1].code).toBe("MEX");
		expect(standings[1].points).toBe(6);
		// Canada and Panama both have 1 point; alphabetical tiebreak: CAN < PAN
		expect(standings[2].points).toBe(1);
		expect(standings[2].code).toBe("CAN");
		expect(standings[3].points).toBe(1);
		expect(standings[3].code).toBe("PAN");
	});

	it("accumulates multiple matches for the same team", async () => {
		vi.mocked(prisma.team.findMany).mockResolvedValue([teamA, teamB, teamC]);
		vi.mocked(prisma.match.findMany).mockResolvedValue([
			makeMatch({
				homeTeamId: "t1",
				awayTeamId: "t2",
				homeScore: 2,
				awayScore: 0,
			}),
			makeMatch({
				homeTeamId: "t1",
				awayTeamId: "t3",
				homeScore: 3,
				awayScore: 1,
			}),
		]);

		const standings = await getGroupStandings("A");
		const usa = standings.find((s) => s.code === "USA");

		expect(usa?.played).toBe(2);
		expect(usa?.won).toBe(2);
		expect(usa?.goalsFor).toBe(5);
		expect(usa?.goalsAgainst).toBe(1);
		expect(usa?.goalDifference).toBe(4);
		expect(usa?.points).toBe(6);
	});

	it("returns teams with correct name and code even with no matches", async () => {
		vi.mocked(prisma.team.findMany).mockResolvedValue([teamA, teamB]);
		vi.mocked(prisma.match.findMany).mockResolvedValue([]);

		const standings = await getGroupStandings("A");
		expect(standings).toHaveLength(2);
		const codes = standings.map((s) => s.code);
		expect(codes).toContain("USA");
		expect(codes).toContain("MEX");
	});
});

describe("getAllGroupStandings", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("returns standings for all groups", async () => {
		vi.mocked(getGroupLetters).mockResolvedValue(["A", "B"]);
		vi.mocked(prisma.team.findMany).mockResolvedValue([teamA]);
		vi.mocked(prisma.match.findMany).mockResolvedValue([]);

		const all = await getAllGroupStandings();

		expect(Object.keys(all)).toEqual(["A", "B"]);
		expect(all.A).toHaveLength(1);
		expect(all.B).toHaveLength(1);
	});
});
