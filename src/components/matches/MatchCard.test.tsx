import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MatchCard } from "./MatchCard";

vi.mock("next/link", () => ({
	default: ({
		children,
		href,
	}: {
		children: React.ReactNode;
		href: string;
	}) => <a href={href}>{children}</a>,
}));

const defaultMatch = {
	id: "m1",
	matchNumber: 1,
	stage: "GROUP",
	group: "A",
	dateTime: new Date("2026-06-11T18:00:00Z"),
	homeTeam: { id: "t1", name: "USA", flag: "🇺🇸", code: "USA" },
	awayTeam: { id: "t2", name: "Mexico", flag: "🇲🇽", code: "MEX" },
	homeScore: null,
	awayScore: null,
	status: "SCHEDULED",
	venue: {
		id: "v1",
		name: "SoFi Stadium",
		city: "Los Angeles",
		country: "USA",
	},
};

describe("MatchCard", () => {
	it("renders home team name", () => {
		render(<MatchCard {...defaultMatch} />);
		expect(screen.getByText("USA")).toBeInTheDocument();
	});

	it("renders away team name", () => {
		render(<MatchCard {...defaultMatch} />);
		expect(screen.getByText("Mexico")).toBeInTheDocument();
	});

	it("renders 'vs' for scheduled matches", () => {
		render(<MatchCard {...defaultMatch} />);
		expect(screen.getByText("vs")).toBeInTheDocument();
	});

	it("renders score for completed matches", () => {
		render(
			<MatchCard
				{...defaultMatch}
				status="COMPLETED"
				homeScore={2}
				awayScore={1}
			/>,
		);
		expect(screen.getByText("2 – 1")).toBeInTheDocument();
	});

	it("renders LIVE badge for live matches", () => {
		render(
			<MatchCard {...defaultMatch} status="LIVE" homeScore={1} awayScore={0} />,
		);
		expect(screen.getByText("LIVE")).toBeInTheDocument();
	});

	it("renders venue info", () => {
		render(<MatchCard {...defaultMatch} />);
		expect(screen.getByText(/SoFi Stadium/)).toBeInTheDocument();
	});

	it("renders stage badge with group", () => {
		render(<MatchCard {...defaultMatch} />);
		expect(screen.getByText("Group Stage · Group A")).toBeInTheDocument();
	});

	it("renders stage badge without group for knockout", () => {
		render(<MatchCard {...defaultMatch} stage="FINAL" group={null} />);
		expect(screen.getByText("Final")).toBeInTheDocument();
	});

	it("links to match detail page", () => {
		render(<MatchCard {...defaultMatch} />);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/matches/m1");
	});

	it("renders TBD when teams are null", () => {
		render(<MatchCard {...defaultMatch} homeTeam={null} awayTeam={null} />);
		const tbdElements = screen.getAllByText("TBD");
		expect(tbdElements).toHaveLength(2);
	});
});
