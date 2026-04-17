import { Search } from "lucide-react"

function SearchBar() {
  return (
    <div>
        <h2>CURATING KNOWLEDGE</h2>
        <p><span>Find your next</span> <br />
        literary journey.
        </p>

        <div>
            <Search />
            <input type="text" placeholder="Search titles, authors or curators..." />
            <button>EXPLORE</button>
        </div>
    </div>
  )
}

export default SearchBar