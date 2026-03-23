"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";

interface ConfederationFilterProps {
	confederations: string[];
	selectedConfederation?: string;
}

export function ConfederationFilter({
	confederations,
	selectedConfederation,
}: ConfederationFilterProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleChange = useCallback(
		(confederation: string) => {
			const params = new URLSearchParams(searchParams.toString());
			if (confederation === "") {
				params.delete("confederation");
			} else {
				params.set("confederation", confederation);
			}
			router.push(`/teams?${params.toString()}`);
		},
		[router, searchParams],
	);

	return (
		<div className="flex items-center gap-2">
			<label
				htmlFor="confederation-select"
				className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
			>
				Confederation
			</label>
			<select
				id="confederation-select"
				value={selectedConfederation ?? ""}
				onChange={(e) => handleChange(e.target.value)}
				className={cn(
					"rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900",
					"focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
					"dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100",
				)}
			>
				<option value="">All confederations</option>
				{confederations.map((conf) => (
					<option key={conf} value={conf}>
						{conf}
					</option>
				))}
			</select>
		</div>
	);
}
