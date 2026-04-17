import { Heart } from "lucide-react";
import type { BookType } from "../types/database";

export default function BookCard({book}: {book: BookType}) {

  return (
    <div>
        <img 
        src={ book?.cover_i ? `https://covers.openlibrary.org/b/id/${book?.cover_i}-L.jpg`: null } 
        alt={book?.title}
        />
        <button type="button">
            <Heart />
        </button>

        <div>
            <h2>{book?.title}</h2>
            <p>{book?.author_name}</p>
            <p>{book?.first_publish_year}</p>
        </div>


    </div>
  )
}
