import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { VenueCard } from "./VenueCard";

vi.mock("next/link", () => ({
	default: ({
		children,
		href,
	}: {
		children: React.ReactNode;
		href: string;
	}) => <a href={href}>{children}</a>,
}));

describe("VenueCard", () => {
	const defaultProps = {
		id: "v1",
		name: "SoFi Stadium",
		city: "Los Angeles",
		country: "USA",
		capacity: 70240,
	};

	it("renders venue name", () => {
		render(<VenueCard {...defaultProps} />);
		expect(screen.getByText("SoFi Stadium")).toBeInTheDocument();
	});

	it("renders city", () => {
		render(<VenueCard {...defaultProps} />);
		expect(screen.getByText("Los Angeles")).toBeInTheDocument();
	});

	it("renders country badge", () => {
		render(<VenueCard {...defaultProps} />);
		expect(screen.getByText("USA")).toBeInTheDocument();
	});

	it("renders formatted capacity", () => {
		render(<VenueCard {...defaultProps} />);
		expect(screen.getByText("70,240 capacity")).toBeInTheDocument();
	});

	it("renders USA flag for USA venues", () => {
		render(<VenueCard {...defaultProps} />);
		expect(screen.getByRole("img", { name: "USA" })).toBeInTheDocument();
	});

	it("renders Mexico flag for Mexico venues", () => {
		render(<VenueCard {...defaultProps} country="Mexico" />);
		expect(screen.getByRole("img", { name: "Mexico" })).toBeInTheDocument();
	});

	it("renders Canada flag for Canada venues", () => {
		render(<VenueCard {...defaultProps} country="Canada" />);
		expect(screen.getByRole("img", { name: "Canada" })).toBeInTheDocument();
	});

	it("links to venue detail page", () => {
		render(<VenueCard {...defaultProps} />);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "/venues/v1");
	});
});
