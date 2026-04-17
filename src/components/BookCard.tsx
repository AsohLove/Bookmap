import { Heart } from "lucide-react";
import type { BookType } from "../types/database";
import { useNavigate } from "react-router";

export default function BookCard({book}: {book: BookType}) {

    const navigate = useNavigate()

  return (
    <div 
    onClick={() => navigate(`/book/${book.key.replace("/works/", "")}`)}
    className="cursor-pointer"
    >
        <img 
        src={ book?.cover_i ? `https://covers.openlibrary.org/b/id/${book?.cover_i}-L.jpg`: null } 
        alt={book?.title}
        className="w-full h-94 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button 
        className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full hover:bg-black/80 transition"
        >
            <Heart 
            className="w-5 h-5"
            />
        </button>

        <div className="flex flex-col gap-3">
            <h2>{book?.title}</h2>
            <p>{book?.author_name}</p>
            <p>{book?.first_publish_year}</p>
        </div>


    </div>
  )
}
