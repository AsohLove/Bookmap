import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { fetchAuthor, fetchBookDetails, fetchEditions } from "../service/api";
import { motion } from "framer-motion";
import type { BookDetailsType, EditionType } from "../types/database";
import { NavLink } from "react-router";
import Loader from "../components/Loader";
import { useReadingList } from "../hooks/useReadingList";
import { BookMarked, Share2 } from "lucide-react";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { books, addReadingListBook, isSaved } = useReadingList();

  const { data, isLoading, isError } = useQuery<BookDetailsType>({
    queryKey: ["book", id],
    queryFn: () => fetchBookDetails(id!),
    enabled: !!id,
  });

  const { data: editions } = useQuery<EditionType[]>({
    queryKey: ["editions", id],
    queryFn: () => fetchEditions(id!),
    enabled: !!id,
  });

  const authorKeys = data?.authors?.map((name) => name.author.key) || [];

  const { data: authorsData } = useQuery({
    queryKey: ["authors", authorKeys],
    queryFn: async () => {
      const results = await Promise.all(
        authorKeys.map((key) => fetchAuthor(key)),
      );
      return results;
    },
    enabled: authorKeys.length > 0,
  });

  const authorNames =
    authorsData?.map((a) => a.name).join(", ") || "Unknown author";

  if (isLoading) return <Loader />;
  if (isError) return <p>Error fetching book details.</p>;
  if (!data) return null;

  const coverId = data.covers?.[0];
  const firstEdition = editions?.[0];

  const description =
    typeof data.description === "string"
      ? data.description
      : data.description?.value || "No description available.";

  const subjects = data.subjects?.slice(0, 6) || [];

  const isBookSaved = isSaved(data.key);

  function getCuratorQuote(description: string): string {
    if (description.length > 100) {
      return description.substring(0, 50) + "...";
    }

    return description || "An essential volume for the modern collection.";
  }

  const curatorQuote = getCuratorQuote(description);

  const shelfBooks = books.filter((book) => book.key !== data.key);

  console.log("shelf books: ", shelfBooks);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 sm:px-6 sm:py-6">
        <motion.button
          whileHover={{ x: -10 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          onClick={() => navigate(-1)}
          className="mb-6 cursor-pointer text-amber-600 text-sm font-semibold"
        >
          ← BACK TO SEARCH
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          <div className="relative w-full h-64 md:h-80 lg:h-100">
            <img
              src={
                coverId
                  ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
                  : ""
              }
              alt={data.title}
              className=" w-full h-64 md:h-80 lg:h-100 object-cover rounded-lg shadow"
            />
            <div className="absolute bottom-2 right-2 md:-bottom-8 md:-right-5 bg-white backdrop-blur-sm text-sm text-gray-900 px-3 py-2 shadow-md max-w-40">
              <p className="italic line-clamp-3">"{curatorQuote}"</p>
              <p className="mt-1 font-bold text-[10px] tracking-wide uppercase">
                CURATOR COLLECTION
              </p>
            </div>
          </div>

          <div>
            <div className="flex gap-2">
              <h2 className="p-2 text-sm text-orange-500 text-center font-bold bg-red-200 rounded-full max-w-40">
                {data?.subjects?.[0] || "Popular Books"}
              </h2>
              <h2 className="p-2 text-sm text-orange-500 text-center font-bold bg-red-200 rounded-full max-w-40">
                EDITION
              </h2>
            </div>
            <h2 className="text-4xl font-bold text-blue-900 mt-3">{data.title}</h2>

            <p className="text-gray-600 mt-1">by {authorNames}</p>

            <div className="flex flex-col sm:flew-row gap-3 mt-4">
              <button
                onClick={() => addReadingListBook(data)}
                className={`px-4 py-2 cursor-pointer flex gap-2 rounded font-semibold transition ${
                  isBookSaved
                    ? "bg-gray-300 text-gray-700"
                    : "bg-blue-900 text-white hover:bg-blue-800"
                }`}
              >
                <BookMarked size={24} />
                {isBookSaved ? "Saved" : "Add to Reading List"}
              </button>

              <button className="px-4 flex gap-2 cursor-pointer py-2 border rounded text-gray-700 hover:bg-gray-100">
                <Share2 size={24} />
                Share Citation
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-sm border-t border-b p-5 border-gray-300">
              <div>
                <p className="text-gray-500">PAGE COUNT</p>
                <p className="font-bold text-slate-900">
                  {firstEdition?.number_of_pages || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">PUBLISHER</p>
                <p className="font-bold text-slate-900">
                  {firstEdition?.publishers?.[0] || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">YEAR</p>
                <p className="font-bold text-slate-900">
                  {firstEdition?.publish_date ||
                    data.first_publish_date ||
                    "N/A"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">ISBN</p>
                <p className="font-bold text-slate-900">
                  {firstEdition?.isbn_13?.[0] || "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-blue-900 mb-2">Abstract</h3>
              <p className="text-gray-700 leading-relaxed">{description}</p>
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {subjects.map((subject, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-200 px-3 py-1 rounded-full"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="flex gap-4 mb-4">
            <div className="border-b-3 w-12 border-orange-700 mb-3"></div>
            <h2 className="font-bold text-2xl text-slate-800">
              The Curator's Shelf
            </h2>
          </div>
          <div className=" ">
            {shelfBooks.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No books in your curated shelf yet. Add some books
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {shelfBooks.map((bk) => {
                  const coverId = bk.cover_i;

                  return (
                    <div
                      key={bk.key}
                      onClick={() =>
                        navigate(`/book/${bk.key.replace("/works/", "")}`)
                      }
                      className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                    >
                      <img
                        src={
                          coverId
                            ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
                            : "https://via.placeholder.com/150x220?text=No+Cover"
                        }
                        alt={bk.title}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                      <div className="p-4">
                        <h2 className="font-semibold text-blue-900 text-sm line-clamp-1">
                          {bk.title}
                        </h2>
                        <h3 className="text-xs text-gray-500 mt-1">
                          by {"Unknown"}
                        </h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h2 className="font-bold text-gray-900">The Editorial Scholar</h2>
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} The Editorial Scholar. A Digital
              Curator Experience.
            </p>
          </div>

          <div className="flex gap-6">
            <NavLink to="#" className="text-sm hover:underline">
              Privacy Policy
            </NavLink>
            <NavLink to="#" className="text-sm hover:underline">
              Terms of Service
            </NavLink>
            <NavLink to="#" className="text-sm hover:underline">
              Archive Access
            </NavLink>
          </div>
        </div>
      </footer>
    </motion.div>
  );
}
