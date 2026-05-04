import { useQuery } from "@tanstack/react-query";
import { fetchBook } from "../service/api";
import BookCard from "./BookCard";
import type { BookResponse } from "../types/database";
import { useDebounce } from "use-debounce"
import { useEffect } from "react";
import Loader from "./Loader";

type Props = {
  query: string;
  page: number;
  onTotalChange: (total: number) => void;
}


export default function BookGrid({ query, page, onTotalChange }: Props) {
  const [debouncedQuery] = useDebounce(query, 500)

  const searchTerm = debouncedQuery.trim() || "bestseller";


  const { data, isLoading, isError } = useQuery<BookResponse>({
    queryKey: ["books", searchTerm, page],
    queryFn: () => fetchBook(searchTerm, page),
    enabled: !!searchTerm.trim(),
  });

  useEffect(() => {
    if (data?.numFound) {
      onTotalChange(data.numFound);
    }
  }, [data?.numFound, onTotalChange])

  if (isLoading) return <Loader />

  if (isError) return <p>Error fetching books.</p>;

  

  return (
    <div>
      <h1 className="text-2xl mb-2">{debouncedQuery ? `Results for ${debouncedQuery}` : "Popular Books"}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {data?.docs?.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>
    </div>
  );
}
