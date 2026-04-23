import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import { fetchBookDetails, fetchEditions } from "../service/api";
import { motion } from "framer-motion";
import type { BookDetailsType, EditionType } from "../types/database";
import { NavLink } from "react-router";
import Loader from "../components/Loader";
import { useReadingList } from "../hooks/useReadingList";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addReadingListBook, isSaved } = useReadingList();

  const {
    data,
    isLoading,
    isError,
  } = useQuery<BookDetailsType>({
    queryKey: ["book", id],
    queryFn: () => fetchBookDetails(id!),
    enabled: !!id,
  });

  const { data: editions } = useQuery<EditionType[]>({
    queryKey: ["editions", id],
    queryFn: () => fetchEditions(id!),
    enabled: !!id,
  });

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-gray-50"
    >
     
      <div className="max-w-6xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-amber-600 font-medium hover:underline"
        >
          ← BACK TO SEARCH
        </button>

       
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          
          <div>
            <img
              src={
                coverId
                  ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
                  : ""
              }
              alt={data.title}
              className="w-full h-125 object-cover rounded-lg shadow"
            />
          </div>

          
          <div>
            <h2 className="text-4xl font-bold text-gray-900">
              {data.title}
            </h2>

          
            <p className="text-gray-600 mt-2">
              Author information not available
            </p>

            
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => addReadingListBook(data)}
                className={`px-4 py-2 rounded font-semibold transition ${
                  isBookSaved
                    ? "bg-gray-300 text-gray-700"
                    : "bg-blue-900 text-white hover:bg-blue-800"
                }`}
              >
                {isBookSaved ? "Saved" : "Add to Reading List"}
              </button>

              <button className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">
                Share Citation
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8 text-sm">
              <div>
                <p className="text-gray-500">PAGE COUNT</p>
                <p className="font-semibold">
                  {firstEdition?.number_of_pages || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">PUBLISHER</p>
                <p className="font-semibold">
                  {firstEdition?.publishers?.[0] || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">YEAR</p>
                <p className="font-semibold">
                  {firstEdition?.publish_date ||
                    data.first_publish_date ||
                    "N/A"}
                </p>
              </div>

              <div>
                <p className="text-gray-500">ISBN</p>
                <p className="font-semibold">
                  {firstEdition?.isbn_13?.[0] || "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Abstract
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {description}
              </p>
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
      </div>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h2 className="font-bold text-gray-900">
              The Editorial Scholar
            </h2>
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} The Editorial Scholar.
              A Digital Curator Experience.
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