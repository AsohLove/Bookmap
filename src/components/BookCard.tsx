import { Heart } from "lucide-react";
import type { BookType } from "../types/database";
import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { useReadingList } from "../hooks/useReadingList";

export default function BookCard({ book }: { book: BookType }) {
  const navigate = useNavigate();

  const { addReadingListBook, isSaved, removeBook } = useReadingList();

  const saved = isSaved(book.key);

  const favorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (saved) {
      removeBook(book.key);
    } else {
      addReadingListBook(book);
    }
  };

  return (
    <motion.div
      onClick={() => navigate(`/book/${book.key.replace("/works/", "")}`)}
      className="relative cursor-pointer"
    >
      <motion.img
        whileHover={{ y: -6, x: -6 }}
        src={
          book?.cover_i
            ? `https://covers.openlibrary.org/b/id/${book?.cover_i}-L.jpg`
            : undefined
        }
        alt={book?.title}
        className="w-full h-52 sd:h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <button
        onClick={favorite}
        className="absolute top-2 cursor-pointer right-2 p-1.5 rounded-full transition"
      >
        <Heart
          size={34}
          className={saved ? "fill-red-500 text-red-500" : "text-gray-500"}
        />
      </button>

      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-lg sm:text-xl line-clamp-2 hover:text-red-400 ">{book?.title}</h2>
        <p className="text-gray-600 text-sm sm:text-base">{book?.author_name}</p>
        <p className="text-gray-600">{book?.first_publish_year}</p>
      </div>
    </motion.div>
  );
}
