import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import "./App.css"
import Teams from "./routes/teams"
import Team from "./routes/team"
import Player from "./routes/player"
import Homepage from "./routes/homepage"

const queryClient = new QueryClient()

function App() {
  //FIXME: Add catch all route so we don't 404
  return (
    <div className="bg-gray-900 text-white">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/:id" element={<Team />} />
            <Route path="/players/:id" element={<Player />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </div>
  )
}

export default App
