import { useParams } from 'react-router-dom'
import { PlayerById, PlayerStatsById, Person, Split } from '../api/players'
import { useQuery } from 'react-query'
import { useMemo } from 'react'
import { Table } from '../components/table'

export default function Player() {
  //FIXME: Figure out how to add types to this
  const { id } = useParams()
  if (id === undefined) {
    return <div>Player not found</div>
  }

  //FIXME: Create some constants for the query keys
  const query = useQuery<Person, Error>(['player', id], () => PlayerById(id))
  const queryStats = useQuery<Split[], Error>(['player.stats', id], () =>
    PlayerStatsById(id),
  )

  if (queryStats.isLoading || query.isLoading) {
    return <div>Loading...</div>
  }
  if (!queryStats.isSuccess || !query.isSuccess) {
    return <div>Whoopsie</div>
  }

  return <PlayerView person={query.data} splits={queryStats.data} />
}

interface PlayerViewProps {
  person: Person
  splits: Split[]
}

function PlayerView({ person, splits }: PlayerViewProps) {
  const data = useMemo(() => {
    return splits.map((split: Split) => ({
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
  }, [splits])

  const columns = useMemo(columnsData, [])

  //FIXME: Need to sort the seasons by newest to oldest.
  //FIXME: Add tooltips for the stats

  return (
    <div className="text-white flex flex-col">
      <PlayerHeader person={person} />
      <Table columns={columns} data={data} />
    </div>
  )
}

interface PlayerHeaderProps {
  person: Person
}

function PlayerHeader({ person }: PlayerHeaderProps) {
  return (
    <div className="flex flex-row">
      <div className="p-10 flex flex-col text-4xl">
        <div className="p-2">#{person.primaryNumber}</div>
        <div className="p-2">Name : {person.fullName}</div>
        <div className="p-2">Age :{person.currentAge}</div>
      </div>
      <div className="p-10 flex flex-col text-4xl">
        <div className="p-2">Nationality : {person.nationality}</div>
        <div className="p-2">Country : {person.birthCountry}</div>
        <div className="p-2">City :{person.birthCity}</div>
      </div>
      <div className="p-10 flex flex-col text-4xl">
        <div className="p-2">Height : {person.height}</div>
        <div className="p-2">Country : {person.weight}</div>
        <div className="p-2">Shoots : {person.shootsCatches}</div>
      </div>
    </div>
  )
}

const columnsData = () => [
  {
    Header: 'Season',
    accessor: 'season',
  },
  {
    Header: 'GP',
    accessor: 'gp',
  },
  {
    Header: 'P',
    accessor: 'p',
  },
  {
    Header: 'A',
    accessor: 'a',
  },
  {
    Header: 'G',
    accessor: 'g',
  },
  {
    Header: 'PPG',
    accessor: 'ppg',
  },
  {
    Header: 'PIM',
    accessor: 'pim',
  },
  {
    Header: 'SHG',
    accessor: 'shg',
  },
  {
    Header: 'GWG',
    accessor: 'gwg',
  },
]

function seasonIdentifierFormated(seasonId: string): string {
  return seasonId.substring(0, 4) + '-' + seasonId.substring(4)
}
