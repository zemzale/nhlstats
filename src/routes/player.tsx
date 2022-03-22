import { useParams } from "react-router-dom"
import { PlayerById, PlayerStatsById } from "../api/players"
import { useQuery } from "react-query"
import Chart from "react-apexcharts"

export default function Player() {
  //FIXME: Figure out how to add types to this
  const param = useParams()
  //FIXME: Create some constants for the query keys
  const query = useQuery(["player", param.id], () => PlayerById(param.id))
  const queryStats = useQuery(["player.stats", param.id], () =>
    PlayerStatsById(param.id),
  )

  if (query.isLoading || queryStats.isLoading) {
    //FIXME: Create a generic loading component
    return <div> Loading...</div>
  }
  //FIXME: Need to sort the seasons by newest to oldest.
  //FIXME: Bring out the table styles into custom styles, should be easy enough
  //FIXME: Bring out the stats into an interface
  //FIXME: Add tooltips for the stats
  //
  //
  const statsData: Array<object> = queryStats.data.stats[0].splits

  const categories = statsData.map((stats: any) => stats.season)
  const values = statsData.map((stats: any) => stats.stat.points)

  console.debug(categories, values)

  const opts = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: categories,
    },
  }
  const series = [
    {
      name: "series-1",
      data: values,
    },
  ]
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
          {statsData.map((split: any) => (
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
        <Chart type="line" width="500" options={opts} series={series} />
      </table>
    </div>
  )
}

function seasonIdentifierFormated(seasonId: string): string {
  return seasonId.substring(0, 4) + "-" + seasonId.substring(4)
}
