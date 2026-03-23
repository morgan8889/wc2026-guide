"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

interface TeamSearchProps {
	defaultValue?: string;
}

export function TeamSearch({ defaultValue }: TeamSearchProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleSearch = useCallback(
		(value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			if (value.trim()) {
				params.set("search", value.trim());
			} else {
				params.delete("search");
			}
			router.push(`/teams?${params.toString()}`);
		},
		[router, searchParams],
	);

	return (
		<div className="relative w-full sm:max-w-xs">
			<label htmlFor="team-search" className="sr-only">
				Search teams
			</label>
			<input
				id="team-search"
				type="search"
				placeholder="Search teams…"
				defaultValue={defaultValue}
				onChange={(e) => handleSearch(e.target.value)}
				className={cn(
					"w-full rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 placeholder:text-zinc-400",
					"focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
					"dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500",
				)}
			/>
		</div>
	);
}
