
export type ApiBook = {
  title: string;
  subtitle: string;
  isbn13: string;
  price: string;
  image: string;
};

export type Book = {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  image: string;
};

export type Response = {
  error: string;
  total: string;
  page: string;
  books: ApiBook[];
};
