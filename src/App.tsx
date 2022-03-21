import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import "./App.css"
import Teams from "./routes/teams"
import Team from "./routes/team"

const queryClient = new QueryClient()

function App() {
  return (
    <div className="bg-gray-900">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/:id" element={<Team />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </div>
  )
}

export default App
