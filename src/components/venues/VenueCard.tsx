import Link from "next/link";
import { cn } from "@/lib/utils";

const COUNTRY_FLAGS: Record<string, string> = {
	USA: "🇺🇸",
	Mexico: "🇲🇽",
	Canada: "🇨🇦",
};

interface VenueCardProps {
	id: string;
	name: string;
	city: string;
	country: string;
	capacity: number;
	className?: string;
}

export function VenueCard({
	id,
	name,
	city,
	country,
	capacity,
	className,
}: VenueCardProps) {
	const flag = COUNTRY_FLAGS[country] ?? "🏟";

	return (
		<Link
			href={`/venues/${id}`}
			className={cn(
				"group flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600",
				className,
			)}
		>
			<div className="flex items-start justify-between gap-2">
				<span className="text-3xl leading-none" role="img" aria-label={country}>
					{flag}
				</span>
				<span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-0.5 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-700 dark:text-zinc-300 dark:ring-zinc-500/20">
					{country}
				</span>
			</div>
			<div className="flex flex-col gap-1">
				<span className="text-sm font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400 leading-snug">
					{name}
				</span>
				<span className="text-xs text-zinc-500 dark:text-zinc-400">{city}</span>
			</div>
			<div className="flex items-center gap-1 mt-auto">
				<span aria-hidden="true" className="text-zinc-400">
					👥
				</span>
				<span className="text-xs text-zinc-500 dark:text-zinc-400">
					{capacity.toLocaleString()} capacity
				</span>
			</div>
		</Link>
	);
}
