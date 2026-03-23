import { MatchCard, type MatchCardProps } from "./MatchCard";

type MatchListItem = Omit<MatchCardProps, "className">;

interface MatchListProps {
	matches: MatchListItem[];
}

export function MatchList({ matches }: MatchListProps) {
	if (matches.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-24 text-center">
				<span className="text-5xl">🔍</span>
				<p className="mt-4 text-lg font-medium text-zinc-600 dark:text-zinc-400">
					No matches found
				</p>
				<p className="text-sm text-zinc-400 dark:text-zinc-500">
					Try adjusting your filters.
				</p>
			</div>
		);
	}

	return (
		<ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{matches.map((match) => (
				<li key={match.id}>
					<MatchCard {...match} />
				</li>
			))}
		</ul>
	);
}
