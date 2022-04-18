async function PlayerById(id: string) {
  return fetch(`https://statsapi.web.nhl.com/api/v1/people/${id}`, {
    method: "GET",
    headers: {},
  })
    .then((response) => response.json())
    .then((response) => response.people[0])
    .catch((err) => console.error(err))
}

async function PlayerStatsById(id: string) {
  return fetch(
    `https://statsapi.web.nhl.com/api/v1/people/${id}/stats?stats=yearByYear`,
    {
      method: "GET",
      headers: {},
    },
  )
    .then((response) => response.json())
    .catch((err) => console.error(err))
}

export interface Player {
  person: Person
  jerseyNumber: string
  position: Position
}

interface Person {
  id: number
  fullName: string
}

interface Position {
  code: string
  name: string
  type: string
  abbreviation: string
}

export { PlayerById, PlayerStatsById }
