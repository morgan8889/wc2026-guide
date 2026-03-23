export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Suspense } from "react";
import { MatchList } from "@/components/matches/MatchList";
import { ScheduleFilters } from "@/components/matches/ScheduleFilters";
import { ViewToggle } from "@/components/matches/ViewToggle";
import {
	getMatchCount,
	getMatches,
	getMatchesByGroup,
	getStages,
} from "@/lib/data/matches";
import { getGroups, getTeamIdBySearch } from "@/lib/data/teams";
import { getVenues } from "@/lib/data/venues";

export const metadata: Metadata = {
	title: "Schedule — World Cup 2026 Guide",
	description: "Full FIFA World Cup 2026 match schedule",
};

interface SchedulePageProps {
	searchParams: Promise<{
		view?: string;
		group?: string;
		stage?: string;
		venueId?: string;
		team?: string;
	}>;
}

export default async function SchedulePage({
	searchParams,
}: SchedulePageProps) {
	const params = await searchParams;
	const view = params.view === "groups" ? "groups" : "list";
	const { group, stage, venueId, team: teamSearch } = params;

	// Resolve team search to ID for filtering
	const teamId = teamSearch ? await getTeamIdBySearch(teamSearch) : undefined;

	const [groups, stages, venues, totalCount] = await Promise.all([
		getGroups(),
		getStages(),
		getVenues(),
		getMatchCount(),
	]);

	const venueList = venues.map((v) => ({
		id: v.id,
		name: v.name,
		city: v.city,
	}));

	if (view === "groups") {
		const grouped = await getMatchesByGroup();
		const groupKeys = Object.keys(grouped).sort();

		return (
			<div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
				<Header totalCount={totalCount} matchCount={null} />
				<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
					<Suspense
						fallback={
							<div className="h-[62px] w-80 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
						}
					>
						<ScheduleFilters
							groups={groups}
							stages={stages}
							venues={venueList}
							selectedGroup={group}
							selectedStage={stage}
							selectedVenueId={venueId}
							teamSearch={teamSearch}
						/>
					</Suspense>
					<Suspense
						fallback={
							<div className="h-[38px] w-36 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
						}
					>
						<ViewToggle currentView="groups" />
					</Suspense>
				</div>

				{groupKeys.length === 0 ? (
					<p className="text-zinc-500 dark:text-zinc-400">
						No group stage matches found.
					</p>
				) : (
					<div className="space-y-10">
						{groupKeys.map((g) => {
							const groupMatches = grouped[g];
							return (
								<section key={g} aria-labelledby={`group-${g}-heading`}>
									<h2
										id={`group-${g}-heading`}
										className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100"
									>
										Group {g}
									</h2>
									<MatchList matches={groupMatches} />
								</section>
							);
						})}
					</div>
				)}
			</div>
		);
	}

	// List view
	const matches = await getMatches({ group, stage, venueId, teamId });

	return (
		<div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
			<Header totalCount={totalCount} matchCount={matches.length} />
			<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
				<Suspense
					fallback={
						<div className="h-[62px] w-80 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
					}
				>
					<ScheduleFilters
						groups={groups}
						stages={stages}
						venues={venueList}
						selectedGroup={group}
						selectedStage={stage}
						selectedVenueId={venueId}
						teamSearch={teamSearch}
					/>
				</Suspense>
				<Suspense
					fallback={
						<div className="h-[38px] w-36 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800" />
					}
				>
					<ViewToggle currentView="list" />
				</Suspense>
			</div>

			<MatchList matches={matches} />
		</div>
	);
}

function Header({
	totalCount,
	matchCount,
}: {
	totalCount: number;
	matchCount: number | null;
}) {
	const subtitle =
		matchCount !== null
			? `${matchCount} of ${totalCount} matches · FIFA World Cup 2026`
			: `Group stage · FIFA World Cup 2026`;
	return (
		<header className="mb-8">
			<h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
				Schedule
			</h1>
			<p className="mt-1 text-zinc-500 dark:text-zinc-400">{subtitle}</p>
		</header>
	);
}
