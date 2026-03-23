export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { STAGE_LABELS } from "@/components/matches/MatchCard";
import { getMatchById } from "@/lib/data/matches";

interface MatchDetailPageProps {
	params: Promise<{ id: string }>;
}

export async function generateMetadata({
	params,
}: MatchDetailPageProps): Promise<Metadata> {
	const { id } = await params;
	const match = await getMatchById(id);
	if (!match) return { title: "Match not found" };
	const home = match.homeTeam?.name ?? "TBD";
	const away = match.awayTeam?.name ?? "TBD";
	return {
		title: `${home} vs ${away} — World Cup 2026 Guide`,
		description: `Match ${match.matchNumber}: ${home} vs ${away} at ${match.venue.name}`,
	};
}

export default async function MatchDetailPage({
	params,
}: MatchDetailPageProps) {
	const { id } = await params;
	const match = await getMatchById(id);

	if (!match) {
		notFound();
	}

	const stageLabel = STAGE_LABELS[match.stage] ?? match.stage;
	const fullStageLabel = match.group
		? `${stageLabel} · Group ${match.group}`
		: stageLabel;

	const isCompleted = match.status === "COMPLETED";
	const isLive = match.status === "LIVE";

	const dateStr = match.dateTime.toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	});
	const timeStr = match.dateTime.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});

	return (
		<div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
			{/* Back link */}
			<Link
				href="/matches"
				className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
			>
				<span aria-hidden="true">←</span>
				All Matches
			</Link>

			{/* Stage + match number */}
			<div className="mt-4 flex items-center gap-3">
				<span className="inline-flex items-center rounded-md bg-blue-50 px-2.5 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-500/20">
					{fullStageLabel}
				</span>
				{isLive && (
					<span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2.5 py-1 text-sm font-semibold text-red-600 ring-1 ring-inset ring-red-600/10 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-500/20">
						<span
							className="inline-block h-2 w-2 rounded-full bg-red-500"
							aria-hidden="true"
						/>
						LIVE
					</span>
				)}
				<span className="text-sm text-zinc-400 dark:text-zinc-500">
					Match #{match.matchNumber}
				</span>
			</div>

			{/* Match header: teams + score */}
			<div className="mt-6 flex items-center gap-4 sm:gap-8">
				{/* Home team */}
				<div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center">
					<span
						className="text-5xl leading-none sm:text-6xl"
						aria-hidden="true"
					>
						{match.homeTeam?.flag ?? "🏳"}
					</span>
					{match.homeTeam ? (
						<Link
							href={`/teams/${match.homeTeam.code}`}
							className="text-base font-bold text-zinc-900 hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400 sm:text-lg"
						>
							{match.homeTeam.name}
						</Link>
					) : (
						<span className="text-base font-bold text-zinc-400 sm:text-lg">
							TBD
						</span>
					)}
				</div>

				{/* Score or vs */}
				<div className="flex shrink-0 flex-col items-center gap-1">
					{isCompleted || isLive ? (
						<>
							<span className="text-4xl font-extrabold tabular-nums text-zinc-900 dark:text-zinc-100 sm:text-5xl">
								{match.homeScore ?? 0} – {match.awayScore ?? 0}
							</span>
							{match.homePenalties != null && match.awayPenalties != null && (
								<span className="text-sm text-zinc-500 dark:text-zinc-400">
									({match.homePenalties} – {match.awayPenalties} pens)
								</span>
							)}
							<span className="text-xs font-medium uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
								{isLive ? "Live" : "FT"}
							</span>
						</>
					) : (
						<span className="text-2xl font-semibold text-zinc-300 dark:text-zinc-600">
							vs
						</span>
					)}
				</div>

				{/* Away team */}
				<div className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center">
					<span
						className="text-5xl leading-none sm:text-6xl"
						aria-hidden="true"
					>
						{match.awayTeam?.flag ?? "🏳"}
					</span>
					{match.awayTeam ? (
						<Link
							href={`/teams/${match.awayTeam.code}`}
							className="text-base font-bold text-zinc-900 hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400 sm:text-lg"
						>
							{match.awayTeam.name}
						</Link>
					) : (
						<span className="text-base font-bold text-zinc-400 sm:text-lg">
							TBD
						</span>
					)}
				</div>
			</div>

			{/* Details grid */}
			<div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<InfoCard label="Date" value={dateStr} />
				<InfoCard label="Kick-off" value={timeStr} />
				<InfoCard label="Status" value={match.status} />
			</div>

			{/* Venue */}
			<div className="mt-4 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
				<p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
					Venue
				</p>
				<Link
					href={`/venues/${match.venue.id}`}
					className="mt-1 inline-flex items-center gap-1 text-lg font-semibold text-zinc-900 hover:text-blue-600 dark:text-zinc-100 dark:hover:text-blue-400"
				>
					<span aria-hidden="true">📍</span>
					{match.venue.name}
				</Link>
				<p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
					{match.venue.city}, {match.venue.country}
				</p>
			</div>
		</div>
	);
}

function InfoCard({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
			<p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
				{label}
			</p>
			<p className="mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-100">
				{value}
			</p>
		</div>
	);
}
