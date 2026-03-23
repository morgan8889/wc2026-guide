export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { GroupGrid } from "@/components/groups/GroupGrid";
import { getAllGroupStandings } from "@/lib/data/groups";

export const metadata: Metadata = {
	title: "Groups — World Cup 2026 Guide",
	description: "Group stage standings for all 12 groups at FIFA World Cup 2026",
};

export default async function GroupsPage() {
	const allStandings = await getAllGroupStandings();

	return (
		<div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
			<header className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
					Groups
				</h1>
				<p className="mt-1 text-zinc-500 dark:text-zinc-400">
					12 groups · 48 teams · FIFA World Cup 2026
				</p>
			</header>

			<GroupGrid allStandings={allStandings} />
		</div>
	);
}
