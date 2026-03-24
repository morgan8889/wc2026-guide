"use client";

import { useEffect, useState } from "react";
import type { MatchWithTeamsAndVenue } from "@/lib/data/matches";

interface NextMatchCountdownProps {
	match: MatchWithTeamsAndVenue | null;
}

interface TimeLeft {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
	totalSeconds: number;
}

function getTimeLeft(target: Date): TimeLeft {
	const diff = Math.max(0, target.getTime() - Date.now());
	const totalSeconds = Math.floor(diff / 1000);
	const days = Math.floor(totalSeconds / 86400);
	const hours = Math.floor((totalSeconds % 86400) / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;
	return { days, hours, minutes, seconds, totalSeconds };
}

function formatCountdown(t: TimeLeft): string {
	if (t.totalSeconds < 3600) {
		return `${t.minutes}m ${t.seconds}s`;
	}
	const parts: string[] = [];
	if (t.days > 0) parts.push(`${t.days}d`);
	parts.push(`${t.hours}h`, `${t.minutes}m`, `${t.seconds}s`);
	return parts.join(" ");
}

function formatMatchDate(date: Date): string {
	return date.toLocaleDateString("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		timeZoneName: "short",
	});
}

export function NextMatchCountdown({ match }: NextMatchCountdownProps) {
	const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(
		match ? getTimeLeft(match.dateTime) : null,
	);

	useEffect(() => {
		if (!match) return;
		const tick = () => setTimeLeft(getTimeLeft(match.dateTime));
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	}, [match]);

	if (!match || !timeLeft) return null;
	if (timeLeft.totalSeconds === 0) return null;

	const stageLabel =
		match.stage === "GROUP" && match.group
			? `Group ${match.group}`
			: match.stage.replace(/_/g, " ");

	return (
		<section
			aria-label="Next match countdown"
			className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6"
		>
			<div className="flex flex-col gap-4">
				{/* Header */}
				<div className="flex items-center gap-2">
					<span className="text-xs font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
						Next Match
					</span>
					<span className="text-xs text-zinc-400 dark:text-zinc-500">
						· Match {match.matchNumber} · {stageLabel}
					</span>
				</div>

				{/* Teams */}
				<div className="flex items-center justify-center gap-4 sm:gap-8">
					{/* Home team */}
					<div className="flex flex-col items-center gap-1 min-w-0">
						<span
							className="text-4xl"
							role="img"
							aria-label={match.homeTeam?.name ?? "TBD"}
						>
							{match.homeTeam?.flag ?? "🏳"}
						</span>
						<span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate max-w-24 text-center">
							{match.homeTeam?.name ?? "TBD"}
						</span>
					</div>

					{/* VS divider */}
					<div className="flex flex-col items-center gap-1">
						<span className="text-xl font-bold text-zinc-300 dark:text-zinc-600">
							vs
						</span>
					</div>

					{/* Away team */}
					<div className="flex flex-col items-center gap-1 min-w-0">
						<span
							className="text-4xl"
							role="img"
							aria-label={match.awayTeam?.name ?? "TBD"}
						>
							{match.awayTeam?.flag ?? "🏳"}
						</span>
						<span className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate max-w-24 text-center">
							{match.awayTeam?.name ?? "TBD"}
						</span>
					</div>
				</div>

				{/* Venue + date */}
				<div className="text-center text-sm text-zinc-500 dark:text-zinc-400 space-y-0.5">
					<p className="font-medium">
						{match.venue.name}, {match.venue.city}
					</p>
					<p>{formatMatchDate(match.dateTime)}</p>
				</div>

				{/* Countdown */}
				<div className="text-center">
					<p className="text-xs font-semibold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1">
						Kickoff in
					</p>
					<p
						className="text-3xl font-extrabold tabular-nums text-blue-600 dark:text-blue-400"
						role="status"
						aria-live="polite"
						aria-atomic="true"
					>
						{formatCountdown(timeLeft)}
					</p>
				</div>
			</div>
		</section>
	);
}
