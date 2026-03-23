import { cache } from "react";
import { prisma } from "@/lib/prisma";

export interface VenuesParams {
	country?: string;
	search?: string;
}

export async function getVenues(params?: VenuesParams) {
	const { country, search } = params ?? {};

	return prisma.venue.findMany({
		where: {
			...(country ? { country } : {}),
			...(search
				? {
						// Note: SQLite `contains` is case-sensitive (mode: 'insensitive' is PostgreSQL-only)
						OR: [
							{ name: { contains: search } },
							{ city: { contains: search } },
						],
					}
				: {}),
		},
		orderBy: [{ country: "asc" }, { name: "asc" }],
	});
}

export const getVenueById = cache(async (id: string) => {
	return prisma.venue.findUnique({
		where: { id },
		include: {
			matches: {
				include: {
					homeTeam: {
						select: { id: true, name: true, flag: true, code: true },
					},
					awayTeam: {
						select: { id: true, name: true, flag: true, code: true },
					},
				},
				orderBy: { dateTime: "asc" },
			},
		},
	});
});

export async function getCountries(): Promise<string[]> {
	const venues = await prisma.venue.findMany({
		select: { country: true },
		distinct: ["country"],
		orderBy: { country: "asc" },
	});
	return venues.map((v) => v.country);
}

export async function getVenueCount(): Promise<number> {
	return prisma.venue.count();
}
