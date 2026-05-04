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
  subjects?: string[];
  cover_i?: number;
  excerpts: string;
}

export interface BookDetailsType {
  key: string;
  title: string;
  description?: string | { value: string };
  subjects?: string[];
  covers?: number[];
  authors?: { author: { key: string } }[];
  first_publish_date?: string;
  excerpts: string;
}

export interface EditionType {
  key: string;
  title: string;
  publish_date?: string;
  publishers?: string[];
  number_of_pages?: number;
  isbn_10?: string[];
  isbn_13?: string[];
  language?: string;
  edition_name?: string;
  covers?: number[];
}

export interface EditionsResponse {
  size: number;
  entries: EditionType[];
}
