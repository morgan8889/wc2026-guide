import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

// The seed script intentionally owns its own PrismaClient instance (rather than
// reusing the shared singleton from src/lib/prisma.ts) so it can call
// $disconnect() explicitly after seeding and control the full connection lifecycle.
const adapter = new PrismaBetterSqlite3({
	url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

// FIFA World Cup 2026 — 48 teams in 12 groups
// Official draw results: December 5, 2025
// 42 confirmed + 6 TBD playoff spots
export const TEAMS: {
	name: string;
	code: string;
	group: string;
	confederation: string;
	flag: string;
}[] = [
	// Group A: Mexico, South Korea, South Africa, UEFA Playoff D winner
	{
		name: "Mexico",
		code: "MEX",
		group: "A",
		confederation: "CONCACAF",
		flag: "🇲🇽",
	},
	{
		name: "South Korea",
		code: "KOR",
		group: "A",
		confederation: "AFC",
		flag: "🇰🇷",
	},
	{
		name: "South Africa",
		code: "RSA",
		group: "A",
		confederation: "CAF",
		flag: "🇿🇦",
	},
	{
		name: "TBD (UEFA Playoff D)",
		code: "TBD",
		group: "A",
		confederation: "UEFA",
		flag: "🏳️",
	},
	// Group B: Canada, Switzerland, Qatar, UEFA Playoff A winner
	{
		name: "Canada",
		code: "CAN",
		group: "B",
		confederation: "CONCACAF",
		flag: "🇨🇦",
	},
	{
		name: "Switzerland",
		code: "SUI",
		group: "B",
		confederation: "UEFA",
		flag: "🇨🇭",
	},
	{
		name: "Qatar",
		code: "QAT",
		group: "B",
		confederation: "AFC",
		flag: "🇶🇦",
	},
	{
		name: "TBD (UEFA Playoff A)",
		code: "TBA",
		group: "B",
		confederation: "UEFA",
		flag: "🏳️",
	},
	// Group C: Brazil, Morocco, Scotland, Haiti
	{
		name: "Brazil",
		code: "BRA",
		group: "C",
		confederation: "CONMEBOL",
		flag: "🇧🇷",
	},
	{
		name: "Morocco",
		code: "MAR",
		group: "C",
		confederation: "CAF",
		flag: "🇲🇦",
	},
	{
		name: "Scotland",
		code: "SCO",
		group: "C",
		confederation: "UEFA",
		flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
	},
	{
		name: "Haiti",
		code: "HAI",
		group: "C",
		confederation: "CONCACAF",
		flag: "🇭🇹",
	},
	// Group D: USA, Paraguay, Australia, UEFA Playoff C winner
	{
		name: "United States",
		code: "USA",
		group: "D",
		confederation: "CONCACAF",
		flag: "🇺🇸",
	},
	{
		name: "Paraguay",
		code: "PAR",
		group: "D",
		confederation: "CONMEBOL",
		flag: "🇵🇾",
	},
	{
		name: "Australia",
		code: "AUS",
		group: "D",
		confederation: "AFC",
		flag: "🇦🇺",
	},
	{
		name: "TBD (UEFA Playoff C)",
		code: "TBC",
		group: "D",
		confederation: "UEFA",
		flag: "🏳️",
	},
	// Group E: Germany, Ecuador, Ivory Coast, Curacao
	{
		name: "Germany",
		code: "GER",
		group: "E",
		confederation: "UEFA",
		flag: "🇩🇪",
	},
	{
		name: "Ecuador",
		code: "ECU",
		group: "E",
		confederation: "CONMEBOL",
		flag: "🇪🇨",
	},
	{
		name: "Ivory Coast",
		code: "CIV",
		group: "E",
		confederation: "CAF",
		flag: "🇨🇮",
	},
	{
		name: "Curacao",
		code: "CUW",
		group: "E",
		confederation: "CONCACAF",
		flag: "🇨🇼",
	},
	// Group F: Netherlands, Japan, Tunisia, UEFA Playoff B winner
	{
		name: "Netherlands",
		code: "NED",
		group: "F",
		confederation: "UEFA",
		flag: "🇳🇱",
	},
	{
		name: "Japan",
		code: "JPN",
		group: "F",
		confederation: "AFC",
		flag: "🇯🇵",
	},
	{
		name: "Tunisia",
		code: "TUN",
		group: "F",
		confederation: "CAF",
		flag: "🇹🇳",
	},
	{
		name: "TBD (UEFA Playoff B)",
		code: "TBB",
		group: "F",
		confederation: "UEFA",
		flag: "🏳️",
	},
	// Group G: Belgium, Iran, Egypt, New Zealand
	{
		name: "Belgium",
		code: "BEL",
		group: "G",
		confederation: "UEFA",
		flag: "🇧🇪",
	},
	{
		name: "Iran",
		code: "IRN",
		group: "G",
		confederation: "AFC",
		flag: "🇮🇷",
	},
	{
		name: "Egypt",
		code: "EGY",
		group: "G",
		confederation: "CAF",
		flag: "🇪🇬",
	},
	{
		name: "New Zealand",
		code: "NZL",
		group: "G",
		confederation: "OFC",
		flag: "🇳🇿",
	},
	// Group H: Spain, Uruguay, Saudi Arabia, Cape Verde
	{
		name: "Spain",
		code: "ESP",
		group: "H",
		confederation: "UEFA",
		flag: "🇪🇸",
	},
	{
		name: "Uruguay",
		code: "URU",
		group: "H",
		confederation: "CONMEBOL",
		flag: "🇺🇾",
	},
	{
		name: "Saudi Arabia",
		code: "KSA",
		group: "H",
		confederation: "AFC",
		flag: "🇸🇦",
	},
	{
		name: "Cape Verde",
		code: "CPV",
		group: "H",
		confederation: "CAF",
		flag: "🇨🇻",
	},
	// Group I: France, Senegal, Norway, Inter-confederation Playoff 2
	{
		name: "France",
		code: "FRA",
		group: "I",
		confederation: "UEFA",
		flag: "🇫🇷",
	},
	{
		name: "Senegal",
		code: "SEN",
		group: "I",
		confederation: "CAF",
		flag: "🇸🇳",
	},
	{
		name: "Norway",
		code: "NOR",
		group: "I",
		confederation: "UEFA",
		flag: "🇳🇴",
	},
	{
		name: "TBD (Inter-confederation Playoff 2)",
		code: "TBF",
		group: "I",
		confederation: "Inter-confederation",
		flag: "🏳️",
	},
	// Group J: Argentina, Austria, Algeria, Jordan
	{
		name: "Argentina",
		code: "ARG",
		group: "J",
		confederation: "CONMEBOL",
		flag: "🇦🇷",
	},
	{
		name: "Austria",
		code: "AUT",
		group: "J",
		confederation: "UEFA",
		flag: "🇦🇹",
	},
	{
		name: "Algeria",
		code: "ALG",
		group: "J",
		confederation: "CAF",
		flag: "🇩🇿",
	},
	{
		name: "Jordan",
		code: "JOR",
		group: "J",
		confederation: "AFC",
		flag: "🇯🇴",
	},
	// Group K: Portugal, Colombia, Uzbekistan, Inter-confederation Playoff 1
	{
		name: "Portugal",
		code: "POR",
		group: "K",
		confederation: "UEFA",
		flag: "🇵🇹",
	},
	{
		name: "Colombia",
		code: "COL",
		group: "K",
		confederation: "CONMEBOL",
		flag: "🇨🇴",
	},
	{
		name: "Uzbekistan",
		code: "UZB",
		group: "K",
		confederation: "AFC",
		flag: "🇺🇿",
	},
	{
		name: "TBD (Inter-confederation Playoff 1)",
		code: "TBE",
		group: "K",
		confederation: "Inter-confederation",
		flag: "🏳️",
	},
	// Group L: England, Croatia, Panama, Ghana
	{
		name: "England",
		code: "ENG",
		group: "L",
		confederation: "UEFA",
		flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
	},
	{
		name: "Croatia",
		code: "CRO",
		group: "L",
		confederation: "UEFA",
		flag: "🇭🇷",
	},
	{
		name: "Panama",
		code: "PAN",
		group: "L",
		confederation: "CONCACAF",
		flag: "🇵🇦",
	},
	{
		name: "Ghana",
		code: "GHA",
		group: "L",
		confederation: "CAF",
		flag: "🇬🇭",
	},
];

export const VENUES: {
	name: string;
	city: string;
	country: string;
	capacity: number;
	latitude: number;
	longitude: number;
	timezone: string;
}[] = [
	{
		name: "MetLife Stadium",
		city: "East Rutherford, NJ",
		country: "USA",
		capacity: 82500,
		latitude: 40.8135,
		longitude: -74.0745,
		timezone: "America/New_York",
	},
	{
		name: "AT&T Stadium",
		city: "Arlington, TX",
		country: "USA",
		capacity: 80000,
		latitude: 32.7473,
		longitude: -97.0945,
		timezone: "America/Chicago",
	},
	{
		name: "SoFi Stadium",
		city: "Inglewood, CA",
		country: "USA",
		capacity: 70240,
		latitude: 33.9535,
		longitude: -118.3392,
		timezone: "America/Los_Angeles",
	},
	{
		name: "NRG Stadium",
		city: "Houston, TX",
		country: "USA",
		capacity: 72220,
		latitude: 29.6847,
		longitude: -95.4107,
		timezone: "America/Chicago",
	},
	{
		name: "Mercedes-Benz Stadium",
		city: "Atlanta, GA",
		country: "USA",
		capacity: 71000,
		latitude: 33.7554,
		longitude: -84.401,
		timezone: "America/New_York",
	},
	{
		name: "Lumen Field",
		city: "Seattle, WA",
		country: "USA",
		capacity: 69000,
		latitude: 47.5952,
		longitude: -122.3316,
		timezone: "America/Los_Angeles",
	},
	{
		name: "Lincoln Financial Field",
		city: "Philadelphia, PA",
		country: "USA",
		capacity: 69328,
		latitude: 39.9008,
		longitude: -75.1675,
		timezone: "America/New_York",
	},
	{
		name: "Hard Rock Stadium",
		city: "Miami, FL",
		country: "USA",
		capacity: 65326,
		latitude: 25.958,
		longitude: -80.2389,
		timezone: "America/New_York",
	},
	{
		name: "Arrowhead Stadium",
		city: "Kansas City, MO",
		country: "USA",
		capacity: 76416,
		latitude: 39.0489,
		longitude: -94.4839,
		timezone: "America/Chicago",
	},
	{
		name: "Levi's Stadium",
		city: "Santa Clara, CA",
		country: "USA",
		capacity: 68500,
		latitude: 37.4033,
		longitude: -121.9694,
		timezone: "America/Los_Angeles",
	},
	{
		name: "Gillette Stadium",
		city: "Foxborough, MA",
		country: "USA",
		capacity: 65878,
		latitude: 42.0909,
		longitude: -71.2643,
		timezone: "America/New_York",
	},
	{
		name: "Estadio Azteca",
		city: "Mexico City",
		country: "Mexico",
		capacity: 87523,
		latitude: 19.3029,
		longitude: -99.1505,
		timezone: "America/Mexico_City",
	},
	{
		name: "Estadio BBVA",
		city: "Monterrey",
		country: "Mexico",
		capacity: 53500,
		latitude: 25.6696,
		longitude: -100.2444,
		timezone: "America/Monterrey",
	},
	{
		name: "Estadio Akron",
		city: "Guadalajara",
		country: "Mexico",
		capacity: 49850,
		latitude: 20.6813,
		longitude: -103.4625,
		timezone: "America/Mexico_City",
	},
	{
		name: "BMO Field",
		city: "Toronto",
		country: "Canada",
		capacity: 30000,
		latitude: 43.6332,
		longitude: -79.4186,
		timezone: "America/Toronto",
	},
	{
		name: "BC Place",
		city: "Vancouver",
		country: "Canada",
		capacity: 54500,
		latitude: 49.2768,
		longitude: -123.1118,
		timezone: "America/Vancouver",
	},
];

// Generate group stage matches (each team plays the other 3 in their group)
export function generateGroupMatches(
	teams: typeof TEAMS,
	venues: typeof VENUES,
) {
	const groups = [...new Set(teams.map((t) => t.group))].sort();
	const matches: {
		matchNumber: number;
		stage: string;
		group: string;
		homeTeamCode: string;
		awayTeamCode: string;
		venueIndex: number;
		dateTime: Date;
	}[] = [];
	let matchNumber = 1;

	// World Cup starts June 11, 2026
	const startDate = new Date("2026-06-11T18:00:00Z");

	for (const group of groups) {
		const groupTeams = teams.filter((t) => t.group === group);
		// 6 matches per group: 0v1, 2v3, 0v2, 1v3, 0v3, 1v2
		const pairings = [
			[0, 1],
			[2, 3],
			[0, 2],
			[1, 3],
			[0, 3],
			[1, 2],
		];

		for (let i = 0; i < pairings.length; i++) {
			const [h, a] = pairings[i];
			// TODO: replace with official FIFA schedule when published
			const dayOffset = i < 2 ? 0 : i < 4 ? 4 : 8;
			const date = new Date(startDate);
			date.setDate(date.getDate() + dayOffset + groups.indexOf(group));
			date.setHours(date.getHours() + (i % 3) * 3);

			matches.push({
				matchNumber,
				stage: "GROUP",
				group,
				homeTeamCode: groupTeams[h].code,
				awayTeamCode: groupTeams[a].code,
				venueIndex: (matchNumber - 1) % venues.length,
				dateTime: date,
			});
			matchNumber++;
		}
	}

	return matches;
}

async function seed() {
	console.log("🌱 Seeding World Cup 2026 data...");

	// Clear existing data
	await prisma.match.deleteMany();
	await prisma.player.deleteMany();
	await prisma.team.deleteMany();
	await prisma.venue.deleteMany();

	// Seed teams
	const createdTeams = await Promise.all(
		TEAMS.map((team) =>
			prisma.team.create({
				data: team,
			}),
		),
	);
	console.log(`✅ ${createdTeams.length} teams created`);

	// Seed venues
	const createdVenues = await Promise.all(
		VENUES.map((venue) =>
			prisma.venue.create({
				data: venue,
			}),
		),
	);
	console.log(`✅ ${createdVenues.length} venues created`);

	// Seed group stage matches
	const matchData = generateGroupMatches(TEAMS, VENUES);
	const teamMap = new Map(
		createdTeams.map((t: { code: string; id: string }) => [t.code, t.id]),
	);

	const createdMatches = await Promise.all(
		matchData.map((m) => {
			const homeTeamId = teamMap.get(m.homeTeamCode);
			const awayTeamId = teamMap.get(m.awayTeamCode);
			if (!homeTeamId)
				throw new Error(
					`Unknown home team code "${m.homeTeamCode}" in match ${m.matchNumber}`,
				);
			if (!awayTeamId)
				throw new Error(
					`Unknown away team code "${m.awayTeamCode}" in match ${m.matchNumber}`,
				);
			return prisma.match.create({
				data: {
					matchNumber: m.matchNumber,
					stage: m.stage,
					group: m.group,
					dateTime: m.dateTime,
					homeTeamId,
					awayTeamId,
					venueId: createdVenues[m.venueIndex].id,
					status: "SCHEDULED",
				},
			});
		}),
	);
	console.log(`✅ ${createdMatches.length} matches created`);

	console.log("🏆 Seed complete!");
}

// Only execute when run directly (e.g. npx tsx prisma/seed.ts), not when imported in tests
if (process.argv[1]?.endsWith("seed.ts")) {
	seed()
		.catch((e) => {
			console.error("❌ Seed failed:", e);
			process.exit(1);
		})
		.finally(() => prisma.$disconnect());
}
