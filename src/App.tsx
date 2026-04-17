import { Route, Routes } from "react-router"
import Home from "./pages/Home"
import ReadingList from "./pages/ReadingList"

function App() {

  return (
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="readingList" element={<ReadingList />} />
   </Routes>
  )
}

export default App
