import { GroupCard } from "@/components/groups/GroupCard";
import type { TeamStanding } from "@/lib/data/groups";

interface GroupGridProps {
	allStandings: Record<string, TeamStanding[]>;
}

export function GroupGrid({ allStandings }: GroupGridProps) {
	const groups = Object.keys(allStandings).sort();

	if (groups.length === 0) {
		return <p className="text-zinc-500 dark:text-zinc-400">No groups found.</p>;
	}

	return (
		<div className="grid gap-6 sm:grid-cols-2">
			{groups.map((group) => (
				<GroupCard key={group} group={group} standings={allStandings[group]} />
			))}
		</div>
	);
}
