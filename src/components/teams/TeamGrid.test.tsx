import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TeamGrid } from "./TeamGrid";

vi.mock("next/link", () => ({
	default: ({
		children,
		href,
	}: {
		children: React.ReactNode;
		href: string;
	}) => <a href={href}>{children}</a>,
}));

const mockTeams = [
	{
		id: "1",
		name: "Morocco",
		code: "MAR",
		flag: "🇲🇦",
		group: "A",
		confederation: "CAF",
		ranking: 14,
	},
	{
		id: "2",
		name: "Croatia",
		code: "CRO",
		flag: "🇭🇷",
		group: "A",
		confederation: "UEFA",
		ranking: 10,
	},
];

describe("TeamGrid", () => {
	it("renders all team cards", () => {
		render(<TeamGrid teams={mockTeams} />);
		expect(screen.getByText("Morocco")).toBeInTheDocument();
		expect(screen.getByText("Croatia")).toBeInTheDocument();
	});

	it("shows empty state when no teams", () => {
		render(<TeamGrid teams={[]} />);
		expect(screen.getByText("No teams found")).toBeInTheDocument();
		expect(
			screen.getByText("Try adjusting your filters or search term."),
		).toBeInTheDocument();
	});
});
