import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QuickLinks } from "./QuickLinks";

vi.mock("next/link", () => ({
	default: ({
		children,
		href,
	}: {
		children: React.ReactNode;
		href: string;
	}) => <a href={href}>{children}</a>,
}));

describe("QuickLinks", () => {
	it("renders all four navigation links", () => {
		render(<QuickLinks />);
		expect(screen.getByRole("link", { name: /Teams/i })).toHaveAttribute(
			"href",
			"/teams",
		);
		expect(screen.getByRole("link", { name: /Venues/i })).toHaveAttribute(
			"href",
			"/venues",
		);
		expect(screen.getByRole("link", { name: /Schedule/i })).toHaveAttribute(
			"href",
			"/matches",
		);
		expect(screen.getByRole("link", { name: /Groups/i })).toHaveAttribute(
			"href",
			"/groups",
		);
	});

	it("renders descriptions for each link", () => {
		render(<QuickLinks />);
		expect(screen.getByText(/All 48 qualified/)).toBeInTheDocument();
		expect(screen.getByText(/16 stadiums/)).toBeInTheDocument();
		expect(screen.getByText(/Full match schedule/)).toBeInTheDocument();
		expect(screen.getByText(/Group standings/)).toBeInTheDocument();
	});

	it("renders the section heading", () => {
		render(<QuickLinks />);
		expect(
			screen.getByRole("heading", { name: /Explore/i }),
		).toBeInTheDocument();
	});
});
