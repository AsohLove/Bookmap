import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import ReadingList from "./pages/ReadingList"
import DashboardLayout from "./layout/DashboardLayout"

function App() {

  return (
   <Routes>
      <Route element={<DashboardLayout />} >
        <Route path="/" element={<Home />} />
        <Route path="readingList" element={<ReadingList />} />
      </Route>
   </Routes>
  )
}

export default App
