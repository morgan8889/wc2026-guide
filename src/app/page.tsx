export const dynamic = "force-dynamic";

import { GroupOverview } from "@/components/home/GroupOverview";
import { Hero } from "@/components/home/Hero";
import { QuickLinks } from "@/components/home/QuickLinks";
import { UpcomingMatches } from "@/components/home/UpcomingMatches";
import { getAllGroupStandings } from "@/lib/data/groups";
import {
	getRecentMatches,
	getUpcomingMatches,
} from "@/lib/data/matches";

export default async function HomePage() {
	const [upcoming, groupStandings] = await Promise.all([
		getUpcomingMatches(5),
		getAllGroupStandings(),
	]);

	// If no upcoming scheduled matches (tournament over or no data), fall back
	// to the 5 most recently completed matches under a "Recent Matches" heading.
	const isFallback = upcoming.length === 0;
	const matches = isFallback ? await getRecentMatches(5) : upcoming;

	return (
		<div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
			<Hero className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800" />

			<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-12">
				<QuickLinks />
				<UpcomingMatches
					matches={matches}
					title={isFallback ? "Recent Matches" : "Upcoming Matches"}
				/>
				<GroupOverview standings={groupStandings} />
			</div>
		</div>
	);
}
