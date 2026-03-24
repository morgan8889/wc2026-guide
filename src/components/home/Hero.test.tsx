import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "./Hero";

describe("Hero", () => {
	it("renders the tournament title", () => {
		render(<Hero matchCount={72} />);
		expect(
			screen.getByRole("heading", { name: /FIFA World Cup 2026/i }),
		).toBeInTheDocument();
	});

	it("renders tournament dates", () => {
		render(<Hero matchCount={72} />);
		expect(screen.getByText(/June 11/)).toBeInTheDocument();
		expect(screen.getByText(/July 19/)).toBeInTheDocument();
	});

	it("renders host countries", () => {
		render(<Hero matchCount={72} />);
		expect(screen.getByText(/United States/)).toBeInTheDocument();
		expect(screen.getByText(/Mexico/)).toBeInTheDocument();
		expect(screen.getByText(/Canada/)).toBeInTheDocument();
	});

	it("renders quick stats with dynamic match count", () => {
		render(<Hero matchCount={72} />);
		expect(screen.getByText("48")).toBeInTheDocument();
		expect(screen.getByText("16")).toBeInTheDocument();
		expect(screen.getByText("72")).toBeInTheDocument();
		expect(screen.getByText("Teams")).toBeInTheDocument();
		expect(screen.getByText("Venues")).toBeInTheDocument();
		expect(screen.getByText("Matches")).toBeInTheDocument();
	});
});
