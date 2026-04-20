import { useState } from "react";
import BookGrid from "../components/BookGrid";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [search, setsearch] = useState("")
  const [page, setpage] = useState(1)



  return (
    <div>
        <SearchBar query={search} setQuery={setsearch} />
        <div className="flex justify-between my-3">
            <h2>Latest Acquisitions</h2>
            <div className="flex gap-3">
                <button>FILTER</button>
                <button>SORT</button>
            </div>
        </div>

         <BookGrid query={search} page={page}/>

      <div>
        <p>Showing 1-12 of {search.length} curations</p>
        <div>
          <button onClick={() => setpage((p) => Math.max(1, p - 1))}>
            Previous
          </button>

          <button onClick={() => setpage((p) => p + 1)}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
