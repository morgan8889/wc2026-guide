import { TeamCard } from "./TeamCard";

interface Team {
	id: string;
	code: string;
	name: string;
	flag: string | null;
	group: string;
	confederation: string;
	ranking: number | null;
}

interface TeamGridProps {
	teams: Team[];
}

export function TeamGrid({ teams }: TeamGridProps) {
	if (teams.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-24 text-center">
				<span className="text-5xl">🔍</span>
				<p className="mt-4 text-lg font-medium text-zinc-600 dark:text-zinc-400">
					No teams found
				</p>
				<p className="text-sm text-zinc-400 dark:text-zinc-500">
					Try adjusting your filters or search term.
				</p>
			</div>
		);
	}

	return (
		<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
			{teams.map((team) => (
				<TeamCard
					key={team.id}
					code={team.code}
					name={team.name}
					flag={team.flag}
					group={team.group}
					confederation={team.confederation}
					ranking={team.ranking}
				/>
			))}
		</div>
	);
}
