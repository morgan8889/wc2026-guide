import Link from "next/link";

interface QuickLink {
	href: string;
	icon: string;
	label: string;
	description: string;
}

const links: QuickLink[] = [
	{
		href: "/teams",
		icon: "🌍",
		label: "Teams",
		description: "All 48 qualified national teams",
	},
	{
		href: "/venues",
		icon: "🏟️",
		label: "Venues",
		description: "16 stadiums across 3 countries",
	},
	{
		href: "/matches",
		icon: "📅",
		label: "Schedule",
		description: "Full match schedule & results",
	},
	{
		href: "/groups",
		icon: "📊",
		label: "Groups",
		description: "Group standings & table",
	},
];

interface QuickLinksProps {
	className?: string;
}

export function QuickLinks({ className }: QuickLinksProps) {
	return (
		<section className={className} aria-labelledby="quick-links-heading">
			<h2
				id="quick-links-heading"
				className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4"
			>
				Explore
			</h2>
			<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
				{links.map(({ href, icon, label, description }) => (
					<Link
						key={href}
						href={href}
						className="group flex flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:border-blue-300 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:hover:border-blue-600"
					>
						<span className="text-2xl" aria-hidden="true">
							{icon}
						</span>
						<span className="font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-100 dark:group-hover:text-blue-400">
							{label}
						</span>
						<span className="text-xs text-zinc-500 dark:text-zinc-400">
							{description}
						</span>
					</Link>
				))}
			</div>
		</section>
	);
}
