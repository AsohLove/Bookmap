import type { BookType } from "../types/database";

export  async function fetchBook(searchTerm: string): Promise<BookType>{
    const res =  await fetch(`https://openlibrary.org/search.json?q=${searchTerm}`)

    if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
    }

    return res.json()
}