import { Search } from "lucide-react"

type Props = {
  query: string;
  setQuery: (query: string) => void;
}


export default function SearchBar({query, setQuery}: Props) {
 

  return (
    <div className="flex flex-col justify-center items-center">
        <h2 className="text-orange-600 font-bold text-md mb-3">CURATING KNOWLEDGE</h2>
        <p className="slate-850 text-5xl font-bold mb-3"><span className="slate-950 text-6xl font-extrabold">Find your next</span> <br />
        literary journey.
        </p>

        <div className="relative flex justify-between w-full max-w-md mx-auto">
            <Search size={20} className="absolute top-1/2 -translate-y-1/2 ml-1 text-gray-400"/>
            <input 
            type="text"
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, authors or curators..." 
            className="bg-gray-100 pl-10 pr-20 p-4 outline-none w-full text-gray-700 placeholder-gray-400 border-b-2 focus:border-b-orange-500 focus:outline-none text-md"/>
            <button className="absolute cursor-pointer right-2 top-1/2 px-4 py-2 -translate-y-1/2 rounded-full text-white text-sm bg-slate-950 font-semibold">EXPLORE</button>
        </div>
    </div>
  )
}

