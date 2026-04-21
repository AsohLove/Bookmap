import { NavLink } from "react-router";
import { useReadingList } from "../hooks/useReadingList";
import BookCard from "../components/BookCard";

export default function ReadingList() {
  const { books } = useReadingList()


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white p-8 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-orange-900">CURATED ARCHIVE</h1>
          <h2 className="text-7xl font-bold text-gray-800 mt-2">Your Personal <br />
              Reading Collection</h2>
          <p className="text-gray-600 mt-4">A sanctuary for the written word. Review, organize, and explore the <br />
           literary journey you've curated for yourself.</p>
      </div>

      <div>
          <div>
            {books.length === 0 ? (
              <p>
                No books in your reading list yet. Click on the Heart icon on a book to add it here!!
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {books.map((book) => (
                  <div key={book.key}>
                    <BookCard  book={book}/>
                  </div>
                ))}
              </div>
            )}
          </div>

      </div>
      

    

      <footer className="flex justify-between m-3">
        <div className="mt-3 ">
          <h2>The Editorial Scholar</h2>
          <p>&copy; {new Date().getFullYear()} The Editorial Scholar. A Digital Curator Experience.</p>
        </div>
        <div className="flex gap-6">
          <NavLink to="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</NavLink>
          <NavLink to="#" className="text-sm text-gray-600 hover:text-gray-900">Terms of Service</NavLink>
          <NavLink to="#" className="text-sm text-gray-600 hover:text-gray-900">Archive Access</NavLink>
        </div>
      </footer>
    </div>
  )
}
