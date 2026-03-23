import { cache } from "react";
import { prisma } from "@/lib/prisma";

export interface MatchesParams {
	group?: string;
	teamId?: string;
	venueId?: string;
	stage?: string;
	dateFrom?: string;
	dateTo?: string;
}

const teamSelect = {
	id: true,
	name: true,
	flag: true,
	code: true,
} as const;

const matchInclude = {
	homeTeam: { select: teamSelect },
	awayTeam: { select: teamSelect },
	venue: {
		select: { id: true, name: true, city: true, country: true },
	},
} as const;

export async function getMatches(params?: MatchesParams) {
	const { group, teamId, venueId, stage, dateFrom, dateTo } = params ?? {};

	return prisma.match.findMany({
		where: {
			...(group ? { group } : {}),
			...(stage ? { stage } : {}),
			...(venueId ? { venueId } : {}),
			...(teamId
				? {
						OR: [{ homeTeamId: teamId }, { awayTeamId: teamId }],
					}
				: {}),
			...(dateFrom || dateTo
				? {
						dateTime: {
							...(dateFrom ? { gte: new Date(dateFrom) } : {}),
							...(dateTo ? { lte: new Date(dateTo) } : {}),
						},
					}
				: {}),
		},
		include: matchInclude,
		orderBy: [{ dateTime: "asc" }, { matchNumber: "asc" }],
	});
}

export const getMatchById = cache(async (id: string) => {
	return prisma.match.findUnique({
		where: { id },
		include: {
			homeTeam: true,
			awayTeam: true,
			venue: true,
		},
	});
});

export interface MatchWithTeamsAndVenue {
	id: string;
	matchNumber: number;
	stage: string;
	group: string | null;
	dateTime: Date;
	homeTeamId: string | null;
	awayTeamId: string | null;
	homeScore: number | null;
	awayScore: number | null;
	homePenalties: number | null;
	awayPenalties: number | null;
	status: string;
	venueId: string;
	homeTeam: {
		id: string;
		name: string;
		flag: string | null;
		code: string;
	} | null;
	awayTeam: {
		id: string;
		name: string;
		flag: string | null;
		code: string;
	} | null;
	venue: { id: string; name: string; city: string; country: string };
}

export async function getMatchesByGroup(): Promise<
	Record<string, MatchWithTeamsAndVenue[]>
> {
	const matches = (await prisma.match.findMany({
		where: { stage: "GROUP" },
		include: matchInclude,
		orderBy: [{ group: "asc" }, { dateTime: "asc" }, { matchNumber: "asc" }],
	})) as MatchWithTeamsAndVenue[];

	const grouped: Record<string, MatchWithTeamsAndVenue[]> = {};
	for (const match of matches) {
		const key = match.group ?? "?";
		if (!grouped[key]) grouped[key] = [];
		grouped[key].push(match);
	}
	return grouped;
}

export async function getStages(): Promise<string[]> {
	const matches = await prisma.match.findMany({
		select: { stage: true },
		distinct: ["stage"],
		orderBy: { stage: "asc" },
	});
	return matches.map((m) => m.stage);
}

export async function getMatchCount(): Promise<number> {
	return prisma.match.count();
}
