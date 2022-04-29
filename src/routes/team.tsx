import { Link, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { TeamById, TeamPlayers, Team } from '../api/teams'
import { Player } from '../api/players'
import { Table } from '../components/table'
import { useMemo } from 'react'

export default function TeamPage() {
  const { id } = useParams<TeamId>()
  if (id === undefined) {
    return <div>Player ID not found</div>
  }

  const teamsQuery = useQuery<Team, Error>(['teams', id], () => TeamById(id))
  const playerQuery = useQuery<Player[], Error>(['teams.palyers', id], () =>
    TeamPlayers(id),
  )

  if (teamsQuery.isLoading || playerQuery.isLoading) {
    return <div>Loading...</div>
  }
  if (!teamsQuery.isSuccess || !playerQuery.isSuccess) {
    return <div>We had a whoopsie!</div>
  }
  return <TableView team={teamsQuery.data} players={playerQuery.data} />
}

interface TableViewProps {
  team: Team
  players: Player[]
}

function TableView({ players, team }: TableViewProps) {
  const data = useMemo(() => {
    return players.map((player: Player): Original => ({
      name: player.person.fullName,
      number: player.jerseyNumber,
      position: player.position.name,
      id: player.person.id,
    }))
  }, [players])
  const columns = useMemo(columnsData, [])
  return (
    <div className="flex flex-col text-white">
      <div className="p-10">
        <div>{team.name}</div>
      </div>
      <Table columns={columns} data={data} />
    </div>
  )
}

interface ColumnProps {
    row: Record<string, Original>,
    value: string
}

interface Original {
    name: string
    number: string
    position: string
    id: number
}

const columnsData = () => [
  {
    Header: 'Name',
    accessor: 'name',
    Cell: (props: ColumnProps) => {
      return playerColumnElement(props.row.original.id, props.value)
    },
  },
  {
    Header: 'Number',
    accessor: 'number',
    Cell: (props: ColumnProps) => {
      return playerColumnElement(props.row.original.id, props.value)
    },
  },
  {
    Header: 'Position',
    accessor: 'position',
    Cell: (props: ColumnProps) => {
      return playerColumnElement(props.row.original.id, props.value)
    },
  },
]

const playerColumnElement = (id: number, value: string | number) => {
  return (
    <td className="px-5 py-2">
      <Link to={`/players/${id}`}>{value}</Link>
    </td>
  )
}

type TeamId = {
  id: string
}
