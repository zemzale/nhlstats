import { Team } from "./teams"

async function RegularSeason() {
  return fetch("https://statsapi.web.nhl.com/api/v1/standings/regularSeason", {
    method: "GET",
    headers: {},
  })
    .then((response) => response.json())
    .then((response) => response.records)
    .catch((err) => console.error(err))
}

export interface League {
  id: number
  name: string
  link: string
}

export interface Division {
  id: number
  name: string
  nameShort: string
  link: string
  abbreviation: string
}

export interface Conference {
  id: number
  name: string
  link: string
}

export interface LeagueRecord {
  wins: number
  losses: number
  ot: number
  type: string
}

export interface Streak {
  streakType: string
  streakNumber: number
  streakCode: string
}

export interface TeamRecord {
  team: Team
  leagueRecord: LeagueRecord
  regulationWins: number
  goalsAgainst: number
  goalsScored: number
  points: number
  divisionRank: string
  divisionL10Rank: string
  divisionRoadRank: string
  divisionHomeRank: string
  conferenceRank: string
  conferenceL10Rank: string
  conferenceRoadRank: string
  conferenceHomeRank: string
  leagueRank: string
  leagueL10Rank: string
  leagueRoadRank: string
  leagueHomeRank: string
  wildCardRank: string
  row: number
  gamesPlayed: number
  streak: Streak
  clinchIndicator: string
  pointsPercentage: number
  ppDivisionRank: string
  ppConferenceRank: string
  ppLeagueRank: string
  lastUpdated: Date
}

export interface Record {
  standingsType: string
  league: League
  division: Division
  conference: Conference
  teamRecords: TeamRecord[]
}

export { RegularSeason }
