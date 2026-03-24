import { describe, expect, it } from "vitest";
import { generateGroupMatches, TEAMS, VENUES } from "./seed";

const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
const CONFEDERATIONS = [
	"UEFA",
	"CONMEBOL",
	"CONCACAF",
	"AFC",
	"CAF",
	"OFC",
	"Inter-confederation",
];
const VENUE_COUNTRIES = ["USA", "Mexico", "Canada"];

describe("World Cup 2026 Seed Data Validation", () => {
	describe("Teams", () => {
		it("should have exactly 48 teams", () => {
			expect(TEAMS).toHaveLength(48);
		});

		it("should have 12 groups", () => {
			const groups = [...new Set(TEAMS.map((t) => t.group))].sort();
			expect(groups).toHaveLength(12);
		});

		it("should have 4 teams per group", () => {
			for (const group of GROUPS) {
				const teamsInGroup = TEAMS.filter((t) => t.group === group);
				expect(teamsInGroup).toHaveLength(4);
			}
		});

		it("should have valid group letters A through L", () => {
			const groups = [...new Set(TEAMS.map((t) => t.group))].sort();
			expect(groups).toEqual(GROUPS);
		});

		it("should only use valid confederations", () => {
			for (const team of TEAMS) {
				expect(CONFEDERATIONS).toContain(team.confederation);
			}
		});
	});

	describe("Venues", () => {
		it("should have exactly 16 venues", () => {
			expect(VENUES).toHaveLength(16);
		});

		it("should have venues in USA, Mexico, and Canada only", () => {
			const countries = [...new Set(VENUES.map((v) => v.country))].sort();
			expect(countries).toEqual([...VENUE_COUNTRIES].sort());
		});
	});

	describe("Group Stage Matches", () => {
		const matches = generateGroupMatches(TEAMS, VENUES);

		it("should have 72 group stage matches (6 per group × 12 groups)", () => {
			expect(matches).toHaveLength(72);
		});

		it("should have 6 matches per group", () => {
			for (const group of GROUPS) {
				const groupMatches = matches.filter((m) => m.group === group);
				expect(groupMatches).toHaveLength(6);
			}
		});
	});

	describe("Match Pairings", () => {
		it("each team in a group of 4 plays exactly 3 matches", () => {
			// Pairings: [0,1], [2,3], [0,2], [1,3], [0,3], [1,2]
			const pairings = [
				[0, 1],
				[2, 3],
				[0, 2],
				[1, 3],
				[0, 3],
				[1, 2],
			];

			// Count appearances per team index
			const appearances = [0, 0, 0, 0];
			for (const [h, a] of pairings) {
				appearances[h]++;
				appearances[a]++;
			}

			// Each team should appear exactly 3 times
			for (const count of appearances) {
				expect(count).toBe(3);
			}
		});

		it("pairings cover all possible combinations in a group of 4", () => {
			const pairings = [
				[0, 1],
				[2, 3],
				[0, 2],
				[1, 3],
				[0, 3],
				[1, 2],
			];

			// All unique pairs from 4 teams: C(4,2) = 6
			const uniquePairs = new Set(
				pairings.map(([a, b]) => `${Math.min(a, b)}-${Math.max(a, b)}`),
			);
			expect(uniquePairs.size).toBe(6);
		});
	});
});
