export interface BookResponse {
    numFound: number;
    start: number;
    docs: BookType[];
}

export interface BookType {
    key: number;
    title: string;
    author_name: string;
    first_published_year?: number;
    cover_i?: number;
}