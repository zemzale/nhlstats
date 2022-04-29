import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Team, AllTeams } from '../api/teams'

export default function Teams() {
  const query = useQuery('teams', AllTeams)

  if (query.isLoading) {
    return <div> Loading... </div>
  }

  return (
    <div className="p-10">
      <table className="text-white border-solid">
        <thead className="bg-gray-800">
          <tr>
            <th className="py-3">Team</th>
            <th className="py-3">Conference</th>
            <th className="py-3">Division</th>
          </tr>
        </thead>
        <tbody className="bg-gray-700">
          {query.data.teams.map((team: Team) => (
            <tr key={team.id} className="text-white border-b">
              <td className="px-5 py-2">
                <Link to={`/teams/${team.id}`}>{team.name}</Link>
              </td>
              <td className="px-5 py-2">
                <Link to={`/conferences/${team.conference.id}`}>
                  {team.conference.name}
                </Link>
              </td>
              <td className="px-5 py-2">
                <Link to={`/divisions/${team.division.id}`}>
                  {team.division.name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
