import type { BookDetailsType, BookResponse, EditionType } from "../types/database";

export  async function fetchBook(searchTerm: string): Promise<BookResponse>{
    const res =  await fetch(`https://openlibrary.org/search.json?q=${searchTerm}`)

    if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
    }

    return res.json()
}

export async function fetchBookDetails(bookKey: string): Promise<BookDetailsType> {
    const res = await fetch(`https://openlibrary.org/works/${bookKey}.json`)

    if (!res.ok) {
        throw new Error(`Failed to fetch ${bookKey} details`)
    }

    return res.json();

}

export async function fetchEditions(bookKey: string): Promise<EditionType[]> {
    const res = await fetch(
        `https://openlibrary.org/works/${bookKey}/editions.json?limit=10`
    )

    if (!res.ok) {
        throw new Error(`Failed to fetch editions for ${bookKey}`)
    }

    const data = await res.json();
    return data.entries || [];
}