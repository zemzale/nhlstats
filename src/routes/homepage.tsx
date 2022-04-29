import { useQuery } from 'react-query'
import { RegularSeason, Record, TeamRecord } from '../api/standings'
import { Link } from 'react-router-dom'

export default function Homepage() {
  const query = useQuery<Record[], Error>('standings', RegularSeason)

  if (query.isLoading) {
    return <div> Loading... </div>
  }
  if (!query.isSuccess) {
    return <div>We had an whoopsie</div>
  }

  return (
    <div className="p-10 grid grid-cols-4 gap-4">
      {query.data.map((record: Record) => (
        <table key={record.division.id} className="border-solid">
          <thead className="bg-gray-800">
            <tr>
              <td className="p-2">{record.division.name}</td>
              <td></td>
            </tr>
          </thead>
          <tbody className="bg-gray-700">
            {record.teamRecords.map((team: TeamRecord) => (
              <tr key={team.team.id}>
                <Link to={`/teams/${team.team.id}`}>
                  <td className="p-2">{team.team.name}</td>
                </Link>
                <td>{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  )
}
