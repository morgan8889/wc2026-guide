"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

interface GroupFilterProps {
	groups: string[];
	selectedGroup?: string;
}

export function GroupFilter({ groups, selectedGroup }: GroupFilterProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleGroupChange = useCallback(
		(group: string | null) => {
			const params = new URLSearchParams(searchParams.toString());
			if (group) {
				params.set("group", group);
			} else {
				params.delete("group");
			}
			router.push(`/teams?${params.toString()}`);
		},
		[router, searchParams],
	);

	return (
		<fieldset className="flex flex-wrap gap-2 border-0 p-0 m-0">
			<legend className="sr-only">Filter by group</legend>
			<button
				type="button"
				onClick={() => handleGroupChange(null)}
				className={cn(
					"rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
					!selectedGroup
						? "bg-blue-600 text-white"
						: "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600",
				)}
				aria-pressed={!selectedGroup}
			>
				All
			</button>
			{groups.map((group) => (
				<button
					key={group}
					type="button"
					onClick={() => handleGroupChange(group)}
					className={cn(
						"rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
						selectedGroup === group
							? "bg-blue-600 text-white"
							: "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600",
					)}
					aria-pressed={selectedGroup === group}
				>
					Group {group}
				</button>
			))}
		</fieldset>
	);
}
