interface HeroProps {
	className?: string;
	matchCount: number;
}

export function Hero({ className, matchCount }: HeroProps) {
	return (
		<section className={className} aria-label="FIFA World Cup 2026 hero">
			<div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20 text-center">
				<div
					className="flex items-center justify-center gap-3 mb-4 text-4xl"
					aria-hidden="true"
				>
					<span>🇺🇸</span>
					<span>🇲🇽</span>
					<span>🇨🇦</span>
				</div>
				<h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl">
					FIFA World Cup 2026
				</h1>
				<p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
					June 11 – July 19, 2026 · United States, Mexico &amp; Canada
				</p>

				{/* Quick stats */}
				<div className="mt-10 grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto">
					<div className="flex flex-col items-center gap-1">
						<span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
							48
						</span>
						<span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
							Teams
						</span>
					</div>
					<div className="flex flex-col items-center gap-1">
						<span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
							16
						</span>
						<span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
							Venues
						</span>
					</div>
					<div className="flex flex-col items-center gap-1">
						<span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
							{matchCount}
						</span>
						<span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
							Matches
						</span>
					</div>
				</div>
			</div>
		</section>
	);
}
