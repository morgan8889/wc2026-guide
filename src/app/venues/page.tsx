export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Suspense } from "react";
import { CountryFilter } from "@/components/venues/CountryFilter";
import { VenueGrid } from "@/components/venues/VenueGrid";
import { VenueSearch } from "@/components/venues/VenueSearch";
import { getCountries, getVenues } from "@/lib/data/venues";

export const metadata: Metadata = {
	title: "Venues — World Cup 2026 Guide",
	description: "All 16 stadiums hosting FIFA World Cup 2026",
};

interface VenuesPageProps {
	searchParams: Promise<{
		country?: string;
		search?: string;
	}>;
}

export default async function VenuesPage({ searchParams }: VenuesPageProps) {
	const params = await searchParams;
	const { country, search } = params;

	const [venues, countries] = await Promise.all([
		getVenues({ country, search }),
		getCountries(),
	]);

	return (
		<div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
			<header className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
					Venues
				</h1>
				<p className="mt-1 text-zinc-500 dark:text-zinc-400">
					{venues.length} of 16 stadiums · FIFA World Cup 2026
				</p>
			</header>

			{/* Filters */}
			<div className="mb-6 flex flex-col gap-4">
				<Suspense fallback={null}>
					<CountryFilter countries={countries} selectedCountry={country} />
				</Suspense>
				<Suspense fallback={null}>
					<VenueSearch defaultValue={search} />
				</Suspense>
			</div>

			{/* Grid */}
			<VenueGrid venues={venues} />
		</div>
	);
}
