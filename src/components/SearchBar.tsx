import { Search } from "lucide-react"

type Props = {
  query: string;
  setQuery: (query: string) => void;
}


export default function SearchBar({query, setQuery}: Props) {
 

  return (
    <div className="flex flex-col justify-center items-center">
        <h2>CURATING KNOWLEDGE</h2>
        <p><span>Find your next</span> <br />
        literary journey.
        </p>

        <div className="flex justify-between w-89">
            <Search className="text-gray-400 w-4 h-4"/>
            <input 
            type="text"
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, authors or curators..." 
            className="bg-transparent outline-none w-full text-black text-sm"/>
            <button className="p-2 rounded-full text-white text-sm bg-blue-950 font-semibold">EXPLORE</button>
        </div>
    </div>
  )
}

