"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type View = "list" | "groups";

interface ViewToggleProps {
	currentView: View;
}

export function ViewToggle({ currentView }: ViewToggleProps) {
	const router = useRouter();
	const searchParams = useSearchParams();

	const setView = (view: View) => {
		const params = new URLSearchParams(searchParams.toString());
		if (view === "list") {
			params.delete("view");
		} else {
			params.set("view", view);
		}
		router.push(`/matches?${params.toString()}`);
	};

	const buttonClass = (view: View) =>
		cn(
			"px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
			currentView === view
				? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
				: "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100",
		);

	return (
		<div className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-700 dark:bg-zinc-800/50">
			<button
				type="button"
				className={buttonClass("list")}
				onClick={() => setView("list")}
			>
				📋 List
			</button>
			<button
				type="button"
				className={buttonClass("groups")}
				onClick={() => setView("groups")}
			>
				🗂 Groups
			</button>
		</div>
	);
}
