import { useQuery } from "react-query"
import { RegularSeason } from "../api/standings"
import { Link } from "react-router-dom"

export default function Homepage() {
  const query = useQuery("standings", RegularSeason)

  if (query.isLoading) {
    return <div> Loading... </div>
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {query.data.records.map((record: any) => (
        <table key={record.division.id} className="border-solid">
          <thead className="bg-gray-800">
            <tr>
              <td>{record.division.name}</td>
              <td></td>
            </tr>
          </thead>
          <tbody className="bg-gray-700">
            {record.teamRecords.map((team: any) => (
              <tr key={team.team.id}>
                <Link to={`/teams/${team.team.id}`}>
                  <td>{team.team.name}</td>
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
