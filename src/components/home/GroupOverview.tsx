import Link from "next/link";
import type { TeamStanding } from "@/lib/data/groups";

interface GroupOverviewProps {
	standings: Record<string, TeamStanding[]>;
	className?: string;
}

function GroupCard({
	letter,
	teams,
}: {
	letter: string;
	teams: TeamStanding[];
}) {
	return (
		<div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
			<Link
				href={`/groups/${letter}`}
				className="mb-3 flex items-center justify-between"
			>
				<h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
					Group {letter}
				</h3>
				<span className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
					Details →
				</span>
			</Link>
			<ul className="space-y-1.5">
				{teams.map((team, index) => (
					<li key={team.teamId} className="flex items-center gap-2">
						<span className="w-4 text-xs font-medium text-zinc-400 dark:text-zinc-500">
							{index + 1}
						</span>
						<span className="text-base leading-none" aria-hidden="true">
							{team.flag ?? "🏳"}
						</span>
						<span className="min-w-0 flex-1 truncate text-sm text-zinc-700 dark:text-zinc-300">
							{team.name}
						</span>
						<span className="shrink-0 text-sm font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
							{team.points}
						</span>
					</li>
				))}
			</ul>
		</div>
	);
}

export function GroupOverview({ standings, className }: GroupOverviewProps) {
	const groups = Object.entries(standings).sort(([a], [b]) =>
		a.localeCompare(b),
	);

	return (
		<section className={className} aria-labelledby="group-overview-heading">
			<div className="flex items-center justify-between mb-4">
				<h2
					id="group-overview-heading"
					className="text-xl font-bold text-zinc-900 dark:text-zinc-100"
				>
					Group Standings
				</h2>
				<Link
					href="/groups"
					className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
				>
					View all →
				</Link>
			</div>

			<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
				{groups.map(([letter, teams]) => (
					<GroupCard key={letter} letter={letter} teams={teams} />
				))}
			</div>
		</section>
	);
}
