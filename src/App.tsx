import { QueryClient, QueryClientProvider, useQuery } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import "./App.css"

const queryClient = new QueryClient()

function App() {
  return (
    <div className="bg-neutral-900">
      <QueryClientProvider client={queryClient}>
        <Teams />
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </div>
  )
}

function Teams() {
  const query = useQuery("teams", () =>
    fetch("https://statsapi.web.nhl.com/api/v1/teams", {
      method: "GET",
      headers: {},
    })
      .then((response) => response.json())
      .catch((err) => console.error(err)),
  )

  if (query.isLoading) {
    return <div> Loading... </div>
  }

  return (
    <div>
      <table className="text-white">
        <tr>
          <th className="text-white">Team</th>
        </tr>
        {query.data.teams.map((team: Team) => (
          <tr key={team.id} className="text-white">
            <td>{team.name}</td>
          </tr>
        ))}
      </table>
    </div>
  )
}

interface Team {
  id: number
  name: string
}

export default App
