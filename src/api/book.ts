import { api } from './api';
import type { Response } from '../types/book';

export async function fetchBooks(query: string, page = 1): Promise<Response> {
  try {
    const { data } = await api.get<Response>(`/search/${query}/${page}`);
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Request failed');
  }
}
