import { Heart } from "lucide-react";
import type { BookType } from "../types/database";
import { useNavigate } from "react-router";
import { useReadingList } from "../hooks/useReadingList";

export default function BookCard({ book }: { book: BookType }) {
  const navigate = useNavigate();

  const { addReadingListBook, isSaved, removeBook } = useReadingList();

  const saved = isSaved(book.key);

  const favorite = (e) => {
    e.stopPropagation();

    if (saved) {
      removeBook(book.key);
    } else {
      addReadingListBook(book);
    }
  };

  return (
    <div
      onClick={() => navigate(`/book/${book.key.replace("/works/", "")}`)}
      className="relative cursor-pointer"
    >
      <img
        src={
          book?.cover_i
            ? `https://covers.openlibrary.org/b/id/${book?.cover_i}-L.jpg`
            : null
        }
        alt={book?.title}
        className="w-full h-94 object-cover group-hover:scale-105 transition-transform duration-300"
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

      <div className="flex flex-col gap-3">
        <h2>{book?.title}</h2>
        <p>{book?.author_name}</p>
        <p>{book?.first_publish_year}</p>
      </div>
    </div>
  );
}
