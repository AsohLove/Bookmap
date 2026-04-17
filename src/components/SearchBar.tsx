import { Search } from "lucide-react"

function SearchBar() {
  return (
    <div className="flex flex-col justify-center items-center">
        <h2>CURATING KNOWLEDGE</h2>
        <p><span>Find your next</span> <br />
        literary journey.
        </p>

        <div className="flex justify-between">
            <Search />
            <input type="text" placeholder="Search titles, authors or curators..." className="w-96 "/>
            <button>EXPLORE</button>
        </div>
    </div>
  )
}

export default SearchBar