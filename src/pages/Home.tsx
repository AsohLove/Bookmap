import BookGrid from "../components/BookGrid";
import SearchBar from "../components/SearchBar";

export default function Home() {
  return (
    <div>
        <SearchBar />
        <div className="flex justify-between">
            <h2>Latest Acquisitions</h2>
            <div>
                <button>FILTER</button>
                <button>SORT</button>
            </div>
        </div>

         <BookGrid query="Harry porter"/>
    </div>
  )
}
