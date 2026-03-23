import Link from "next/link";
import { StandingsTable } from "@/components/groups/StandingsTable";
import type { TeamStanding } from "@/lib/data/groups";

interface GroupCardProps {
	group: string;
	standings: TeamStanding[];
}

export function GroupCard({ group, standings }: GroupCardProps) {
	return (
		<div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900">
			<div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
				<h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
					Group {group}
				</h2>
				<Link
					href={`/groups/${group.toLowerCase()}`}
					className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
				>
					View details →
				</Link>
			</div>
			<div className="p-4">
				<StandingsTable standings={standings} highlightTop={2} compact />
			</div>
		</div>
	);
}
