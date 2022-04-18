import { Link, useParams } from "react-router-dom"
import { useQuery } from "react-query"
import { TeamById, TeamPlayers } from "../api/teams"
import { Player } from "../api/players"

export default function TeamPage() {
  const { id } = useParams<TeamId>()
  if (id === undefined) {
    return <div>Player ID not found</div>
  }

  const query = useQuery(["teams", id], () => TeamById(id!))
  const playerQuery = useQuery(["teams.palyers", id], () => TeamPlayers(id!))

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
              {playerColumnElement(player.person.id, player.person.fullName)}
              {playerColumnElement(player.person.id, player.jerseyNumber)}
              {playerColumnElement(player.person.id, player.position.name)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const playerColumnElement = (id: number, value: any) => {
  return (
    <td className="px-5 py-2">
      <Link to={`/players/${id}`}>{value}</Link>
    </td>
  )
}

type TeamId = {
  id: string
}
