import { BrowserRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import "./App.css"
import Teams from "./routes/teams"

const queryClient = new QueryClient()

function App() {
  return (
    <div className="bg-gray-900">
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Teams />} />
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </div>
  )
}

export default App
