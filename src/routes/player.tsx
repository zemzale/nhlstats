import { useParams } from "react-router-dom"
import { PlayerById, PlayerStatsById } from "../api/players"
import { useQuery } from "react-query"
import { useMemo } from "react"
import { useTable } from "react-table"
import { Table } from "../components/table"

export default function Player() {
  //FIXME: Figure out how to add types to this
  const { id } = useParams()
  if (id === undefined) {
    return <div>Player not found</div>
  }
  //FIXME: Create some constants for the query keys
  const query = useQuery(["player", id], () => PlayerById(id))
  const queryStats = useQuery(["player.stats", id], () => PlayerStatsById(id))

  const data = useMemo(() => {
    if (queryStats.data === undefined) {
      return []
    }
    return queryStats.data.stats[0].splits.map((split: any) => ({
      season: seasonIdentifierFormated(split.season),
      gp: split.stat.games,
      p: split.stat.points,
      a: split.stat.assists,
      g: split.stat.goals,
      ppg: Math.round((split.stat.points / split.stat.games) * 100) / 100,
      pim: split.stat.pim,
      shg: split.stat.shortHandedGoals ?? 0,
      gwg: split.stat.gameWinningGoals ?? 0,
    }))
  }, [queryStats.data])

  const columns = useMemo(columnsData, [])

  //FIXME: Need to sort the seasons by newest to oldest.
  //FIXME: Bring out the table styles into custom styles, should be easy enough
  //FIXME: Bring out the stats into an interface
  //FIXME: Add tooltips for the stats

  return (
    <div className="text-white flex flex-col">
      <div className="flex flex-row">
        <div className="p-10 flex flex-col text-4xl">
          <div className="p-2">#{query.data?.primaryNumber}</div>
          <div className="p-2">Name : {query.data?.fullName}</div>
          <div className="p-2">Age :{query.data?.currentAge}</div>
        </div>
        <div className="p-10 flex flex-col text-4xl">
          <div className="p-2">Nationality : {query.data?.nationality}</div>
          <div className="p-2">Country : {query.data?.birthCountry}</div>
          <div className="p-2">City :{query.data?.birthCity}</div>
        </div>
        <div className="p-10 flex flex-col text-4xl">
          <div className="p-2">Height : {query.data?.height}</div>
          <div className="p-2">Country : {query.data?.weight}</div>
          <div className="p-2">Shoots : {query.data?.shootsCatches}</div>
        </div>
      </div>
      <Table columns={columns} data={data} />
    </div>
  )
}

const columnsData = () => [
  {
    Header: "Season",
    accessor: "season",
  },
  {
    Header: "GP",
    accessor: "gp",
  },
  {
    Header: "P",
    accessor: "p",
  },
  {
    Header: "A",
    accessor: "a",
  },
  {
    Header: "G",
    accessor: "g",
  },
  {
    Header: "PPG",
    accessor: "ppg",
  },
  {
    Header: "PIM",
    accessor: "pim",
  },
  {
    Header: "SHG",
    accessor: "shg",
  },
  {
    Header: "GWG",
    accessor: "gwg",
  },
]

function seasonIdentifierFormated(seasonId: string): string {
  return seasonId.substring(0, 4) + "-" + seasonId.substring(4)
}
