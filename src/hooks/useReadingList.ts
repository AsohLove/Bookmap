import { useState } from "react";
import type { BookType } from "../types/database";

export function useReadingList() {
  const [books, setBooks] = useState<BookType[]>(() => {
    try {
      const stored = localStorage.getItem("readingList");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse reading list:", error);
      return [];
    }
  });

  const addReadingListBook = (book: BookType) => {
    setBooks((prev: BookType[]) => {
      if (prev.find((b: BookType) => b.key === book.key)) return prev;

      const updated = [...prev, book];
      localStorage.setItem("readingList", JSON.stringify(updated));
      return updated;
    });
  };

  const removeBook = (bookKey: string) => {
    setBooks((prev: BookType[]) => {
      const updated = prev.filter((b: BookType) => b.key !== bookKey);
      localStorage.setItem("readingList", JSON.stringify(updated));
      return updated;
    });
  };

  const isSaved = (bookKey: string) => {
    return books.some((b: BookType) => b.key === bookKey);
  };

  return { books, addReadingListBook, removeBook, isSaved };

}