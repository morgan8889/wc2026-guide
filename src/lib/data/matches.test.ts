import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/prisma", () => ({
	prisma: {
		match: {
			findMany: vi.fn(),
			findUnique: vi.fn(),
			count: vi.fn(),
		},
	},
}));

import { prisma } from "@/lib/prisma";
import {
	getMatchById,
	getMatchCount,
	getMatches,
	getMatchesByGroup,
	getRecentMatches,
	getStages,
	getUpcomingMatches,
} from "./matches";

const mockVenue = {
	id: "v1",
	name: "SoFi Stadium",
	city: "Los Angeles",
	country: "USA",
};

const mockHomeTeam = {
	id: "t1",
	name: "USA",
	flag: "🇺🇸",
	code: "USA",
};

const mockAwayTeam = {
	id: "t2",
	name: "Mexico",
	flag: "🇲🇽",
	code: "MEX",
};

const mockMatch = {
	id: "m1",
	matchNumber: 1,
	stage: "GROUP",
	group: "A",
	dateTime: new Date("2026-06-11T18:00:00Z"),
	homeTeamId: "t1",
	awayTeamId: "t2",
	homeScore: null,
	awayScore: null,
	homePenalties: null,
	awayPenalties: null,
	status: "SCHEDULED",
	venueId: "v1",
	homeTeam: mockHomeTeam,
	awayTeam: mockAwayTeam,
	venue: mockVenue,
	createdAt: new Date(),
	updatedAt: new Date(),
};

const mockMatch2 = {
	...mockMatch,
	id: "m2",
	matchNumber: 2,
	group: "B",
	dateTime: new Date("2026-06-12T18:00:00Z"),
};

describe("getMatches", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("returns all matches with no params", async () => {
		vi.mocked(prisma.match.findMany).mockResolvedValue([mockMatch]);

		const matches = await getMatches();

		expect(prisma.match.findMany).toHaveBeenCalledWith(
			expect.objectContaining({
				where: {},
				orderBy: [{ dateTime: "asc" }, { matchNumber: "asc" }],
			}),
		);
		expect(matches).toEqual([mockMatch]);
	});

	it("filters by group", async () => {
		vi.mocked(prisma.match.findMany).mockResolvedValue([mockMatch]);

		await getMatches({ group: "A" });

		expect(prisma.match.findMany).toHaveBeenCalledWith(
			expect.objectContaining({
				where: { group: "A" },
			}),
		);
	});

	it("filters by stage", async () => {
		vi.mocked(prisma.match.findMany).mockResolvedValue([mockMatch]);

		await getMatches({ stage: "GROUP" });

		expect(prisma.match.findMany).toHaveBeenCalledWith(
			expect.objectContaining({
				where: { stage: "GROUP" },
			}),
		);
	});

	it("filters by venueId", async () => {
		vi.mocked(prisma.match.findMany).mockResolvedValue([mockMatch]);

		await getMatches({ venueId: "v1" });

		expect(prisma.match.findMany).toHaveBeenCalledWith(
			expect.objectContaining({
				where: { venueId: "v1" },
			}),
		);
	});

	it("filters by teamId (home or away)", async () => {
		vi.mocked(prisma.match.findMany).mockResolvedValue([mockMatch]);

		await getMatches({ teamId: "t1" });

		expect(prisma.match.findMany).toHaveBeenCalledWith(
			expect.objectContaining({
				where: { OR: [{ homeTeamId: "t1" }, { awayTeamId: "t1" }] },
			}),
		);
	});

	it("filters by date range", async () => {
		vi.mocked(prisma.match.findMany).mockResolvedValue([mockMatch]);

		await getMatches({ dateFrom: "2026-06-11", dateTo: "2026-06-30" });

		expect(prisma.match.findMany).toHaveBeenCalledWith(
			expect.objectContaining({
				where: {
					dateTime: {
						gte: new Date("2026-06-11"),
						lte: new Date("2026-06-30"),
					},
				},
			}),
		);
	});
});

describe("getMatchById", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("returns match by id", async () => {
		vi.mocked(prisma.match.findUnique).mockResolvedValue(mockMatch);

		const match = await getMatchById("m1");

		expect(prisma.match.findUnique).toHaveBeenCalledWith(
			expect.objectContaining({ where: { id: "m1" } }),
		);
		expect(match).toEqual(mockMatch);
	});

	it("returns null when match not found", async () => {
		vi.mocked(prisma.match.findUnique).mockResolvedValue(null);

		const match = await getMatchById("nope");
		expect(match).toBeNull();
	});
});

describe("getMatchesByGroup", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("groups matches by group letter", async () => {
		vi.mocked(prisma.match.findMany).mockResolvedValue([mockMatch, mockMatch2]);

		const grouped = await getMatchesByGroup();

		expect(grouped.A).toHaveLength(1);
		expect(grouped.B).toHaveLength(1);
		expect(grouped.A[0].id).toBe("m1");
	});

	it("only queries GROUP stage matches", async () => {
		vi.mocked(prisma.match.findMany).mockResolvedValue([]);

		await getMatchesByGroup();

		expect(prisma.match.findMany).toHaveBeenCalledWith(
			expect.objectContaining({
				where: { stage: "GROUP" },
			}),
		);
	});
});

describe("getStages", () => {
	it("returns distinct stages", async () => {
		vi.mocked(prisma.match.findMany).mockResolvedValue([
			{ stage: "GROUP" } as typeof mockMatch,
			{ stage: "ROUND_OF_16" } as typeof mockMatch,
		]);

		const stages = await getStages();

		expect(prisma.match.findMany).toHaveBeenCalledWith(
			expect.objectContaining({
				select: { stage: true },
				distinct: ["stage"],
			}),
		);
		expect(stages).toEqual(["GROUP", "ROUND_OF_16"]);
	});
});

describe("getUpcomingMatches", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("queries scheduled matches from now with a limit", async () => {
		vi.mocked(prisma.match.findMany).mockResolvedValue([mockMatch]);

		const matches = await getUpcomingMatches(5);

		expect(prisma.match.findMany).toHaveBeenCalledWith(
			expect.objectContaining({
				where: expect.objectContaining({ status: "SCHEDULED" }),
				orderBy: { dateTime: "asc" },
				take: 5,
			}),
		);
		expect(matches).toEqual([mockMatch]);
	});
});

describe("getRecentMatches", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("queries completed matches ordered desc with a limit", async () => {
		vi.mocked(prisma.match.findMany).mockResolvedValue([mockMatch]);

		const matches = await getRecentMatches(5);

		expect(prisma.match.findMany).toHaveBeenCalledWith(
			expect.objectContaining({
				where: { status: "COMPLETED" },
				orderBy: { dateTime: "desc" },
				take: 5,
			}),
		);
		expect(matches).toEqual([mockMatch]);
	});
});

describe("getMatchCount", () => {
	it("returns count", async () => {
		vi.mocked(prisma.match.count).mockResolvedValue(104);

		const count = await getMatchCount();
		expect(count).toBe(104);
	});
});
