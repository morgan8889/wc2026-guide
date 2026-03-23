"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { COUNTRY_FLAGS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface CountryFilterProps {
	countries: string[];
	selectedCountry?: string;
}

export function CountryFilter({
	countries,
	selectedCountry,
}: CountryFilterProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const handleChange = useCallback(
		(country: string | null) => {
			const params = new URLSearchParams(searchParams.toString());
			if (country) {
				params.set("country", country);
			} else {
				params.delete("country");
			}
			router.push(`/venues?${params.toString()}`);
		},
		[router, searchParams],
	);

	return (
		<fieldset className="flex flex-wrap gap-2 border-0 p-0 m-0">
			<legend className="sr-only">Filter by country</legend>
			<button
				type="button"
				onClick={() => handleChange(null)}
				className={cn(
					"rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
					!selectedCountry
						? "bg-blue-600 text-white"
						: "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600",
				)}
				aria-pressed={!selectedCountry}
			>
				All
			</button>
			{countries.map((country) => (
				<button
					key={country}
					type="button"
					onClick={() => handleChange(country)}
					className={cn(
						"rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
						selectedCountry === country
							? "bg-blue-600 text-white"
							: "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600",
					)}
					aria-pressed={selectedCountry === country}
				>
					{COUNTRY_FLAGS[country] ?? ""} {country}
				</button>
			))}
		</fieldset>
	);
}
