import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { TeamStanding } from "@/lib/data/groups";
import { GroupOverview } from "./GroupOverview";

vi.mock("next/link", () => ({
	default: ({
		children,
		href,
	}: {
		children: React.ReactNode;
		href: string;
	}) => <a href={href}>{children}</a>,
}));

const makeStanding = (
	teamId: string,
	name: string,
	points: number,
): TeamStanding => ({
	teamId,
	name,
	code: name.toUpperCase().slice(0, 3),
	flag: "🏳",
	played: 0,
	won: 0,
	drawn: 0,
	lost: 0,
	goalsFor: 0,
	goalsAgainst: 0,
	goalDifference: 0,
	points,
});

const standings: Record<string, TeamStanding[]> = {
	A: [
		makeStanding("t1", "USA", 6),
		makeStanding("t2", "Mexico", 3),
		makeStanding("t3", "Canada", 1),
		makeStanding("t4", "Poland", 0),
	],
	B: [
		makeStanding("t5", "Brazil", 9),
		makeStanding("t6", "Germany", 6),
		makeStanding("t7", "Japan", 3),
		makeStanding("t8", "Morocco", 0),
	],
};

describe("GroupOverview", () => {
	it("renders the section heading", () => {
		render(<GroupOverview standings={standings} />);
		expect(
			screen.getByRole("heading", { name: /Group Standings/i }),
		).toBeInTheDocument();
	});

	it("renders a group card for each group", () => {
		render(<GroupOverview standings={standings} />);
		expect(screen.getByText("Group A")).toBeInTheDocument();
		expect(screen.getByText("Group B")).toBeInTheDocument();
	});

	it("renders team names in each group", () => {
		render(<GroupOverview standings={standings} />);
		expect(screen.getByText("USA")).toBeInTheDocument();
		expect(screen.getByText("Brazil")).toBeInTheDocument();
	});

	it("renders team points", () => {
		render(<GroupOverview standings={standings} />);
		// "6" appears twice (USA in group A and Germany in group B)
		expect(screen.getAllByText("6").length).toBeGreaterThanOrEqual(1);
		expect(screen.getByText("9")).toBeInTheDocument();
	});

	it("renders a view all groups link", () => {
		render(<GroupOverview standings={standings} />);
		const viewAllLink = screen.getByRole("link", { name: /View all/i });
		expect(viewAllLink).toHaveAttribute("href", "/groups");
	});

	it("renders details links for each group", () => {
		render(<GroupOverview standings={standings} />);
		const groupALink = screen.getByRole("link", { name: /Group A/i });
		expect(groupALink).toHaveAttribute("href", "/groups/A");
	});
});
