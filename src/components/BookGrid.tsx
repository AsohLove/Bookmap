import { useQuery } from "@tanstack/react-query";
import { fetchBook } from "../service/api";
import BookCard from "./BookCard";
import type { BookResponse } from "../types/database";
import { useDebounce } from "use-debounce"


export default function BookGrid({ query }: { query: string }) {
  const [debouncedQuery] = useDebounce(query, 500)


  const { data, isLoading, isError } = useQuery<BookResponse>({
    queryKey: ["books", debouncedQuery],
    queryFn: () => fetchBook(debouncedQuery),
    enabled: !!debouncedQuery.trim(),
  });

  if (isLoading) return <p>Books loading...</p>;

  if (isError) return <p>Error fetching books.</p>;

  if (!query.length) {
    return (
        <p className="text-center text-gray-700 mt-6">
            No Books found for {query}
        </p>
    )
  }

  return (
    <div>
      <h1>BOOKS</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-4">
        {data?.docs?.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </div>
  );
}
