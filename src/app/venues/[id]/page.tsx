export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVenueById } from "@/lib/data/venues";

interface VenueDetailPageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({
	params,
}: VenueDetailPageProps): Promise<Metadata> {
	const { id } = await params;
	const venue = await getVenueById(id);
	if (!venue) return { title: "Venue not found" };
	return {
		title: `${venue.name} — World Cup 2026 Guide`,
		description: `${venue.name} in ${venue.city}, ${venue.country}. Capacity: ${venue.capacity.toLocaleString()}`,
	};
}

const STAGE_LABELS: Record<string, string> = {
	GROUP: "Group Stage",
	ROUND_OF_32: "Round of 32",
	ROUND_OF_16: "Round of 16",
	QUARTER: "Quarter-final",
	SEMI: "Semi-final",
	THIRD_PLACE: "Third Place",
	FINAL: "Final",
};

export default async function VenueDetailPage({
	params,
}: VenueDetailPageProps) {
	const { id } = await params;
	const venue = await getVenueById(id);

	if (!venue) {
		notFound();
	}

	const mapsUrl =
		venue.latitude != null && venue.longitude != null
			? `https://www.google.com/maps?q=${venue.latitude},${venue.longitude}`
			: null;

	return (
		<div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
			{/* Back link */}
			<Link
				href="/venues"
				className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
			>
				<span aria-hidden="true">←</span>
				All Venues
			</Link>

			{/* Venue header */}
			<div className="mt-4">
				<h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
					{venue.name}
				</h1>
				<p className="mt-1 text-zinc-500 dark:text-zinc-400">
					{venue.city}, {venue.country}
				</p>
			</div>

			{/* Venue details */}
			<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<InfoCard label="City" value={venue.city} />
				<InfoCard label="Country" value={venue.country} />
				<InfoCard label="Capacity" value={venue.capacity.toLocaleString()} />
				{venue.timezone && <InfoCard label="Timezone" value={venue.timezone} />}
			</div>

			{/* Google Maps link */}
			{mapsUrl && (
				<div className="mt-6">
					<a
						href={mapsUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
					>
						<span aria-hidden="true">📍</span>
						View on Google Maps
					</a>
				</div>
			)}

			{/* Matches */}
			<section aria-labelledby="matches-heading" className="mt-10">
				<h2
					id="matches-heading"
					className="text-xl font-semibold text-zinc-900 dark:text-zinc-100"
				>
					Matches
				</h2>

				{venue.matches.length === 0 ? (
					<p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
						No matches scheduled yet.
					</p>
				) : (
					<ul className="mt-4 divide-y divide-zinc-200 dark:divide-zinc-700">
						{venue.matches.map((match) => {
							const date = new Date(match.dateTime);
							const dateStr = date.toLocaleDateString("en-US", {
								weekday: "short",
								year: "numeric",
								month: "short",
								day: "numeric",
							});
							const timeStr = date.toLocaleTimeString("en-US", {
								hour: "2-digit",
								minute: "2-digit",
							});

							return (
								<li
									key={match.id}
									className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
								>
									<div className="flex flex-col gap-0.5">
										<span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
											{match.homeTeam
												? `${match.homeTeam.flag ?? ""} ${match.homeTeam.name}`
												: "TBD"}{" "}
											<span className="text-zinc-400">vs</span>{" "}
											{match.awayTeam
												? `${match.awayTeam.flag ?? ""} ${match.awayTeam.name}`
												: "TBD"}
										</span>
										<span className="text-xs text-zinc-500 dark:text-zinc-400">
											{dateStr} · {timeStr}
										</span>
									</div>
									<span className="inline-flex shrink-0 items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-500/20">
										{STAGE_LABELS[match.stage] ?? match.stage}
										{match.group ? ` · Group ${match.group}` : ""}
									</span>
								</li>
							);
						})}
					</ul>
				)}
			</section>
		</div>
	);
}

function InfoCard({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
			<p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
				{label}
			</p>
			<p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
				{value}
			</p>
		</div>
	);
}
