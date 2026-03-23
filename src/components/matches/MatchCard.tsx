import Link from "next/link";
import { STAGE_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export { STAGE_LABELS };

interface TeamRef {
	id: string;
	name: string;
	flag: string | null;
	code: string;
}

interface VenueRef {
	id: string;
	name: string;
	city: string;
	country: string;
}

export interface MatchCardProps {
	id: string;
	matchNumber: number;
	stage: string;
	group: string | null;
	dateTime: Date;
	homeTeam: TeamRef | null;
	awayTeam: TeamRef | null;
	homeScore: number | null;
	awayScore: number | null;
	status: string;
	venue: VenueRef;
	className?: string;
}

function StageBadge({ stage, group }: { stage: string; group: string | null }) {
	const label = STAGE_LABELS[stage] ?? stage;
	const fullLabel = group ? `${label} · Group ${group}` : label;
	return (
		<span className="inline-flex shrink-0 items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-500/20">
			{fullLabel}
		</span>
	);
}

export function MatchCard({
	id,
	matchNumber,
	stage,
	group,
	dateTime,
	homeTeam,
	awayTeam,
	homeScore,
	awayScore,
	status,
	venue,
	className,
}: MatchCardProps) {
	const isCompleted = status === "COMPLETED";
	const isLive = status === "LIVE";

	const dateStr = dateTime.toLocaleDateString("en-US", {
		weekday: "short",
		year: "numeric",
		month: "short",
		day: "numeric",
	});
	const timeStr = dateTime.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});

	return (
		<Link
			href={`/matches/${id}`}
			className={cn(
				"group flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600",
				className,
			)}
			aria-label={`Match ${matchNumber}: ${homeTeam?.name ?? "TBD"} vs ${awayTeam?.name ?? "TBD"}`}
		>
			{/* Header row: date + stage badge */}
			<div className="flex items-center justify-between gap-2">
				<div className="flex flex-col gap-0.5">
					<span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
						{dateStr}
					</span>
					<span className="text-xs text-zinc-400 dark:text-zinc-500">
						{timeStr}
					</span>
				</div>
				<div className="flex items-center gap-2">
					{isLive && (
						<span className="inline-flex items-center gap-1 rounded-md bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600 ring-1 ring-inset ring-red-600/10 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-500/20">
							<span
								className="inline-block h-1.5 w-1.5 rounded-full bg-red-500"
								aria-hidden="true"
							/>
							LIVE
						</span>
					)}
					<StageBadge stage={stage} group={group} />
				</div>
			</div>

			{/* Teams row */}
			<div className="flex items-center gap-2">
				{/* Home team */}
				<div className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
					<span className="text-xl leading-none" aria-hidden="true">
						{homeTeam?.flag ?? "🏳"}
					</span>
					<span className="truncate text-sm font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
						{homeTeam?.name ?? "TBD"}
					</span>
				</div>

				{/* Score or vs */}
				<div className="flex shrink-0 flex-col items-center px-2">
					{isCompleted || isLive ? (
						<span className="text-lg font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
							{homeScore ?? 0} – {awayScore ?? 0}
						</span>
					) : (
						<span className="text-sm font-medium text-zinc-400 dark:text-zinc-500">
							vs
						</span>
					)}
				</div>

				{/* Away team */}
				<div className="flex min-w-0 flex-1 flex-col items-end gap-0.5">
					<span className="text-xl leading-none" aria-hidden="true">
						{awayTeam?.flag ?? "🏳"}
					</span>
					<span className="truncate text-sm font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
						{awayTeam?.name ?? "TBD"}
					</span>
				</div>
			</div>

			{/* Venue */}
			<div className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
				<span aria-hidden="true">📍</span>
				<span>
					{venue.name}, {venue.city}
				</span>
			</div>
		</Link>
	);
}
