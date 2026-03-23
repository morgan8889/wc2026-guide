"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface VenueSearchProps {
	defaultValue?: string;
}

export function VenueSearch({ defaultValue }: VenueSearchProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [value, setValue] = useState(defaultValue ?? "");
	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}
		const timer = setTimeout(() => {
			const params = new URLSearchParams(searchParams.toString());
			if (value.trim()) {
				params.set("search", value.trim());
			} else {
				params.delete("search");
			}
			router.replace(`/venues?${params.toString()}`);
		}, 300);

		return () => clearTimeout(timer);
	}, [value, router, searchParams]);

	return (
		<div className="relative w-full sm:max-w-xs">
			<label htmlFor="venue-search" className="sr-only">
				Search venues
			</label>
			<input
				id="venue-search"
				type="search"
				placeholder="Search venues or cities…"
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className={cn(
					"w-full rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm text-zinc-900 placeholder:text-zinc-400",
					"focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
					"dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder:text-zinc-500",
				)}
			/>
		</div>
	);
}
