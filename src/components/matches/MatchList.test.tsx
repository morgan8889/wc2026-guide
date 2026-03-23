import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MatchList } from "./MatchList";

vi.mock("next/link", () => ({
	default: ({
		children,
		href,
	}: {
		children: React.ReactNode;
		href: string;
	}) => <a href={href}>{children}</a>,
}));

const makeMatch = (id: string, home: string, away: string) => ({
	id,
	matchNumber: 1,
	stage: "GROUP",
	group: "A",
	dateTime: new Date("2026-06-11T18:00:00Z"),
	homeTeam: { id: "t1", name: home, flag: "🏳", code: "HOM" },
	awayTeam: { id: "t2", name: away, flag: "🏳", code: "AWY" },
	homeScore: null,
	awayScore: null,
	status: "SCHEDULED",
	venue: { id: "v1", name: "Stadium", city: "City", country: "USA" },
});

describe("MatchList", () => {
	it("renders all matches", () => {
		const matches = [
			makeMatch("m1", "USA", "Mexico"),
			makeMatch("m2", "Canada", "France"),
		];
		render(<MatchList matches={matches} />);
		expect(screen.getByText("USA")).toBeInTheDocument();
		expect(screen.getByText("Mexico")).toBeInTheDocument();
		expect(screen.getByText("Canada")).toBeInTheDocument();
		expect(screen.getByText("France")).toBeInTheDocument();
	});

	it("shows empty state when no matches", () => {
		render(<MatchList matches={[]} />);
		expect(screen.getByText("No matches found")).toBeInTheDocument();
	});
});
