import Link from "next/link";
import { MatchCard } from "@/components/matches/MatchCard";
import type { MatchWithTeamsAndVenue } from "@/lib/data/matches";

interface UpcomingMatchesProps {
	matches: MatchWithTeamsAndVenue[];
	title?: string;
	className?: string;
}

export function UpcomingMatches({
	matches,
	title = "Upcoming Matches",
	className,
}: UpcomingMatchesProps) {
	return (
		<section className={className} aria-labelledby="upcoming-matches-heading">
			<div className="flex items-center justify-between mb-4">
				<h2
					id="upcoming-matches-heading"
					className="text-xl font-bold text-zinc-900 dark:text-zinc-100"
				>
					{title}
				</h2>
				<Link
					href="/matches"
					className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
				>
					View all →
				</Link>
			</div>

			{matches.length === 0 ? (
				<p className="text-zinc-500 dark:text-zinc-400 text-sm">
					No upcoming matches scheduled.
				</p>
			) : (
				<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
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
	);
}
