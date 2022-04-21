import { Link, useParams, useNavigate } from "react-router-dom"
import { useQuery } from "react-query"
import { TeamById, TeamPlayers } from "../api/teams"
import { Player } from "../api/players"
import { Table } from "../components/table"
import { useMemo } from "react"

function TableView(props: any) {
  const playerQuery = props.playerQuery
  const query = props.query
  const navigate = useNavigate()

  const data = useMemo(() => {
    return playerQuery.data.roster.map((player: Player) => ({
      name: player.person.fullName,
      number: player.jerseyNumber,
      position: player.position.name,
      id: player.person.id,
    }))
  }, [playerQuery.data])

  const columns = useMemo(columnsData, [])
  return (
    <div className="flex flex-col text-white">
      <div className="p-10">
        <div>{query.data.name}</div>
      </div>
      <Table columns={columns} data={data} />
    </div>
  )
}

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
  return <TableView query={query} playerQuery={playerQuery} />
}

const columnsData = () => [
  {
    Header: "Name",
    accessor: "name",
    Cell: (props: any) => {
      return playerColumnElement(props.row.original.id, props.value)
    },
  },
  {
    Header: "Number",
    accessor: "number",
    Cell: (props: any) => {
      return playerColumnElement(props.row.original.id, props.value)
    },
  },
  {
    Header: "Position",
    accessor: "position",
    Cell: (props: any) => {
      return playerColumnElement(props.row.original.id, props.value)
    },
  },
]

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
