import { describe, expect, it } from "vitest";
import { OFFICIAL_MATCHES, TEAMS, VENUES } from "./seed";

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

	describe("Official Group Stage Matches", () => {
		const venueNames = new Set(VENUES.map((v) => v.name));
		const teamCodes = new Set(TEAMS.map((t) => t.code));

		it("should have exactly 72 group stage matches (6 per group × 12 groups)", () => {
			expect(OFFICIAL_MATCHES).toHaveLength(72);
		});

		it("should have 6 matches per group", () => {
			for (const group of GROUPS) {
				const groupMatches = OFFICIAL_MATCHES.filter((m) => m.group === group);
				expect(groupMatches).toHaveLength(6);
			}
		});

		it("should have sequential match numbers 1 through 72", () => {
			const numbers = OFFICIAL_MATCHES.map((m) => m.matchNumber).sort(
				(a, b) => a - b,
			);
			expect(numbers).toEqual(Array.from({ length: 72 }, (_, i) => i + 1));
		});

		it("should only reference valid team codes", () => {
			for (const match of OFFICIAL_MATCHES) {
				expect(teamCodes).toContain(match.homeTeamCode);
				expect(teamCodes).toContain(match.awayTeamCode);
			}
		});

		it("should only reference valid venue names", () => {
			for (const match of OFFICIAL_MATCHES) {
				expect(venueNames).toContain(match.venueName);
			}
		});

		it("each team plays exactly 3 matches in their group", () => {
			for (const group of GROUPS) {
				const groupTeams = TEAMS.filter((t) => t.group === group);
				const groupMatches = OFFICIAL_MATCHES.filter((m) => m.group === group);
				for (const team of groupTeams) {
					const appearances = groupMatches.filter(
						(m) => m.homeTeamCode === team.code || m.awayTeamCode === team.code,
					).length;
					expect(appearances).toBe(3);
				}
			}
		});

		it("all match dates should fall within the group stage window (Jun 11–28, 2026)", () => {
			const start = new Date("2026-06-11T00:00:00Z");
			const end = new Date("2026-06-29T00:00:00Z");
			for (const match of OFFICIAL_MATCHES) {
				expect(match.dateTime >= start).toBe(true);
				expect(match.dateTime < end).toBe(true);
			}
		});
	});
});
