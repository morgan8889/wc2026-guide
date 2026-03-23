import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { UpcomingMatches } from "./UpcomingMatches";

vi.mock("next/link", () => ({
	default: ({
		children,
		href,
	}: {
		children: React.ReactNode;
		href: string;
	}) => <a href={href}>{children}</a>,
}));

vi.mock("@/components/matches/MatchCard", () => ({
	MatchCard: ({
		homeTeam,
		awayTeam,
	}: {
		homeTeam: { name: string } | null;
		awayTeam: { name: string } | null;
	}) => (
		<div data-testid="match-card">
			{homeTeam?.name ?? "TBD"} vs {awayTeam?.name ?? "TBD"}
		</div>
	),
}));

const makeMatch = (id: string, home: string, away: string) => ({
	id,
	matchNumber: Number(id),
	stage: "GROUP",
	group: "A",
	dateTime: new Date("2026-06-15T18:00:00Z"),
	homeTeamId: `h${id}`,
	awayTeamId: `a${id}`,
	homeTeam: { id: `h${id}`, name: home, flag: "🏳", code: home.toUpperCase() },
	awayTeam: { id: `a${id}`, name: away, flag: "🏳", code: away.toUpperCase() },
	homeScore: null,
	awayScore: null,
	homePenalties: null,
	awayPenalties: null,
	status: "SCHEDULED",
	venueId: "v1",
	venue: { id: "v1", name: "Stadium", city: "City", country: "USA" },
	createdAt: new Date(),
	updatedAt: new Date(),
});

describe("UpcomingMatches", () => {
	it("renders the default section heading", () => {
		render(<UpcomingMatches matches={[]} />);
		expect(
			screen.getByRole("heading", { name: /Upcoming Matches/i }),
		).toBeInTheDocument();
	});

	it("renders a custom title when provided", () => {
		render(<UpcomingMatches matches={[]} title="Recent Matches" />);
		expect(
			screen.getByRole("heading", { name: /Recent Matches/i }),
		).toBeInTheDocument();
	});

	it("renders a message when no matches are available", () => {
		render(<UpcomingMatches matches={[]} />);
		expect(screen.getByText(/No upcoming matches/i)).toBeInTheDocument();
	});

	it("renders match cards for each match", () => {
		const matches = [
			makeMatch("1", "USA", "Mexico"),
			makeMatch("2", "Canada", "Brazil"),
		];
		render(<UpcomingMatches matches={matches} />);
		const cards = screen.getAllByTestId("match-card");
		expect(cards).toHaveLength(2);
	});

	it("renders a view all link", () => {
		render(<UpcomingMatches matches={[]} />);
		expect(screen.getByRole("link", { name: /View all/i })).toHaveAttribute(
			"href",
			"/matches",
		);
	});
});
