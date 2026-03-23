import Link from "next/link";
import { cn } from "@/lib/utils";

interface TeamCardProps {
	code: string;
	name: string;
	flag: string | null;
	group: string;
	confederation: string;
	ranking?: number | null;
	className?: string;
}

export function TeamCard({
	code,
	name,
	flag,
	group,
	confederation,
	ranking,
	className,
}: TeamCardProps) {
	return (
		<Link
			href={`/teams/${code.toLowerCase()}`}
			className={cn(
				"group flex flex-col items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 text-center shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-zinc-600",
				className,
			)}
		>
			<span className="text-4xl leading-none" role="img" aria-label={name}>
				{flag ?? "🏳"}
			</span>
			<div className="flex flex-col gap-1">
				<span className="text-sm font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
					{name}
				</span>
				<span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
					{code}
				</span>
			</div>
			<div className="flex items-center gap-2">
				<span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-300 dark:ring-blue-500/20">
					Group {group}
				</span>
				{ranking != null && (
					<span className="inline-flex items-center rounded-md bg-zinc-50 px-2 py-0.5 text-xs font-medium text-zinc-600 ring-1 ring-inset ring-zinc-500/10 dark:bg-zinc-700 dark:text-zinc-300 dark:ring-zinc-500/20">
						#{ranking}
					</span>
				)}
			</div>
			<span className="text-xs text-zinc-400 dark:text-zinc-500">
				{confederation}
			</span>
		</Link>
	);
}
