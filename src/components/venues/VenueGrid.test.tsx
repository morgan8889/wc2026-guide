import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { VenueGrid } from "./VenueGrid";

vi.mock("next/link", () => ({
	default: ({
		children,
		href,
	}: {
		children: React.ReactNode;
		href: string;
	}) => <a href={href}>{children}</a>,
}));

const mockVenues = [
	{
		id: "v1",
		name: "SoFi Stadium",
		city: "Los Angeles",
		country: "USA",
		capacity: 70240,
	},
	{
		id: "v2",
		name: "Estadio Azteca",
		city: "Mexico City",
		country: "Mexico",
		capacity: 87523,
	},
];

describe("VenueGrid", () => {
	it("renders all venues", () => {
		render(<VenueGrid venues={mockVenues} />);
		expect(screen.getByText("SoFi Stadium")).toBeInTheDocument();
		expect(screen.getByText("Estadio Azteca")).toBeInTheDocument();
	});

	it("renders empty state when no venues", () => {
		render(<VenueGrid venues={[]} />);
		expect(screen.getByText("No venues found")).toBeInTheDocument();
	});

	it("renders empty state hint text", () => {
		render(<VenueGrid venues={[]} />);
		expect(
			screen.getByText("Try adjusting your filters or search term."),
		).toBeInTheDocument();
	});

	it("renders venue links", () => {
		render(<VenueGrid venues={mockVenues} />);
		const links = screen.getAllByRole("link");
		expect(links).toHaveLength(2);
		expect(links[0]).toHaveAttribute("href", "/venues/v1");
		expect(links[1]).toHaveAttribute("href", "/venues/v2");
	});
});
