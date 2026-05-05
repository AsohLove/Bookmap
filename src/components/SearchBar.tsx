import { Search } from "lucide-react"

type Props = {
  query: string;
  setQuery: (query: string) => void;
}


export default function SearchBar({query, setQuery}: Props) {
 

  return (
    <div className="flex flex-col justify-center items-center">
        <h2 className="text-orange-600 text-xs md:text-sm font-bold my-3">CURATING KNOWLEDGE</h2>
        <p className="text-slate-900 text-2xl md:text-5xl font-bold mb-3"><span className="text-blue-950 italic text-2xl md:text-5xl font-extrabold">Find your next</span> <br />
        literary journey.
        </p>

        <div className="relative flex justify-between w-full max-w-md md:max-w-2xl mx-auto">
            <Search size={20} className="absolute top-1/2 -translate-y-1/2 ml-1 text-gray-400"/>
            <input 
            type="text"
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, authors or curators..." 
            className="bg-gray-100 pl-10 pr-20 p-4 outline-none w-full text-gray-700 placeholder-gray-400 border-b-2 focus:border-b-orange-500 focus:outline-none text-sm"/>
            <button className="absolute cursor-pointer right-2 top-1/2 px-4 py-2 -translate-y-1/2 rounded-md text-white text-sm bg-blue-900 font-semibold">EXPLORE</button>
        </div>
    </div>
  )
}

