import { useParams } from "react-router-dom"
import { PlayerById, PlayerStatsById } from "../api/players"
import { useQuery } from "react-query"

export default function Player() {
  const param = useParams()
  const query = useQuery(["player", param.id], () => PlayerById(param.id))
  const queryStats = useQuery(["player.stats", param.id], () =>
    PlayerStatsById(param.id),
  )
  if (query.isLoading || queryStats.isLoading) {
    return <div> Loading...</div>
  }
  return (
    <div className="text-white">
      <div className="p-10">
        <span>{query.data.fullName}</span>
      </div>
      <table className="border-solid, m-10">
        <thead className="bg-gray-800">
          <tr>
            <td className="py-3">Season</td>
            <td className="py-3">GP</td>
            <td className="py-3">P</td>
            <td className="py-3">A</td>
            <td className="py-3">G</td>
            <td className="py-3">PIM</td>
          </tr>
        </thead>
        <tbody className="bg-gray-700">
          {queryStats.data.stats[0].splits.map((split: any) => (
            <tr key={split.season}>
              <td className="px-5 py-2 bg-gray-800">
                {seasonIdentifierFormated(split.season)}
              </td>
              <td className="px-5 py-2">{split.stat.games}</td>
              <td className="px-5 py-2">{split.stat.points}</td>
              <td className="px-5 py-2">{split.stat.assists}</td>
              <td className="px-5 py-2">{split.stat.goals}</td>
              <td className="px-5 py-2">{split.stat.pim}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function seasonIdentifierFormated(seasonId: string): string {
  return seasonId.substring(0, 4) + "-" + seasonId.substring(4)
}
