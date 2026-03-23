import { cache } from "react";
import { prisma } from "@/lib/prisma";

export interface TeamsParams {
	group?: string;
	confederation?: string;
	search?: string;
}

export async function getTeams(params?: TeamsParams) {
	const { group, confederation, search } = params ?? {};

	return prisma.team.findMany({
		where: {
			...(group ? { group } : {}),
			...(confederation ? { confederation } : {}),
			...(search
				? {
						name: {
							contains: search,
						},
					}
				: {}),
		},
		orderBy: [{ group: "asc" }, { name: "asc" }],
	});
}

export const getTeamByCode = cache(async (code: string) => {
	return prisma.team.findUnique({
		where: { code: code.toUpperCase() },
		include: {
			players: {
				orderBy: { name: "asc" },
			},
			homeMatches: {
				include: {
					awayTeam: true,
					venue: true,
				},
				orderBy: { dateTime: "asc" },
			},
			awayMatches: {
				include: {
					homeTeam: true,
					venue: true,
				},
				orderBy: { dateTime: "asc" },
			},
		},
	});
});

export async function getGroups(): Promise<string[]> {
	const teams = await prisma.team.findMany({
		select: { group: true },
		distinct: ["group"],
		orderBy: { group: "asc" },
	});
	return teams.map((t) => t.group);
}

export async function getConfederations(): Promise<string[]> {
	const teams = await prisma.team.findMany({
		select: { confederation: true },
		distinct: ["confederation"],
		orderBy: { confederation: "asc" },
	});
	return teams.map((t) => t.confederation);
}
