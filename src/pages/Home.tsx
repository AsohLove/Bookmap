import { useState } from "react";
import BookGrid from "../components/BookGrid";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [search, setsearch] = useState("")

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

         <BookGrid query={search}/>
    </div>
  )
}
