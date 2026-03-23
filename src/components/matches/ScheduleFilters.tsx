"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const STAGE_LABELS: Record<string, string> = {
	GROUP: "Group Stage",
	ROUND_OF_32: "Round of 32",
	ROUND_OF_16: "Round of 16",
	QUARTER: "Quarter-final",
	SEMI: "Semi-final",
	THIRD_PLACE: "Third Place",
	FINAL: "Final",
};

interface Venue {
	id: string;
	name: string;
	city: string;
}

interface ScheduleFiltersProps {
	groups: string[];
	stages: string[];
	venues: Venue[];
	selectedGroup?: string;
	selectedStage?: string;
	selectedVenueId?: string;
	teamSearch?: string;
}

export function ScheduleFilters({
	groups,
	stages,
	venues,
	selectedGroup,
	selectedStage,
	selectedVenueId,
	teamSearch,
}: ScheduleFiltersProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const updateParam = useCallback(
		(key: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			if (value) {
				params.set(key, value);
			} else {
				params.delete(key);
			}
			// Reset to list view on filter change (unless view=groups already there)
			router.push(`/matches?${params.toString()}`);
		},
		[router, searchParams],
	);

	const handleReset = useCallback(() => {
		const params = new URLSearchParams();
		const view = searchParams.get("view");
		if (view) params.set("view", view);
		router.push(`/matches?${params.toString()}`);
	}, [router, searchParams]);

	const hasFilters =
		selectedGroup || selectedStage || selectedVenueId || teamSearch;

	return (
		<div className="flex flex-wrap gap-3">
			{/* Group filter */}
			<div className="flex flex-col gap-1">
				<label
					htmlFor="filter-group"
					className="text-xs font-medium text-zinc-500 dark:text-zinc-400"
				>
					Group
				</label>
				<select
					id="filter-group"
					value={selectedGroup ?? ""}
					onChange={(e) => updateParam("group", e.target.value)}
					className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
				>
					<option value="">All Groups</option>
					{groups.map((g) => (
						<option key={g} value={g}>
							Group {g}
						</option>
					))}
				</select>
			</div>

			{/* Stage filter */}
			<div className="flex flex-col gap-1">
				<label
					htmlFor="filter-stage"
					className="text-xs font-medium text-zinc-500 dark:text-zinc-400"
				>
					Stage
				</label>
				<select
					id="filter-stage"
					value={selectedStage ?? ""}
					onChange={(e) => updateParam("stage", e.target.value)}
					className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
				>
					<option value="">All Stages</option>
					{stages.map((s) => (
						<option key={s} value={s}>
							{STAGE_LABELS[s] ?? s}
						</option>
					))}
				</select>
			</div>

			{/* Venue filter */}
			<div className="flex flex-col gap-1">
				<label
					htmlFor="filter-venue"
					className="text-xs font-medium text-zinc-500 dark:text-zinc-400"
				>
					Venue
				</label>
				<select
					id="filter-venue"
					value={selectedVenueId ?? ""}
					onChange={(e) => updateParam("venueId", e.target.value)}
					className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
				>
					<option value="">All Venues</option>
					{venues.map((v) => (
						<option key={v.id} value={v.id}>
							{v.name}, {v.city}
						</option>
					))}
				</select>
			</div>

			{/* Team search */}
			<div className="flex flex-col gap-1">
				<label
					htmlFor="filter-team"
					className="text-xs font-medium text-zinc-500 dark:text-zinc-400"
				>
					Team
				</label>
				<input
					id="filter-team"
					type="search"
					placeholder="Search team…"
					defaultValue={teamSearch ?? ""}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							updateParam("team", (e.target as HTMLInputElement).value);
						}
					}}
					onBlur={(e) => updateParam("team", e.target.value)}
					className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-500"
				/>
			</div>

			{/* Reset */}
			{hasFilters && (
				<div className="flex flex-col justify-end">
					<button
						type="button"
						onClick={handleReset}
						className="rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-600 shadow-sm transition-colors hover:bg-zinc-50 hover:text-zinc-900 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-zinc-100"
					>
						Clear filters
					</button>
				</div>
			)}
		</div>
	);
}
