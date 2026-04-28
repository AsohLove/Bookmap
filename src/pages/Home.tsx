import { useState } from "react";
import BookGrid from "../components/BookGrid";
import SearchBar from "../components/SearchBar";
import { ArrowUpDown, Filter } from "lucide-react";
import { NavLink } from "react-router";


export default function Home() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  const handleSearch = (newSearch: string) => {
    setSearch(newSearch)
    setPage(1)
  }


  return (
    <div>
      <div className="max-w-7xl mx-auto">
          <SearchBar query={search} setQuery={handleSearch} />
        <div className="flex justify-between my-3">
            <h2 className="text-slate-800 text-3xl font-bold">Latest Acquisitions</h2>
            <div className="flex gap-3">
                <button className="flex text-sm gap-1 cursor-pointer"><Filter size={20} /> FILTER</button>
                <button className="flex text-sm gap-1 cursor-pointer"><ArrowUpDown size={20} /> SORT</button>
            </div>
        </div>

         <BookGrid query={search} page={page} onTotalChange={setTotal}/>

      <div className="my-6 flex justify-between items-center">
        <p className="mb-4 text-gray-400 text-lg">Showing {(page - 1) * 10 + 1}-{Math.min(page * 10, total)} of {total} curators</p>
        <div>
          <button 
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 rounded cursor-pointer text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <span className="px-4 py-2 font-semibold">Page {page}</span>

          <button 
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
          >
            Next
          </button>
        </div>
      </div>
      </div>
        
      <footer>
        <div className="flex justify-evenly mt-4">
          <h2>The Editorial Scholar</h2>
          <div className="flex gap-3">
            <NavLink to="#">Privacy Policy</NavLink>
            <NavLink to="#">Terms of Service</NavLink>
            <NavLink to="#">Archive Access</NavLink>
          </div>
          <p>
            &copy; {new Date().getFullYear()} The Editorial Scholar. A digital
            Curator Experience
          </p>
        </div>
      </footer>
    </div>
  )
}
