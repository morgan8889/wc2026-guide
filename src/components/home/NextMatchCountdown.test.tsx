import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { MatchWithTeamsAndVenue } from "@/lib/data/matches";
import { NextMatchCountdown } from "./NextMatchCountdown";

function makeMatch(
	overrides: Partial<MatchWithTeamsAndVenue> = {},
): MatchWithTeamsAndVenue {
	return {
		id: "m1",
		matchNumber: 1,
		stage: "GROUP",
		group: "A",
		dateTime: new Date(Date.now() + 3 * 86400 * 1000), // 3 days from now
		homeTeamId: "ht1",
		awayTeamId: "at1",
		homeTeam: { id: "ht1", name: "USA", flag: "🇺🇸", code: "USA" },
		awayTeam: { id: "at1", name: "Mexico", flag: "🇲🇽", code: "MEX" },
		homeScore: null,
		awayScore: null,
		homePenalties: null,
		awayPenalties: null,
		status: "SCHEDULED",
		venueId: "v1",
		venue: {
			id: "v1",
			name: "SoFi Stadium",
			city: "Los Angeles",
			country: "USA",
		},
		createdAt: new Date(),
		updatedAt: new Date(),
		...overrides,
	} as MatchWithTeamsAndVenue;
}

describe("NextMatchCountdown", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("returns null when match is null", () => {
		const { container } = render(<NextMatchCountdown match={null} />);
		expect(container.firstChild).toBeNull();
	});

	it("renders team names and flags", () => {
		render(<NextMatchCountdown match={makeMatch()} />);
		expect(screen.getByText("USA")).toBeInTheDocument();
		expect(screen.getByText("Mexico")).toBeInTheDocument();
	});

	it("renders match number and group stage label", () => {
		render(<NextMatchCountdown match={makeMatch()} />);
		expect(screen.getByText(/Match 1/)).toBeInTheDocument();
		expect(screen.getByText(/Group A/)).toBeInTheDocument();
	});

	it("renders venue name and city", () => {
		render(<NextMatchCountdown match={makeMatch()} />);
		expect(screen.getByText(/SoFi Stadium/)).toBeInTheDocument();
		expect(screen.getByText(/Los Angeles/)).toBeInTheDocument();
	});

	it("renders a countdown with days when match is days away", () => {
		render(<NextMatchCountdown match={makeMatch()} />);
		// 3 days away — should show days in the countdown
		const countdown = screen.getByRole("status");
		expect(countdown.textContent).toMatch(/\d+d/);
	});

	it("shows only minutes and seconds when less than 1 hour away", () => {
		const soonMatch = makeMatch({
			dateTime: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes
		});
		render(<NextMatchCountdown match={soonMatch} />);
		const countdown = screen.getByRole("status");
		expect(countdown.textContent).toMatch(/\d+m \d+s/);
		expect(countdown.textContent).not.toMatch(/\d+d/);
		expect(countdown.textContent).not.toMatch(/\d+h/);
	});

	it("ticks every second", () => {
		const match = makeMatch({
			dateTime: new Date(Date.now() + 2 * 3600 * 1000), // 2 hours
		});
		render(<NextMatchCountdown match={match} />);
		const before = screen.getByRole("status").textContent;
		act(() => {
			vi.advanceTimersByTime(1000);
		});
		const after = screen.getByRole("status").textContent;
		// After 1 second the countdown should have changed
		expect(before).not.toBe(after);
	});

	it("renders non-group stage labels correctly", () => {
		const finalMatch = makeMatch({ stage: "FINAL", group: null });
		render(<NextMatchCountdown match={finalMatch} />);
		expect(screen.getByText(/FINAL/i)).toBeInTheDocument();
	});
});
