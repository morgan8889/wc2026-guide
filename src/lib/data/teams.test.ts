import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock the prisma module
vi.mock("@/lib/prisma", () => ({
	prisma: {
		team: {
			findMany: vi.fn(),
			findUnique: vi.fn(),
		},
	},
}));

import { prisma } from "@/lib/prisma";
import { getConfederations, getGroups, getTeamByCode, getTeams } from "./teams";

const mockTeams = [
	{
		id: "1",
		name: "Morocco",
		code: "MAR",
		flag: "🇲🇦",
		group: "A",
		confederation: "CAF",
		ranking: 14,
		coach: "Walid Regragui",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "2",
		name: "Croatia",
		code: "CRO",
		flag: "🇭🇷",
		group: "A",
		confederation: "UEFA",
		ranking: 10,
		coach: "Zlatko Dalic",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "3",
		name: "USA",
		code: "USA",
		flag: "🇺🇸",
		group: "B",
		confederation: "CONCACAF",
		ranking: 11,
		coach: "Mauricio Pochettino",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

describe("getTeams", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("returns all teams with no params", async () => {
		vi.mocked(prisma.team.findMany).mockResolvedValue(mockTeams);

		const teams = await getTeams();

		expect(prisma.team.findMany).toHaveBeenCalledWith({
			where: {},
			orderBy: [{ group: "asc" }, { name: "asc" }],
		});
		expect(teams).toEqual(mockTeams);
	});

	it("filters by group", async () => {
		const groupATeams = mockTeams.filter((t) => t.group === "A");
		vi.mocked(prisma.team.findMany).mockResolvedValue(groupATeams);

		const teams = await getTeams({ group: "A" });

		expect(prisma.team.findMany).toHaveBeenCalledWith({
			where: { group: "A" },
			orderBy: [{ group: "asc" }, { name: "asc" }],
		});
		expect(teams).toEqual(groupATeams);
	});

	it("filters by confederation", async () => {
		const uefaTeams = mockTeams.filter((t) => t.confederation === "UEFA");
		vi.mocked(prisma.team.findMany).mockResolvedValue(uefaTeams);

		const teams = await getTeams({ confederation: "UEFA" });

		expect(prisma.team.findMany).toHaveBeenCalledWith({
			where: { confederation: "UEFA" },
			orderBy: [{ group: "asc" }, { name: "asc" }],
		});
		expect(teams).toEqual(uefaTeams);
	});

	it("filters by search term", async () => {
		const morTeams = mockTeams.filter((t) => t.name.includes("Morocco"));
		vi.mocked(prisma.team.findMany).mockResolvedValue(morTeams);

		const teams = await getTeams({ search: "Morocco" });

		expect(prisma.team.findMany).toHaveBeenCalledWith({
			where: { name: { contains: "Morocco" } },
			orderBy: [{ group: "asc" }, { name: "asc" }],
		});
		expect(teams).toEqual(morTeams);
	});

	it("combines group and confederation filters", async () => {
		vi.mocked(prisma.team.findMany).mockResolvedValue([]);

		await getTeams({ group: "A", confederation: "UEFA" });

		expect(prisma.team.findMany).toHaveBeenCalledWith({
			where: { group: "A", confederation: "UEFA" },
			orderBy: [{ group: "asc" }, { name: "asc" }],
		});
	});
});

describe("getTeamByCode", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("returns team by code (uppercase)", async () => {
		// findUnique returns null | team; use null to verify the flow easily
		vi.mocked(prisma.team.findUnique).mockResolvedValue(null);

		const team = await getTeamByCode("mar");

		expect(prisma.team.findUnique).toHaveBeenCalledWith({
			where: { code: "MAR" },
			include: expect.objectContaining({
				players: expect.any(Object),
				homeMatches: expect.any(Object),
				awayMatches: expect.any(Object),
			}),
		});
		expect(team).toBeNull();
	});

	it("returns null when team not found", async () => {
		vi.mocked(prisma.team.findUnique).mockResolvedValue(null);

		const team = await getTeamByCode("XYZ");
		expect(team).toBeNull();
	});
});

describe("getGroups", () => {
	it("returns sorted unique groups", async () => {
		vi.mocked(prisma.team.findMany).mockResolvedValue([
			{ group: "A" } as (typeof mockTeams)[0],
			{ group: "B" } as (typeof mockTeams)[0],
		]);

		const groups = await getGroups();

		expect(prisma.team.findMany).toHaveBeenCalledWith({
			select: { group: true },
			distinct: ["group"],
			orderBy: { group: "asc" },
		});
		expect(groups).toEqual(["A", "B"]);
	});
});

describe("getConfederations", () => {
	it("returns sorted unique confederations", async () => {
		vi.mocked(prisma.team.findMany).mockResolvedValue([
			{ confederation: "CAF" } as (typeof mockTeams)[0],
			{ confederation: "UEFA" } as (typeof mockTeams)[0],
		]);

		const confederations = await getConfederations();

		expect(confederations).toEqual(["CAF", "UEFA"]);
	});
});
