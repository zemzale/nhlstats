import { Link, useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { TeamById, TeamPlayers } from "../api/teams"
import { Player } from "../api/players"

export default function Team() {
  const param = useParams()
  const query = useQuery(["teams", param.id], () => TeamById(param.id))
  const playerQuery = useQuery(["teams.palyers", param.id], () =>
    TeamPlayers(param.id),
  )

  if (query.isLoading || playerQuery.isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div className="flex flex-col text-white">
      <div className="p-10">
        <div>{query.data.name}</div>
      </div>
      <table className="border-solid m-10">
        <thead className="bg-gray-800">
          <tr>
            <td className="py-3">Name</td>
            <td className="py-3">Number</td>
            <td className="py-3">Position</td>
          </tr>
        </thead>
        <tbody className="bg-gray-700">
          {playerQuery.data.roster.map((player: Player) => (
            <tr key={player.person.id} className="border-b">
              <td className="px-5 py-2">
                <Link to={`/players/${player.person.id}`}>
                  {player.person.fullName}
                </Link>
              </td>
              <td className="px-5 py-2">
                <Link to={`/players/${player.person.id}`}>
                  {player.jerseyNumber}
                </Link>
              </td>
              <td className="px-5 py-2">
                <Link to={`/players/${player.person.id}`}>
                  {player.position.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
