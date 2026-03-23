export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTeamByCode } from "@/lib/data/teams";

interface TeamDetailPageProps {
	params: Promise<{ code: string }>;
}

export async function generateMetadata({
	params,
}: TeamDetailPageProps): Promise<Metadata> {
	const { code } = await params;
	const team = await getTeamByCode(code);
	if (!team) return { title: "Team not found" };
	return {
		title: `${team.flag ?? ""} ${team.name} — World Cup 2026 Guide`,
		description: `${team.name} at FIFA World Cup 2026. Group ${team.group} · ${team.confederation}`,
	};
}

export default async function TeamDetailPage({ params }: TeamDetailPageProps) {
	const { code } = await params;
	const team = await getTeamByCode(code);

	if (!team) {
		notFound();
	}

	return (
		<div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6">
			{/* Back link */}
			<Link
				href="/teams"
				className="mb-6 inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
			>
				<span aria-hidden="true">←</span>
				All Teams
			</Link>

			{/* Team header */}
			<div className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
				<span
					className="text-7xl leading-none"
					role="img"
					aria-label={team.name}
				>
					{team.flag ?? "🏳"}
				</span>
				<div>
					<h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
						{team.name}
					</h1>
					<p className="mt-1 font-mono text-zinc-500 dark:text-zinc-400">
						{team.code}
					</p>
				</div>
			</div>

			{/* Team details */}
			<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<InfoCard label="Group" value={`Group ${team.group}`} />
				<InfoCard label="Confederation" value={team.confederation} />
				{team.ranking && (
					<InfoCard label="FIFA Ranking" value={`#${team.ranking}`} />
				)}
				{team.coach && <InfoCard label="Coach" value={team.coach} />}
			</div>

			{/* Placeholder sections for future tickets */}
			<div className="mt-10 space-y-6">
				<section aria-labelledby="matches-heading">
					<h2
						id="matches-heading"
						className="text-xl font-semibold text-zinc-900 dark:text-zinc-100"
					>
						Matches
					</h2>
					<p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
						Match schedule coming soon.
					</p>
				</section>

				<section aria-labelledby="squad-heading">
					<h2
						id="squad-heading"
						className="text-xl font-semibold text-zinc-900 dark:text-zinc-100"
					>
						Squad
					</h2>
					<p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
						Squad details coming soon.
					</p>
				</section>
			</div>
		</div>
	);
}

function InfoCard({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
			<p className="text-xs font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
				{label}
			</p>
			<p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
				{value}
			</p>
		</div>
	);
}
