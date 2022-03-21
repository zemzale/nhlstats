import { useQuery } from "react-query"
import { Team, AllTeams } from "../api/teams"

export default function Teams() {
  const query = useQuery("teams", AllTeams)

  if (query.isLoading) {
    return <div> Loading... </div>
  }

  return (
    <div>
      <table className="text-white border-solid">
        <thead className="bg-gray-800">
          <tr>
            <th className="text-white py-3">Team</th>
          </tr>
        </thead>
        <tbody className="bg-gray-700">
          {query.data.teams.map((team: Team) => (
            <tr key={team.id} className="text-white border-b">
              <td className="px-5 py-2">{team.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
