export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StandingsTable } from "@/components/groups/StandingsTable";
import { MatchCard } from "@/components/matches/MatchCard";
import { getGroupStandings, getGroups } from "@/lib/data/groups";
import { getMatches } from "@/lib/data/matches";

interface GroupPageProps {
	params: Promise<{ letter: string }>;
}

export async function generateMetadata({
	params,
}: GroupPageProps): Promise<Metadata> {
	const { letter } = await params;
	const group = letter.toUpperCase();
	return {
		title: `Group ${group} — World Cup 2026 Guide`,
		description: `Group ${group} standings and match results at FIFA World Cup 2026`,
	};
}

export default async function GroupPage({ params }: GroupPageProps) {
	const { letter } = await params;
	const group = letter.toUpperCase();

	const groups = await getGroups();
	if (!groups.includes(group)) {
		notFound();
	}

	const [standings, matches] = await Promise.all([
		getGroupStandings(group),
		getMatches({ group, stage: "GROUP" }),
	]);

	return (
		<div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
			<header className="mb-8">
				<div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
					<Link
						href="/groups"
						className="hover:text-zinc-900 dark:hover:text-zinc-100"
					>
						Groups
					</Link>
					<span aria-hidden="true">/</span>
					<span className="text-zinc-900 dark:text-zinc-100">
						Group {group}
					</span>
				</div>
				<h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
					Group {group}
				</h1>
				<p className="mt-1 text-zinc-500 dark:text-zinc-400">
					{standings.length} teams · {matches.length} matches
				</p>
			</header>

			{/* Standings */}
			<section aria-labelledby="standings-heading" className="mb-10">
				<h2
					id="standings-heading"
					className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100"
				>
					Standings
				</h2>
				<div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
					<StandingsTable standings={standings} highlightTop={2} />
					<p className="mt-3 text-xs text-zinc-400 dark:text-zinc-500">
						🟢 Qualifies for Round of 32
					</p>
				</div>
			</section>

			{/* Matches */}
			<section aria-labelledby="matches-heading">
				<h2
					id="matches-heading"
					className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100"
				>
					Matches
				</h2>
				{matches.length === 0 ? (
					<p className="text-zinc-500 dark:text-zinc-400">
						No matches scheduled yet.
					</p>
				) : (
					<div className="grid gap-4 sm:grid-cols-2">
						{matches.map((match) => (
							<MatchCard
								key={match.id}
								id={match.id}
								matchNumber={match.matchNumber}
								stage={match.stage}
								group={match.group}
								dateTime={match.dateTime}
								homeTeam={match.homeTeam}
								awayTeam={match.awayTeam}
								homeScore={match.homeScore}
								awayScore={match.awayScore}
								status={match.status}
								venue={match.venue}
							/>
						))}
					</div>
				)}
			</section>
		</div>
	);
}
