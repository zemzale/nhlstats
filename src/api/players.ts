async function PlayerById(id: string) {
  return fetch(`https://statsapi.web.nhl.com/api/v1/people/${id}`, {
    method: 'GET',
    headers: {},
  })
    .then((response) => response.json())
    .then((response) => response.people.pop())
}

async function PlayerStatsById(id: string) {
  return fetch(
    `https://statsapi.web.nhl.com/api/v1/people/${id}/stats?stats=yearByYear`,
    {
      method: 'GET',
      headers: {},
    },
  )
    .then((response) => response.json())
    .then((response) => response.stats.pop().splits)
}

export interface CurrentTeam {
  id: number
  name: string
  link: string
}

export interface PrimaryPosition {
  code: string
  name: string
  type: string
  abbreviation: string
}

export interface Person {
  id: number
  fullName: string
  link: string
  firstName: string
  lastName: string
  primaryNumber: string
  birthDate: string
  currentAge: number
  birthCity: string
  birthStateProvince: string
  birthCountry: string
  nationality: string
  height: string
  weight: number
  active: boolean
  alternateCaptain: boolean
  captain: boolean
  rookie: boolean
  shootsCatches: string
  rosterStatus: string
  currentTeam: CurrentTeam
  primaryPosition: PrimaryPosition
}

export interface RootObject {
  copyright: string
  people: Person[]
}

export interface Player {
  person: Person
  jerseyNumber: string
  position: Position
}

interface Position {
  code: string
  name: string
  type: string
  abbreviation: string
}

export interface Type {
  displayName: string
  gameType?: GameType
}

export interface GameType {
  id: string
  description: string
  postseason: boolean
}

export interface Stat2 {
  assists: number
  goals: number
  pim: number
  games: number
  penaltyMinutes: string
  plusMinus: number
  points: number
  timeOnIce: string
  powerPlayGoals?: number
  powerPlayTimeOnIce: string
  evenTimeOnIce: string
  faceOffPct?: number
  shortHandedGoals?: number
  shortHandedTimeOnIce: string
  shifts?: number
  shots?: number
  hits?: number
  powerPlayPoints?: number
  shotPct?: number
  gameWinningGoals?: number
  overTimeGoals?: number
  shortHandedPoints?: number
  blocked?: number
}

export interface Team {
  name: string
  link: string
  id?: number
}

export interface League {
  name: string
  link: string
  id?: number
}

export interface Split {
  season: string
  stat: Stat2
  team: Team
  league: League
  sequenceNumber: number
}

export interface Stat {
  type: Type
  splits: Split[]
}

export interface StatsRootObject {
  copyright: string
  stats: Stat[]
}

export { PlayerById, PlayerStatsById }
