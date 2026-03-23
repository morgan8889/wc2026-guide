import { getGroups as getGroupLetters } from "@/lib/data/teams";
import { prisma } from "@/lib/prisma";

type MatchRow = {
	homeTeamId: string | null;
	awayTeamId: string | null;
	homeScore: number | null;
	awayScore: number | null;
};

type TeamRow = {
	id: string;
	name: string;
	code: string;
	flag: string | null;
};

function buildStandings(teams: TeamRow[], matches: MatchRow[]): TeamStanding[] {
	const standingsMap = new Map<string, TeamStanding>();

	for (const team of teams) {
		standingsMap.set(team.id, {
			teamId: team.id,
			name: team.name,
			code: team.code,
			flag: team.flag,
			played: 0,
			won: 0,
			drawn: 0,
			lost: 0,
			goalsFor: 0,
			goalsAgainst: 0,
			goalDifference: 0,
			points: 0,
		});
	}

	for (const match of matches) {
		const { homeTeamId, awayTeamId, homeScore, awayScore } = match;
		if (
			homeTeamId === null ||
			awayTeamId === null ||
			homeScore === null ||
			awayScore === null
		) {
			continue;
		}

		const home = standingsMap.get(homeTeamId);
		const away = standingsMap.get(awayTeamId);

		if (!home || !away) continue;

		home.played += 1;
		away.played += 1;
		home.goalsFor += homeScore;
		home.goalsAgainst += awayScore;
		away.goalsFor += awayScore;
		away.goalsAgainst += homeScore;

		if (homeScore > awayScore) {
			home.won += 1;
			home.points += 3;
			away.lost += 1;
		} else if (homeScore < awayScore) {
			away.won += 1;
			away.points += 3;
			home.lost += 1;
		} else {
			home.drawn += 1;
			home.points += 1;
			away.drawn += 1;
			away.points += 1;
		}
	}

	for (const standing of standingsMap.values()) {
		standing.goalDifference = standing.goalsFor - standing.goalsAgainst;
	}

	return [...standingsMap.values()].sort(
		(a, b) =>
			b.points - a.points ||
			b.goalDifference - a.goalDifference ||
			b.goalsFor - a.goalsFor ||
			a.name.localeCompare(b.name),
	);
}

export interface TeamStanding {
	teamId: string;
	name: string;
	code: string;
	flag: string | null;
	played: number;
	won: number;
	drawn: number;
	lost: number;
	goalsFor: number;
	goalsAgainst: number;
	goalDifference: number;
	points: number;
}

export async function getGroupStandings(
	group: string,
): Promise<TeamStanding[]> {
	const [teams, matches] = await Promise.all([
		prisma.team.findMany({
			where: { group },
			select: { id: true, name: true, code: true, flag: true },
		}),
		prisma.match.findMany({
			where: {
				group,
				stage: "GROUP",
				status: "COMPLETED",
				homeTeamId: { not: null },
				awayTeamId: { not: null },
				homeScore: { not: null },
				awayScore: { not: null },
			},
			select: {
				homeTeamId: true,
				awayTeamId: true,
				homeScore: true,
				awayScore: true,
			},
		}),
	]);

	return buildStandings(teams, matches);
}

export async function getAllGroupStandings(): Promise<
	Record<string, TeamStanding[]>
> {
	const [groups, allTeams, allMatches] = await Promise.all([
		getGroupLetters(),
		prisma.team.findMany({
			select: { id: true, name: true, code: true, flag: true, group: true },
		}),
		prisma.match.findMany({
			where: {
				stage: "GROUP",
				status: "COMPLETED",
				homeTeamId: { not: null },
				awayTeamId: { not: null },
				homeScore: { not: null },
				awayScore: { not: null },
			},
			select: {
				group: true,
				homeTeamId: true,
				awayTeamId: true,
				homeScore: true,
				awayScore: true,
			},
		}),
	]);

	return Object.fromEntries(
		groups.map((g) => [
			g,
			buildStandings(
				allTeams.filter((t) => t.group === g),
				allMatches.filter((m) => m.group === g),
			),
		]),
	);
}

export { getGroupLetters as getGroups };
