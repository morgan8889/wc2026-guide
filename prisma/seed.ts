import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaBetterSqlite3({
	url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

// FIFA World Cup 2026 — 48 teams in 12 groups
const TEAMS: {
	name: string;
	code: string;
	group: string;
	confederation: string;
	flag: string;
}[] = [
	// Group A
	{
		name: "Morocco",
		code: "MAR",
		group: "A",
		confederation: "CAF",
		flag: "🇲🇦",
	},
	{
		name: "Croatia",
		code: "CRO",
		group: "A",
		confederation: "UEFA",
		flag: "🇭🇷",
	},
	{
		name: "Scotland",
		code: "SCO",
		group: "A",
		confederation: "UEFA",
		flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
	},
	{
		name: "Peru",
		code: "PER",
		group: "A",
		confederation: "CONMEBOL",
		flag: "🇵🇪",
	},
	// Group B
	{
		name: "France",
		code: "FRA",
		group: "B",
		confederation: "UEFA",
		flag: "🇫🇷",
	},
	{
		name: "Indonesia",
		code: "IDN",
		group: "B",
		confederation: "AFC",
		flag: "🇮🇩",
	},
	{
		name: "Colombia",
		code: "COL",
		group: "B",
		confederation: "CONMEBOL",
		flag: "🇨🇴",
	},
	{
		name: "New Zealand",
		code: "NZL",
		group: "B",
		confederation: "OFC",
		flag: "🇳🇿",
	},
	// Group C
	{
		name: "Argentina",
		code: "ARG",
		group: "C",
		confederation: "CONMEBOL",
		flag: "🇦🇷",
	},
	{ name: "Egypt", code: "EGY", group: "C", confederation: "CAF", flag: "🇪🇬" },
	{
		name: "Uzbekistan",
		code: "UZB",
		group: "C",
		confederation: "AFC",
		flag: "🇺🇿",
	},
	{
		name: "Guatemala",
		code: "GUA",
		group: "C",
		confederation: "CONCACAF",
		flag: "🇬🇹",
	},
	// Group D
	{
		name: "Portugal",
		code: "POR",
		group: "D",
		confederation: "UEFA",
		flag: "🇵🇹",
	},
	{
		name: "Paraguay",
		code: "PAR",
		group: "D",
		confederation: "CONMEBOL",
		flag: "🇵🇾",
	},
	{
		name: "Cameroon",
		code: "CMR",
		group: "D",
		confederation: "CAF",
		flag: "🇨🇲",
	},
	{
		name: "Bahrain",
		code: "BHR",
		group: "D",
		confederation: "AFC",
		flag: "🇧🇭",
	},
	// Group E
	{
		name: "Brazil",
		code: "BRA",
		group: "E",
		confederation: "CONMEBOL",
		flag: "🇧🇷",
	},
	{
		name: "Turkey",
		code: "TUR",
		group: "E",
		confederation: "UEFA",
		flag: "🇹🇷",
	},
	{
		name: "Ecuador",
		code: "ECU",
		group: "E",
		confederation: "CONMEBOL",
		flag: "🇪🇨",
	},
	{
		name: "Bolivia",
		code: "BOL",
		group: "E",
		confederation: "CONMEBOL",
		flag: "🇧🇴",
	},
	// Group F
	{
		name: "Germany",
		code: "GER",
		group: "F",
		confederation: "UEFA",
		flag: "🇩🇪",
	},
	{ name: "Kenya", code: "KEN", group: "F", confederation: "CAF", flag: "🇰🇪" },
	{
		name: "Chile",
		code: "CHI",
		group: "F",
		confederation: "CONMEBOL",
		flag: "🇨🇱",
	},
	{
		name: "Serbia",
		code: "SRB",
		group: "F",
		confederation: "UEFA",
		flag: "🇷🇸",
	},
	// Group G
	{ name: "Spain", code: "ESP", group: "G", confederation: "UEFA", flag: "🇪🇸" },
	{
		name: "Albania",
		code: "ALB",
		group: "G",
		confederation: "UEFA",
		flag: "🇦🇱",
	},
	{
		name: "Nigeria",
		code: "NGA",
		group: "G",
		confederation: "CAF",
		flag: "🇳🇬",
	},
	{
		name: "Thailand",
		code: "THA",
		group: "G",
		confederation: "AFC",
		flag: "🇹🇭",
	},
	// Group H
	{
		name: "England",
		code: "ENG",
		group: "H",
		confederation: "UEFA",
		flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
	},
	{
		name: "Senegal",
		code: "SEN",
		group: "H",
		confederation: "CAF",
		flag: "🇸🇳",
	},
	{
		name: "Denmark",
		code: "DEN",
		group: "H",
		confederation: "UEFA",
		flag: "🇩🇰",
	},
	{
		name: "Panama",
		code: "PAN",
		group: "H",
		confederation: "CONCACAF",
		flag: "🇵🇦",
	},
	// Group I
	{
		name: "Mexico",
		code: "MEX",
		group: "I",
		confederation: "CONCACAF",
		flag: "🇲🇽",
	},
	{ name: "Japan", code: "JPN", group: "I", confederation: "AFC", flag: "🇯🇵" },
	{
		name: "Honduras",
		code: "HON",
		group: "I",
		confederation: "CONCACAF",
		flag: "🇭🇳",
	},
	{
		name: "Costa Rica",
		code: "CRC",
		group: "I",
		confederation: "CONCACAF",
		flag: "🇨🇷",
	},
	// Group J
	{
		name: "United States",
		code: "USA",
		group: "J",
		confederation: "CONCACAF",
		flag: "🇺🇸",
	},
	{
		name: "Uruguay",
		code: "URU",
		group: "J",
		confederation: "CONMEBOL",
		flag: "🇺🇾",
	},
	{ name: "Iran", code: "IRN", group: "J", confederation: "AFC", flag: "🇮🇷" },
	{ name: "Wales", code: "WAL", group: "J", confederation: "UEFA", flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿" },
	// Group K
	{ name: "Italy", code: "ITA", group: "K", confederation: "UEFA", flag: "🇮🇹" },
	{
		name: "Australia",
		code: "AUS",
		group: "K",
		confederation: "AFC",
		flag: "🇦🇺",
	},
	{
		name: "South Korea",
		code: "KOR",
		group: "K",
		confederation: "AFC",
		flag: "🇰🇷",
	},
	{
		name: "Trinidad and Tobago",
		code: "TRI",
		group: "K",
		confederation: "CONCACAF",
		flag: "🇹🇹",
	},
	// Group L
	{
		name: "Canada",
		code: "CAN",
		group: "L",
		confederation: "CONCACAF",
		flag: "🇨🇦",
	},
	{
		name: "Netherlands",
		code: "NED",
		group: "L",
		confederation: "UEFA",
		flag: "🇳🇱",
	},
	{
		name: "Belgium",
		code: "BEL",
		group: "L",
		confederation: "UEFA",
		flag: "🇧🇪",
	},
	{
		name: "Saudi Arabia",
		code: "KSA",
		group: "L",
		confederation: "AFC",
		flag: "🇸🇦",
	},
];

const VENUES: {
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
function generateGroupMatches(teams: typeof TEAMS, venues: typeof VENUES) {
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
	const teamMap = new Map(createdTeams.map((t: { code: string; id: string }) => [t.code, t.id]));

	const createdMatches = await Promise.all(
		matchData.map((m) =>
			prisma.match.create({
				data: {
					matchNumber: m.matchNumber,
					stage: m.stage,
					group: m.group,
					dateTime: m.dateTime,
					homeTeamId: teamMap.get(m.homeTeamCode) ?? "",
					awayTeamId: teamMap.get(m.awayTeamCode) ?? "",
					venueId: createdVenues[m.venueIndex].id,
					status: "SCHEDULED",
				},
			}),
		),
	);
	console.log(`✅ ${createdMatches.length} matches created`);

	console.log("🏆 Seed complete!");
}

seed()
	.catch((e) => {
		console.error("❌ Seed failed:", e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
