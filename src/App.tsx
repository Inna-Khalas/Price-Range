import { useEffect, useState, useMemo } from 'react';
import './styles/App.scss';
import CatalogList from './components/CatalogList/CatalogList';
import type { ApiBook } from './types/book';
import type { PriceSort } from './components/Sort/Sort';
import { fetchBooks } from './api/book';
import { BeatLoader } from 'react-spinners';
import Pagination from './components/Pagination/Pagination';
import { parsePrice } from './utils/price';
import OrderBy from './components/Sort/Sort';

function App() {
  const [books, setBooks] = useState<ApiBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [sortBy, setSortBy] = useState<PriceSort>('price_asc');

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchBooks('javascript', page);
        setBooks(res.books);

        const total = Number(res.total || '0');
        setPages(Math.max(1, Math.ceil(total / 10)));
      } catch (error: any) {
        setError(error?.message || 'Failed to load books');
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, [page]);

  const sortedBooks = useMemo(() => {
    const arr = [...books];
    if (sortBy === 'price_asc') {
      return arr.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    }
    return arr.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  }, [books, sortBy]);

  return (
    <>
      {loading && <BeatLoader />}
      {error && <p className="error">{error}</p>}
      <OrderBy value={sortBy} onChange={setSortBy} />
      <CatalogList books={sortedBooks} />
      <Pagination
        page={page}
        pages={pages}
        disabled={loading}
        onChange={setPage}
      />
    </>
  );
}

export default App;
