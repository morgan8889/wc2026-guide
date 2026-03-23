export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Suspense } from "react";
import { ConfederationFilter } from "@/components/teams/ConfederationFilter";
import { GroupFilter } from "@/components/teams/GroupFilter";
import { TeamGrid } from "@/components/teams/TeamGrid";
import { TeamSearch } from "@/components/teams/TeamSearch";
import { getConfederations, getGroups, getTeams } from "@/lib/data/teams";

export const metadata: Metadata = {
	title: "Teams — World Cup 2026 Guide",
	description: "All 48 teams competing at FIFA World Cup 2026",
};

interface TeamsPageProps {
	searchParams: Promise<{
		group?: string;
		confederation?: string;
		search?: string;
	}>;
}

export default async function TeamsPage({ searchParams }: TeamsPageProps) {
	const params = await searchParams;
	const { group, confederation, search } = params;

	const [teams, groups, confederations] = await Promise.all([
		getTeams({ group, confederation, search }),
		getGroups(),
		getConfederations(),
	]);

	return (
		<div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
			<header className="mb-8">
				<h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
					Teams
				</h1>
				<p className="mt-1 text-zinc-500 dark:text-zinc-400">
					{teams.length} of 48 teams · FIFA World Cup 2026
				</p>
			</header>

			{/* Filters */}
			<div className="mb-6 flex flex-col gap-4">
				<Suspense fallback={null}>
					<GroupFilter groups={groups} selectedGroup={group} />
				</Suspense>
				<div className="flex flex-wrap items-center gap-4">
					<Suspense fallback={null}>
						<ConfederationFilter
							confederations={confederations}
							selectedConfederation={confederation}
						/>
					</Suspense>
					<Suspense fallback={null}>
						<TeamSearch defaultValue={search} />
					</Suspense>
				</div>
			</div>

			{/* Grid */}
			<TeamGrid teams={teams} />
		</div>
	);
}
