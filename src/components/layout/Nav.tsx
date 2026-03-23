"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/teams", label: "Teams" },
	{ href: "/venues", label: "Venues" },
	{ href: "/matches", label: "Schedule" },
];

interface NavProps {
	className?: string;
}

export function Nav({ className }: NavProps) {
	const pathname = usePathname();

	return (
		<nav
			className={cn(
				"border-b border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900",
				className,
			)}
			aria-label="Main navigation"
		>
			<div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4 sm:px-6">
				<Link
					href="/"
					className="flex items-center gap-2 text-base font-bold text-zinc-900 dark:text-zinc-100"
				>
					<span aria-hidden="true">⚽</span>
					WC 2026
				</Link>
				<ul className="flex items-center gap-1">
					{navLinks.map(({ href, label }) => {
						const isActive =
							href === "/" ? pathname === href : pathname.startsWith(href);
						return (
							<li key={href}>
								<Link
									href={href}
									className={cn(
										"rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
										isActive
											? "text-zinc-900 dark:text-zinc-100"
											: "text-zinc-600 dark:text-zinc-400",
									)}
									aria-current={isActive ? "page" : undefined}
								>
									{label}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}
