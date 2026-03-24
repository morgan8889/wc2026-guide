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

// Official FIFA World Cup 2026 group stage schedule.
// All times converted from ET (EDT = UTC-4) to UTC for storage.
export const OFFICIAL_MATCHES: {
	matchNumber: number;
	group: string;
	homeTeamCode: string;
	awayTeamCode: string;
	venueName: string;
	dateTime: Date;
}[] = [
	// Group A
	{
		matchNumber: 1,
		group: "A",
		homeTeamCode: "MEX",
		awayTeamCode: "RSA",
		venueName: "Estadio Azteca",
		dateTime: new Date("2026-06-11T19:00:00Z"),
	},
	{
		matchNumber: 2,
		group: "A",
		homeTeamCode: "KOR",
		awayTeamCode: "TBD",
		venueName: "Estadio Akron",
		dateTime: new Date("2026-06-12T02:00:00Z"),
	},
	{
		matchNumber: 3,
		group: "A",
		homeTeamCode: "TBD",
		awayTeamCode: "RSA",
		venueName: "Mercedes-Benz Stadium",
		dateTime: new Date("2026-06-18T16:00:00Z"),
	},
	{
		matchNumber: 4,
		group: "A",
		homeTeamCode: "MEX",
		awayTeamCode: "KOR",
		venueName: "Estadio Akron",
		dateTime: new Date("2026-06-19T01:00:00Z"),
	},
	{
		matchNumber: 5,
		group: "A",
		homeTeamCode: "TBD",
		awayTeamCode: "MEX",
		venueName: "Estadio Azteca",
		dateTime: new Date("2026-06-25T01:00:00Z"),
	},
	{
		matchNumber: 6,
		group: "A",
		homeTeamCode: "RSA",
		awayTeamCode: "KOR",
		venueName: "Estadio BBVA",
		dateTime: new Date("2026-06-25T01:00:00Z"),
	},
	// Group B
	{
		matchNumber: 7,
		group: "B",
		homeTeamCode: "CAN",
		awayTeamCode: "TBA",
		venueName: "BMO Field",
		dateTime: new Date("2026-06-12T19:00:00Z"),
	},
	{
		matchNumber: 8,
		group: "B",
		homeTeamCode: "QAT",
		awayTeamCode: "SUI",
		venueName: "Levi's Stadium",
		dateTime: new Date("2026-06-13T19:00:00Z"),
	},
	{
		matchNumber: 9,
		group: "B",
		homeTeamCode: "SUI",
		awayTeamCode: "TBA",
		venueName: "SoFi Stadium",
		dateTime: new Date("2026-06-18T19:00:00Z"),
	},
	{
		matchNumber: 10,
		group: "B",
		homeTeamCode: "CAN",
		awayTeamCode: "QAT",
		venueName: "BC Place",
		dateTime: new Date("2026-06-18T22:00:00Z"),
	},
	{
		matchNumber: 11,
		group: "B",
		homeTeamCode: "SUI",
		awayTeamCode: "CAN",
		venueName: "BC Place",
		dateTime: new Date("2026-06-24T19:00:00Z"),
	},
	{
		matchNumber: 12,
		group: "B",
		homeTeamCode: "TBA",
		awayTeamCode: "QAT",
		venueName: "Lumen Field",
		dateTime: new Date("2026-06-24T19:00:00Z"),
	},
	// Group C
	{
		matchNumber: 13,
		group: "C",
		homeTeamCode: "BRA",
		awayTeamCode: "MAR",
		venueName: "MetLife Stadium",
		dateTime: new Date("2026-06-13T22:00:00Z"),
	},
	{
		matchNumber: 14,
		group: "C",
		homeTeamCode: "HAI",
		awayTeamCode: "SCO",
		venueName: "Gillette Stadium",
		dateTime: new Date("2026-06-14T01:00:00Z"),
	},
	{
		matchNumber: 15,
		group: "C",
		homeTeamCode: "SCO",
		awayTeamCode: "MAR",
		venueName: "Gillette Stadium",
		dateTime: new Date("2026-06-19T22:00:00Z"),
	},
	{
		matchNumber: 16,
		group: "C",
		homeTeamCode: "BRA",
		awayTeamCode: "HAI",
		venueName: "Lincoln Financial Field",
		dateTime: new Date("2026-06-20T01:00:00Z"),
	},
	{
		matchNumber: 17,
		group: "C",
		homeTeamCode: "SCO",
		awayTeamCode: "BRA",
		venueName: "Hard Rock Stadium",
		dateTime: new Date("2026-06-24T22:00:00Z"),
	},
	{
		matchNumber: 18,
		group: "C",
		homeTeamCode: "MAR",
		awayTeamCode: "HAI",
		venueName: "Mercedes-Benz Stadium",
		dateTime: new Date("2026-06-24T22:00:00Z"),
	},
	// Group D
	{
		matchNumber: 19,
		group: "D",
		homeTeamCode: "USA",
		awayTeamCode: "PAR",
		venueName: "SoFi Stadium",
		dateTime: new Date("2026-06-13T01:00:00Z"),
	},
	{
		matchNumber: 20,
		group: "D",
		homeTeamCode: "AUS",
		awayTeamCode: "TBC",
		venueName: "BC Place",
		dateTime: new Date("2026-06-13T04:00:00Z"),
	},
	{
		matchNumber: 21,
		group: "D",
		homeTeamCode: "USA",
		awayTeamCode: "AUS",
		venueName: "Lumen Field",
		dateTime: new Date("2026-06-19T19:00:00Z"),
	},
	{
		matchNumber: 22,
		group: "D",
		homeTeamCode: "TBC",
		awayTeamCode: "PAR",
		venueName: "Levi's Stadium",
		dateTime: new Date("2026-06-19T04:00:00Z"),
	},
	{
		matchNumber: 23,
		group: "D",
		homeTeamCode: "TBC",
		awayTeamCode: "USA",
		venueName: "SoFi Stadium",
		dateTime: new Date("2026-06-26T02:00:00Z"),
	},
	{
		matchNumber: 24,
		group: "D",
		homeTeamCode: "PAR",
		awayTeamCode: "AUS",
		venueName: "Levi's Stadium",
		dateTime: new Date("2026-06-26T02:00:00Z"),
	},
	// Group E
	{
		matchNumber: 25,
		group: "E",
		homeTeamCode: "GER",
		awayTeamCode: "CUW",
		venueName: "NRG Stadium",
		dateTime: new Date("2026-06-14T17:00:00Z"),
	},
	{
		matchNumber: 26,
		group: "E",
		homeTeamCode: "CIV",
		awayTeamCode: "ECU",
		venueName: "Lincoln Financial Field",
		dateTime: new Date("2026-06-14T23:00:00Z"),
	},
	{
		matchNumber: 27,
		group: "E",
		homeTeamCode: "GER",
		awayTeamCode: "CIV",
		venueName: "BMO Field",
		dateTime: new Date("2026-06-20T20:00:00Z"),
	},
	{
		matchNumber: 28,
		group: "E",
		homeTeamCode: "ECU",
		awayTeamCode: "CUW",
		venueName: "Arrowhead Stadium",
		dateTime: new Date("2026-06-21T00:00:00Z"),
	},
	{
		matchNumber: 29,
		group: "E",
		homeTeamCode: "ECU",
		awayTeamCode: "GER",
		venueName: "MetLife Stadium",
		dateTime: new Date("2026-06-25T20:00:00Z"),
	},
	{
		matchNumber: 30,
		group: "E",
		homeTeamCode: "CUW",
		awayTeamCode: "CIV",
		venueName: "Lincoln Financial Field",
		dateTime: new Date("2026-06-25T20:00:00Z"),
	},
	// Group F
	{
		matchNumber: 31,
		group: "F",
		homeTeamCode: "NED",
		awayTeamCode: "JPN",
		venueName: "AT&T Stadium",
		dateTime: new Date("2026-06-14T20:00:00Z"),
	},
	{
		matchNumber: 32,
		group: "F",
		homeTeamCode: "TBB",
		awayTeamCode: "TUN",
		venueName: "Estadio BBVA",
		dateTime: new Date("2026-06-15T02:00:00Z"),
	},
	{
		matchNumber: 33,
		group: "F",
		homeTeamCode: "NED",
		awayTeamCode: "TBB",
		venueName: "NRG Stadium",
		dateTime: new Date("2026-06-20T17:00:00Z"),
	},
	{
		matchNumber: 34,
		group: "F",
		homeTeamCode: "TUN",
		awayTeamCode: "JPN",
		venueName: "Estadio BBVA",
		dateTime: new Date("2026-06-20T04:00:00Z"),
	},
	{
		matchNumber: 35,
		group: "F",
		homeTeamCode: "JPN",
		awayTeamCode: "TBB",
		venueName: "AT&T Stadium",
		dateTime: new Date("2026-06-25T23:00:00Z"),
	},
	{
		matchNumber: 36,
		group: "F",
		homeTeamCode: "TUN",
		awayTeamCode: "NED",
		venueName: "Arrowhead Stadium",
		dateTime: new Date("2026-06-25T23:00:00Z"),
	},
	// Group G
	{
		matchNumber: 37,
		group: "G",
		homeTeamCode: "IRN",
		awayTeamCode: "NZL",
		venueName: "SoFi Stadium",
		dateTime: new Date("2026-06-16T01:00:00Z"),
	},
	{
		matchNumber: 38,
		group: "G",
		homeTeamCode: "BEL",
		awayTeamCode: "EGY",
		venueName: "Lumen Field",
		dateTime: new Date("2026-06-15T19:00:00Z"),
	},
	{
		matchNumber: 39,
		group: "G",
		homeTeamCode: "BEL",
		awayTeamCode: "IRN",
		venueName: "SoFi Stadium",
		dateTime: new Date("2026-06-21T19:00:00Z"),
	},
	{
		matchNumber: 40,
		group: "G",
		homeTeamCode: "NZL",
		awayTeamCode: "EGY",
		venueName: "BC Place",
		dateTime: new Date("2026-06-22T01:00:00Z"),
	},
	{
		matchNumber: 41,
		group: "G",
		homeTeamCode: "EGY",
		awayTeamCode: "IRN",
		venueName: "Lumen Field",
		dateTime: new Date("2026-06-27T03:00:00Z"),
	},
	{
		matchNumber: 42,
		group: "G",
		homeTeamCode: "NZL",
		awayTeamCode: "BEL",
		venueName: "BC Place",
		dateTime: new Date("2026-06-27T03:00:00Z"),
	},
	// Group H
	{
		matchNumber: 43,
		group: "H",
		homeTeamCode: "ESP",
		awayTeamCode: "CPV",
		venueName: "Mercedes-Benz Stadium",
		dateTime: new Date("2026-06-15T16:00:00Z"),
	},
	{
		matchNumber: 44,
		group: "H",
		homeTeamCode: "KSA",
		awayTeamCode: "URU",
		venueName: "Hard Rock Stadium",
		dateTime: new Date("2026-06-15T22:00:00Z"),
	},
	{
		matchNumber: 45,
		group: "H",
		homeTeamCode: "ESP",
		awayTeamCode: "KSA",
		venueName: "Mercedes-Benz Stadium",
		dateTime: new Date("2026-06-21T16:00:00Z"),
	},
	{
		matchNumber: 46,
		group: "H",
		homeTeamCode: "URU",
		awayTeamCode: "CPV",
		venueName: "Hard Rock Stadium",
		dateTime: new Date("2026-06-21T22:00:00Z"),
	},
	{
		matchNumber: 47,
		group: "H",
		homeTeamCode: "CPV",
		awayTeamCode: "KSA",
		venueName: "NRG Stadium",
		dateTime: new Date("2026-06-27T00:00:00Z"),
	},
	{
		matchNumber: 48,
		group: "H",
		homeTeamCode: "URU",
		awayTeamCode: "ESP",
		venueName: "Estadio Akron",
		dateTime: new Date("2026-06-27T00:00:00Z"),
	},
	// Group I
	{
		matchNumber: 49,
		group: "I",
		homeTeamCode: "FRA",
		awayTeamCode: "SEN",
		venueName: "MetLife Stadium",
		dateTime: new Date("2026-06-16T19:00:00Z"),
	},
	{
		matchNumber: 50,
		group: "I",
		homeTeamCode: "TBF",
		awayTeamCode: "NOR",
		venueName: "Gillette Stadium",
		dateTime: new Date("2026-06-16T22:00:00Z"),
	},
	{
		matchNumber: 51,
		group: "I",
		homeTeamCode: "FRA",
		awayTeamCode: "TBF",
		venueName: "Lincoln Financial Field",
		dateTime: new Date("2026-06-22T21:00:00Z"),
	},
	{
		matchNumber: 52,
		group: "I",
		homeTeamCode: "NOR",
		awayTeamCode: "SEN",
		venueName: "MetLife Stadium",
		dateTime: new Date("2026-06-23T00:00:00Z"),
	},
	{
		matchNumber: 53,
		group: "I",
		homeTeamCode: "NOR",
		awayTeamCode: "FRA",
		venueName: "Gillette Stadium",
		dateTime: new Date("2026-06-26T19:00:00Z"),
	},
	{
		matchNumber: 54,
		group: "I",
		homeTeamCode: "SEN",
		awayTeamCode: "TBF",
		venueName: "BMO Field",
		dateTime: new Date("2026-06-26T19:00:00Z"),
	},
	// Group J
	{
		matchNumber: 55,
		group: "J",
		homeTeamCode: "ARG",
		awayTeamCode: "ALG",
		venueName: "Arrowhead Stadium",
		dateTime: new Date("2026-06-17T01:00:00Z"),
	},
	{
		matchNumber: 56,
		group: "J",
		homeTeamCode: "AUT",
		awayTeamCode: "JOR",
		venueName: "Levi's Stadium",
		dateTime: new Date("2026-06-16T04:00:00Z"),
	},
	{
		matchNumber: 57,
		group: "J",
		homeTeamCode: "ARG",
		awayTeamCode: "AUT",
		venueName: "AT&T Stadium",
		dateTime: new Date("2026-06-22T17:00:00Z"),
	},
	{
		matchNumber: 58,
		group: "J",
		homeTeamCode: "JOR",
		awayTeamCode: "ALG",
		venueName: "Levi's Stadium",
		dateTime: new Date("2026-06-23T03:00:00Z"),
	},
	{
		matchNumber: 59,
		group: "J",
		homeTeamCode: "ALG",
		awayTeamCode: "AUT",
		venueName: "Arrowhead Stadium",
		dateTime: new Date("2026-06-28T02:00:00Z"),
	},
	{
		matchNumber: 60,
		group: "J",
		homeTeamCode: "JOR",
		awayTeamCode: "ARG",
		venueName: "AT&T Stadium",
		dateTime: new Date("2026-06-28T02:00:00Z"),
	},
	// Group K
	{
		matchNumber: 61,
		group: "K",
		homeTeamCode: "POR",
		awayTeamCode: "TBE",
		venueName: "NRG Stadium",
		dateTime: new Date("2026-06-17T17:00:00Z"),
	},
	{
		matchNumber: 62,
		group: "K",
		homeTeamCode: "UZB",
		awayTeamCode: "COL",
		venueName: "Estadio Azteca",
		dateTime: new Date("2026-06-18T02:00:00Z"),
	},
	{
		matchNumber: 63,
		group: "K",
		homeTeamCode: "POR",
		awayTeamCode: "UZB",
		venueName: "NRG Stadium",
		dateTime: new Date("2026-06-23T17:00:00Z"),
	},
	{
		matchNumber: 64,
		group: "K",
		homeTeamCode: "COL",
		awayTeamCode: "TBE",
		venueName: "Estadio Akron",
		dateTime: new Date("2026-06-24T02:00:00Z"),
	},
	{
		matchNumber: 65,
		group: "K",
		homeTeamCode: "COL",
		awayTeamCode: "POR",
		venueName: "Hard Rock Stadium",
		dateTime: new Date("2026-06-27T23:30:00Z"),
	},
	{
		matchNumber: 66,
		group: "K",
		homeTeamCode: "TBE",
		awayTeamCode: "UZB",
		venueName: "Mercedes-Benz Stadium",
		dateTime: new Date("2026-06-27T23:30:00Z"),
	},
	// Group L
	{
		matchNumber: 67,
		group: "L",
		homeTeamCode: "ENG",
		awayTeamCode: "CRO",
		venueName: "AT&T Stadium",
		dateTime: new Date("2026-06-17T20:00:00Z"),
	},
	{
		matchNumber: 68,
		group: "L",
		homeTeamCode: "GHA",
		awayTeamCode: "PAN",
		venueName: "BMO Field",
		dateTime: new Date("2026-06-17T23:00:00Z"),
	},
	{
		matchNumber: 69,
		group: "L",
		homeTeamCode: "ENG",
		awayTeamCode: "GHA",
		venueName: "Gillette Stadium",
		dateTime: new Date("2026-06-23T20:00:00Z"),
	},
	{
		matchNumber: 70,
		group: "L",
		homeTeamCode: "PAN",
		awayTeamCode: "CRO",
		venueName: "BMO Field",
		dateTime: new Date("2026-06-23T23:00:00Z"),
	},
	{
		matchNumber: 71,
		group: "L",
		homeTeamCode: "PAN",
		awayTeamCode: "ENG",
		venueName: "MetLife Stadium",
		dateTime: new Date("2026-06-27T21:00:00Z"),
	},
	{
		matchNumber: 72,
		group: "L",
		homeTeamCode: "CRO",
		awayTeamCode: "GHA",
		venueName: "Lincoln Financial Field",
		dateTime: new Date("2026-06-27T21:00:00Z"),
	},
];

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

	const venueMap = new Map(
		createdVenues.map((v: { name: string; id: string }) => [v.name, v.id]),
	);

	// Seed group stage matches
	const teamMap = new Map(
		createdTeams.map((t: { code: string; id: string }) => [t.code, t.id]),
	);

	const createdMatches = await Promise.all(
		OFFICIAL_MATCHES.map((m) => {
			const homeTeamId = teamMap.get(m.homeTeamCode);
			const awayTeamId = teamMap.get(m.awayTeamCode);
			const venueId = venueMap.get(m.venueName);
			if (!homeTeamId)
				throw new Error(
					`Unknown home team code "${m.homeTeamCode}" in match ${m.matchNumber}`,
				);
			if (!awayTeamId)
				throw new Error(
					`Unknown away team code "${m.awayTeamCode}" in match ${m.matchNumber}`,
				);
			if (!venueId)
				throw new Error(
					`Unknown venue "${m.venueName}" in match ${m.matchNumber}`,
				);
			return prisma.match.create({
				data: {
					matchNumber: m.matchNumber,
					stage: "GROUP",
					group: m.group,
					dateTime: m.dateTime,
					homeTeamId,
					awayTeamId,
					venueId,
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
