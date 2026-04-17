export interface BookResponse {
    numFound: number;
    start: number;
    docs: BookType[];
}

export interface BookType {
    key: string;
    title: string;
    author_name?: string[];
    first_publish_year?: number;
    cover_i?: number;
}