import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/prisma", () => ({
	prisma: {
		venue: {
			findMany: vi.fn(),
			findUnique: vi.fn(),
		},
	},
}));

import { prisma } from "@/lib/prisma";
import { getCountries, getVenueById, getVenues } from "./venues";

const mockVenues = [
	{
		id: "v1",
		name: "SoFi Stadium",
		city: "Los Angeles",
		country: "USA",
		capacity: 70240,
		imageUrl: null,
		latitude: 33.9534,
		longitude: -118.3392,
		timezone: "America/Los_Angeles",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "v2",
		name: "Estadio Azteca",
		city: "Mexico City",
		country: "Mexico",
		capacity: 87523,
		imageUrl: null,
		latitude: 19.3029,
		longitude: -99.1505,
		timezone: "America/Mexico_City",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
	{
		id: "v3",
		name: "BC Place",
		city: "Vancouver",
		country: "Canada",
		capacity: 54500,
		imageUrl: null,
		latitude: 49.2768,
		longitude: -123.1118,
		timezone: "America/Vancouver",
		createdAt: new Date(),
		updatedAt: new Date(),
	},
];

describe("getVenues", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("returns all venues with no params", async () => {
		vi.mocked(prisma.venue.findMany).mockResolvedValue(mockVenues);

		const venues = await getVenues();

		expect(prisma.venue.findMany).toHaveBeenCalledWith({
			where: {},
			orderBy: [{ country: "asc" }, { name: "asc" }],
		});
		expect(venues).toEqual(mockVenues);
	});

	it("filters by country", async () => {
		const usaVenues = mockVenues.filter((v) => v.country === "USA");
		vi.mocked(prisma.venue.findMany).mockResolvedValue(usaVenues);

		const venues = await getVenues({ country: "USA" });

		expect(prisma.venue.findMany).toHaveBeenCalledWith({
			where: { country: "USA" },
			orderBy: [{ country: "asc" }, { name: "asc" }],
		});
		expect(venues).toEqual(usaVenues);
	});

	it("filters by search term (name)", async () => {
		const filtered = mockVenues.filter((v) => v.name.includes("SoFi"));
		vi.mocked(prisma.venue.findMany).mockResolvedValue(filtered);

		await getVenues({ search: "SoFi" });

		expect(prisma.venue.findMany).toHaveBeenCalledWith({
			where: {
				OR: [{ name: { contains: "SoFi" } }, { city: { contains: "SoFi" } }],
			},
			orderBy: [{ country: "asc" }, { name: "asc" }],
		});
	});

	it("filters by search term (city)", async () => {
		const filtered = mockVenues.filter((v) => v.city.includes("Los Angeles"));
		vi.mocked(prisma.venue.findMany).mockResolvedValue(filtered);

		await getVenues({ search: "Los Angeles" });

		expect(prisma.venue.findMany).toHaveBeenCalledWith({
			where: {
				OR: [
					{ name: { contains: "Los Angeles" } },
					{ city: { contains: "Los Angeles" } },
				],
			},
			orderBy: [{ country: "asc" }, { name: "asc" }],
		});
	});

	it("combines country and search filters", async () => {
		vi.mocked(prisma.venue.findMany).mockResolvedValue([]);

		await getVenues({ country: "USA", search: "Stadium" });

		expect(prisma.venue.findMany).toHaveBeenCalledWith({
			where: {
				country: "USA",
				OR: [
					{ name: { contains: "Stadium" } },
					{ city: { contains: "Stadium" } },
				],
			},
			orderBy: [{ country: "asc" }, { name: "asc" }],
		});
	});
});

describe("getVenueById", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("calls findUnique with correct id and include", async () => {
		vi.mocked(prisma.venue.findUnique).mockResolvedValue(null);

		await getVenueById("v1");

		expect(prisma.venue.findUnique).toHaveBeenCalledWith({
			where: { id: "v1" },
			include: expect.objectContaining({
				matches: expect.any(Object),
			}),
		});
	});

	it("returns null when venue not found", async () => {
		vi.mocked(prisma.venue.findUnique).mockResolvedValue(null);

		const venue = await getVenueById("nonexistent");
		expect(venue).toBeNull();
	});
});

describe("getCountries", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("returns sorted unique countries", async () => {
		vi.mocked(prisma.venue.findMany).mockResolvedValue([
			{ country: "Canada" } as (typeof mockVenues)[0],
			{ country: "Mexico" } as (typeof mockVenues)[0],
			{ country: "USA" } as (typeof mockVenues)[0],
		]);

		const countries = await getCountries();

		expect(prisma.venue.findMany).toHaveBeenCalledWith({
			select: { country: true },
			distinct: ["country"],
			orderBy: { country: "asc" },
		});
		expect(countries).toEqual(["Canada", "Mexico", "USA"]);
	});
});
