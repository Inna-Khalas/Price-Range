import { api } from './api';
import type { Response,ApiBook } from '../types/book';

export async function fetchBooks(query: string, page = 1): Promise<Response> {
  try {
    const { data } = await api.get<Response>(`/search/${query}/${page}`);
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Request failed');
  }
}


export async function fetchAllBooks(query: string): Promise<ApiBook[]> {
  const first = await fetchBooks(query, 1);
  const total = Number(first.total || "0");
  const pages = Math.max(1, Math.ceil(total / 10));

  let all: ApiBook[] = [...(first.books || [])];

  for (let p = 2; p <= pages; p++) {
    const res = await fetchBooks(query, p);
    all = all.concat(res.books || []);
  }

  return all;
}
