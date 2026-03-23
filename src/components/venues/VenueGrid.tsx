import { VenueCard } from "./VenueCard";

interface Venue {
	id: string;
	name: string;
	city: string;
	country: string;
	capacity: number;
}

interface VenueGridProps {
	venues: Venue[];
}

export function VenueGrid({ venues }: VenueGridProps) {
	if (venues.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-24 text-center">
				<span className="text-5xl">🔍</span>
				<p className="mt-4 text-lg font-medium text-zinc-600 dark:text-zinc-400">
					No venues found
				</p>
				<p className="text-sm text-zinc-400 dark:text-zinc-500">
					Try adjusting your filters or search term.
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{venues.map((venue) => (
				<VenueCard
					key={venue.id}
					id={venue.id}
					name={venue.name}
					city={venue.city}
					country={venue.country}
					capacity={venue.capacity}
				/>
			))}
		</div>
	);
}
