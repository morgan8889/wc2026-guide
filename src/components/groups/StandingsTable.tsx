import Link from "next/link";
import type { TeamStanding } from "@/lib/data/groups";
import { cn } from "@/lib/utils";

interface StandingsTableProps {
	standings: TeamStanding[];
	/** Number of top teams to highlight (e.g. 2 for qualification spots) */
	highlightTop?: number;
	compact?: boolean;
}

export function StandingsTable({
	standings,
	highlightTop = 2,
	compact = false,
}: StandingsTableProps) {
	return (
		<div className="overflow-x-auto">
			<table className="w-full text-sm">
				<thead>
					<tr className="border-b border-zinc-200 text-left text-xs font-semibold text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
						<th className="pb-2 pr-2 font-semibold">#</th>
						<th className="pb-2 pr-4 font-semibold">Team</th>
						<th className="pb-2 px-2 text-center font-semibold" title="Played">
							P
						</th>
						<th className="pb-2 px-2 text-center font-semibold" title="Won">
							W
						</th>
						<th className="pb-2 px-2 text-center font-semibold" title="Drawn">
							D
						</th>
						<th className="pb-2 px-2 text-center font-semibold" title="Lost">
							L
						</th>
						{!compact && (
							<>
								<th
									className="pb-2 px-2 text-center font-semibold"
									title="Goals For"
								>
									GF
								</th>
								<th
									className="pb-2 px-2 text-center font-semibold"
									title="Goals Against"
								>
									GA
								</th>
							</>
						)}
						<th
							className="pb-2 px-2 text-center font-semibold"
							title="Goal Difference"
						>
							GD
						</th>
						<th className="pb-2 pl-2 text-center font-semibold" title="Points">
							Pts
						</th>
					</tr>
				</thead>
				<tbody>
					{standings.map((team, index) => {
						const isHighlighted = index < highlightTop;
						return (
							<tr
								key={team.teamId}
								className={cn(
									"border-b border-zinc-100 transition-colors last:border-0 dark:border-zinc-800",
									isHighlighted
										? "bg-emerald-50 dark:bg-emerald-950/30"
										: "hover:bg-zinc-50 dark:hover:bg-zinc-800/50",
								)}
							>
								<td className="py-2 pr-2 text-xs text-zinc-400 dark:text-zinc-500">
									{index + 1}
								</td>
								<td className="py-2 pr-4">
									<Link
										href={`/teams/${team.code.toLowerCase()}`}
										className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400"
									>
										<span
											className="text-base leading-none"
											role="img"
											aria-label={team.name}
										>
											{team.flag ?? "🏳"}
										</span>
										<span className="font-medium text-zinc-900 dark:text-zinc-100">
											{team.code}
										</span>
										{!compact && (
											<span className="hidden text-zinc-500 dark:text-zinc-400 sm:inline">
												{team.name}
											</span>
										)}
									</Link>
								</td>
								<td className="py-2 px-2 text-center tabular-nums text-zinc-600 dark:text-zinc-400">
									{team.played}
								</td>
								<td className="py-2 px-2 text-center tabular-nums text-zinc-600 dark:text-zinc-400">
									{team.won}
								</td>
								<td className="py-2 px-2 text-center tabular-nums text-zinc-600 dark:text-zinc-400">
									{team.drawn}
								</td>
								<td className="py-2 px-2 text-center tabular-nums text-zinc-600 dark:text-zinc-400">
									{team.lost}
								</td>
								{!compact && (
									<>
										<td className="py-2 px-2 text-center tabular-nums text-zinc-600 dark:text-zinc-400">
											{team.goalsFor}
										</td>
										<td className="py-2 px-2 text-center tabular-nums text-zinc-600 dark:text-zinc-400">
											{team.goalsAgainst}
										</td>
									</>
								)}
								<td className="py-2 px-2 text-center tabular-nums text-zinc-600 dark:text-zinc-400">
									{team.goalDifference > 0
										? `+${team.goalDifference}`
										: team.goalDifference}
								</td>
								<td className="py-2 pl-2 text-center tabular-nums font-bold text-zinc-900 dark:text-zinc-100">
									{team.points}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
