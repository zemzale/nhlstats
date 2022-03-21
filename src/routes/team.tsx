import { Link, useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { TeamById, TeamPlayers } from "../api/teams"

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
      <div>
        <div>{query.data.name}</div>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <td>Name</td>
            </tr>
          </thead>
          <tbody>
            {playerQuery.data.roster.map((player: any) => (
              <tr key={player.person.id} className="text-white border-b">
                <td className="px-5 py-2">
                  <Link to={`/palyers/${player.person.id}`}>
                    {player.person.fullName}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
