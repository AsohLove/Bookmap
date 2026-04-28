import { NavLink, useNavigate } from "react-router";
import { useReadingList } from "../hooks/useReadingList";
import BookCard from "../components/BookCard";
import { X } from "lucide-react";

export default function ReadingList() {
  const { books, removeBook } = useReadingList();

  const featuredBook = books[0];
  const otherBooks = books.slice(1);
  const navigate = useNavigate();


  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-8 border-b border-gray-200">
          <h1 className="text-sm font-bold text-orange-500 tracking-widest">
            CURATED ARCHIVE
          </h1>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mt-4">
            Your Personal <br />
            Reading Collection
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            A sanctuary for the written word. Review, organize, and explore the{" "}
            <br />
            literary journey you've curated for yourself.
          </p>
        </div>

        <div className="p-8 max-w-7xl mx-auto">
          {books.length === 0 ? (
            <div className="bg-white p-12 rounded-lg text-center">
              <p className="text-gray-600 text-lg">
                No books in your reading list yet. Click on the Heart icon on a
                book or the add button to add a book here!!
              </p>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-2">
                  {featuredBook && (
                    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                      {featuredBook?.subjects && featuredBook.subjects[0] && (
                        <div className="text-xs font-bold text-orange-500 tracking-wider uppercase mb-3">
                          {featuredBook.subjects[0]}
                        </div>
                      )}
                      <BookCard book={featuredBook} />

                      <button
                        onClick={() => removeBook(featuredBook.key)}
                        className="mt-4 cursor-pointer text-orange-500 hover:text-orange-700 font-semibold transition flex items-center gap-1"
                      >
                        <X size={18} /> Remove
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 mb-4">Recent Saves</h3>
                  {otherBooks.slice(0, 3).map((book) => (
                    <div
                      key={book.key}
                      className="bg-white p-3 rounded-lg shadow hover:shadow-md transition relative group"
                    >
                      {book?.subjects && book?.subjects?.[0] && (
                        <div className="text-xs font-bold text-orange-500 tracking-wider uppercase mb-2">
                          {book?.subjects?.[0]}
                        </div>
                      )}
                      <div className="flex gap-3">
                        <img
                          src={
                            book?.cover_i
                              ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`
                              : ""
                          }
                          className="w-12 h-16 object-cover rounded shrink-0"
                          alt={book.title}
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm text-gray-900 line-clamp-2">
                            {book.title}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {book.author_name?.[0] || "Unknown"}
                          </p>
                          {book.first_publish_year && (
                            <p className="text-xs text-gray-400 mt-1">
                              {book.first_publish_year}
                            </p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => removeBook(book.key)}
                        className="absolute top-2 cursor-pointer right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition"
                        title="close"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  {otherBooks.length > 3 && (
                    <p className="text-xs text-gray-500 text-center mt-2">
                      +{otherBooks.length - 3} more in your collection
                    </p>
                  )}
                </div>
              </div>

              {otherBooks.length > 3 && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    More from Your Collection
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {otherBooks.slice(3).map((book) => (
                      <div key={book.key} className="relative group">
                        <BookCard book={book} />

                        {book?.subjects && book.subjects[0] && (
                          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded uppercase font-bold">
                            {book.subjects[0]}
                          </div>
                        )}

                        <button
                          onClick={() => removeBook(book.key)}
                          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                        >
                          <X size={24} className="text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {books.length > 0 && (
            <div className="mt-12 bg-gray-100 p-8 rounded-lg text-center">
              <div className="text-2xl mb-3 text-gray-800 font-semibold ">
                auto_stories
              </div>
              <h4 className="font-bold text-gray-900 mb-2 text-xl">
                Expanding your horizon?
              </h4>
              <p className="text-gray-600 mb-4">
                Our curators suggest "The Pale Blue Dot" <br /> based on your
                recent saves.
              </p>
              <button onClick={() => navigate("/")}
              className="bg-blue-900 cursor-pointer text-white font-bold py-3 px-6 rounded uppercase text-sm hover:bg-blue-800 transition">
                Explore More
              </button>
            </div>
          )}
        </div>
      </div>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="flex justify-between p-8 max-w-7xl mx-auto">
          <div>
            <h2 className="font-bold text-gray-900">The Editorial Scholar</h2>
            <p className="text-sm text-gray-600 mt-2">
              &copy; {new Date().getFullYear()} The Editorial Scholar. A Digital
              Curator Experience.
            </p>
          </div>
          <div className="flex gap-6">
            <NavLink
              to="#"
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Privacy Policy
            </NavLink>
            <NavLink
              to="#"
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Terms of Service
            </NavLink>
            <NavLink
              to="#"
              className="text-sm text-gray-600 hover:text-gray-900 transition"
            >
              Archive Access
            </NavLink>
          </div>
        </div>
      </footer>
    </div>
  );
}
