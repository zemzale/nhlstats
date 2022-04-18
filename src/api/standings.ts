async function RegularSeason() {
  return fetch("https://statsapi.web.nhl.com/api/v1/standings/regularSeason", {
    method: "GET",
    headers: {},
  })
    .then((response) => response.json())
    .catch((err) => console.error(err))
}

export { RegularSeason }
