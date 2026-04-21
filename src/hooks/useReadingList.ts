import { useState } from "react";

export function useReadingList() {
  const [books, setBooks] = useState(() => {
    try {
      const stored = localStorage.getItem("readingList");
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse reading list:", error);
      return [];
    }
  });

  const addReadingListBook = (book) => {
    setBooks((prev) => {
      if (prev.find((b) => b.key === book.key)) return prev;

      const updated = [...prev, book];
      localStorage.setItem("readingList", JSON.stringify(updated));
      return updated;
    });
  };

  const removeBook = (bookKey) => {
    setBooks((prev) => {
      const updated = prev.filter((b) => b.key !== bookKey);
      localStorage.setItem("readingList", JSON.stringify(updated));
      return updated;
    });
  };

  const isSaved = (bookKey) => {
    return books.some((b) => b.key === bookKey);
  };

  return { books, addReadingListBook, removeBook, isSaved };

}