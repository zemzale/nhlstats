async function AllTeams() {
  return fetch("https://statsapi.web.nhl.com/api/v1/teams", {
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

export { Team, AllTeams }
