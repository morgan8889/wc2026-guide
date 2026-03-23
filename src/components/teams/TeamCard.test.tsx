import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TeamCard } from "./TeamCard";

vi.mock("next/link", () => ({
	default: ({
		children,
		href,
	}: {
		children: React.ReactNode;
		href: string;
	}) => <a href={href}>{children}</a>,
}));

describe("TeamCard", () => {
	const defaultProps = {
		code: "MAR",
		name: "Morocco",
		flag: "🇲🇦",
		group: "A",
		confederation: "CAF",
		ranking: 14,
	};

	it("renders team name", () => {
		render(<TeamCard {...defaultProps} />);
		expect(screen.getByText("Morocco")).toBeInTheDocument();
	});

	it("renders team code", () => {
		render(<TeamCard {...defaultProps} />);
		expect(screen.getByText("MAR")).toBeInTheDocument();
	});

	it("renders flag emoji", () => {
		render(<TeamCard {...defaultProps} />);
		expect(screen.getByRole("img", { name: "Morocco" })).toBeInTheDocument();
	});

	it("renders group badge", () => {
		render(<TeamCard {...defaultProps} />);
		expect(screen.getByText("Group A")).toBeInTheDocument();
	});

	it("renders ranking when provided", () => {
		render(<TeamCard {...defaultProps} />);
		expect(screen.getByText("#14")).toBeInTheDocument();
	});

	it("omits ranking when not provided", () => {
		render(<TeamCard {...defaultProps} ranking={null} />);
		expect(screen.queryByText(/#\d+/)).toBeNull();
	});

	it("uses fallback flag when flag is null", () => {
		render(<TeamCard {...defaultProps} flag={null} />);
		expect(screen.getByRole("img", { name: "Morocco" })).toHaveTextContent("🏳");
	});

	it("links to team detail page using lowercase code", () => {
		render(<TeamCard {...defaultProps} />);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/teams/mar");
	});

	it("renders confederation label", () => {
		render(<TeamCard {...defaultProps} />);
		expect(screen.getByText("CAF")).toBeInTheDocument();
	});
});
