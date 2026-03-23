export const dynamic = "force-dynamic";

import { GroupOverview } from "@/components/home/GroupOverview";
import { Hero } from "@/components/home/Hero";
import { QuickLinks } from "@/components/home/QuickLinks";
import { UpcomingMatches } from "@/components/home/UpcomingMatches";
import { getAllGroupStandings } from "@/lib/data/groups";
import { getMatches } from "@/lib/data/matches";

export default async function HomePage() {
	const now = new Date();

	const [allMatches, groupStandings] = await Promise.all([
		getMatches(),
		getAllGroupStandings(),
	]);

	// Next 5 upcoming matches from today; fall back to first 5 if all in future
	const upcoming = allMatches
		.filter((m) => m.dateTime >= now && m.status !== "COMPLETED")
		.slice(0, 5);

	const upcomingMatches =
		upcoming.length > 0 ? upcoming : allMatches.slice(0, 5);

	return (
		<div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
			<Hero className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800" />

			<div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 space-y-12">
				<QuickLinks />
				<UpcomingMatches matches={upcomingMatches} />
				<GroupOverview standings={groupStandings} />
			</div>
		</div>
	);
}
