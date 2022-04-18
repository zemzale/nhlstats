import { useParams } from "react-router-dom"
import { PlayerById, PlayerStatsById } from "../api/players"
import { useQuery } from "react-query"

export default function Player() {
  //FIXME: Figure out how to add types to this
  const { id } = useParams()
  if (id === undefined) {
    return <div>Player not found</div>
  }
  const playerId = id
  //FIXME: Create some constants for the query keys
  const query = useQuery(["player", playerId], () => PlayerById(playerId))
  const queryStats = useQuery(["player.stats", playerId], () =>
    PlayerStatsById(playerId),
  )

  if (query.isLoading || queryStats.isLoading) {
    //FIXME: Create a generic loading component
    return <div> Loading...</div>
  }
  //FIXME: Need to sort the seasons by newest to oldest.
  //FIXME: Bring out the table styles into custom styles, should be easy enough
  //FIXME: Bring out the stats into an interface
  //FIXME: Add tooltips for the stats
  const statsData: Array<object> = queryStats.data.stats[0].splits

  return (
    <div className="text-white flex flex-col">
      <div className="flex flex-row">
        <div className="p-10 flex flex-col text-4xl">
          <div className="p-2">#{query.data.primaryNumber}</div>
          <div className="p-2">Name : {query.data.fullName}</div>
          <div className="p-2">Age :{query.data.currentAge}</div>
        </div>
        <div className="p-10 flex flex-col text-4xl">
          <div className="p-2">Nationality : {query.data.nationality}</div>
          <div className="p-2">Country : {query.data.birthCountry}</div>
          <div className="p-2">City :{query.data.birthCity}</div>
        </div>
        <div className="p-10 flex flex-col text-4xl">
          <div className="p-2">Height : {query.data.height}</div>
          <div className="p-2">Country : {query.data.weight}</div>
          <div className="p-2">Shoots : {query.data.shootsCatches}</div>
        </div>
      </div>
      <table className="border-solid m-10">
        <thead className="bg-gray-800">
          <tr>
            <td className="py-3 px-5">Season</td>
            <td className="py-3 px-5">GP</td>
            <td className="py-3 px-5">P</td>
            <td className="py-3 px-5">A</td>
            <td className="py-3 px-5">G</td>
            <td className="py-3 px-5">PPG</td>
            <td className="py-3 px-5">PIM</td>
            <td className="py-3 px-5">PPG</td>
            <td className="py-3 px-5">SHG</td>
            <td className="py-3 px-5">GWG</td>
          </tr>
        </thead>
        <tbody className="bg-gray-700">
          {statsData
            .filter((v: any) => v.league.name === "National Hockey League")
            .map((split: any) => (
              <tr key={split.season}>
                <td className="px-5 py-2 bg-gray-800">
                  {seasonIdentifierFormated(split.season)}
                </td>
                <td className="px-5 py-2">{split.stat.games}</td>
                <td className="px-5 py-2">{split.stat.points}</td>
                <td className="px-5 py-2">{split.stat.assists}</td>
                <td className="px-5 py-2">{split.stat.goals}</td>
                <td className="px-5 py-2">
                  {Math.round((split.stat.points / split.stat.games) * 100) /
                    100}
                </td>
                <td className="px-5 py-2">{split.stat.pim}</td>
                <td className="px-5 py-2">{split.stat.powerPlayGoals}</td>
                <td className="px-5 py-2">{split.stat.shortHandedGoals}</td>
                <td className="px-5 py-2">{split.stat.gameWinningGoals}</td>
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
