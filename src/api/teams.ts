async function AllTeams() {
  return fetch("https://statsapi.web.nhl.com/api/v1/teams", {
    method: "GET",
    headers: {},
  })
    .then((response) => response.json())
    .catch((err) => console.error(err))
}

async function TeamById(id: string) {
  return fetch(`https://statsapi.web.nhl.com/api/v1/teams/${id}`, {
    method: "GET",
    headers: {},
  })
    .then((response) => response.json())
    .then((response) => response.teams[0])
    .catch((err) => console.error(err))
}

async function TeamPlayers(id: string) {
  return fetch(`https://statsapi.web.nhl.com/api/v1/teams/${id}/roster`, {
    method: "GET",
    headers: {},
  })
    .then((response) => response.json())
    .catch((err) => console.error(err))
}

interface Team {
  id: number
  name: string
}

export { Team, AllTeams, TeamById, TeamPlayers }
