import { useEffect, useState } from 'react';
import './styles/App.scss';
import CatalogList from './components/CatalogList/CatalogList';
import type { ApiBook } from './types/book';
import { fetchBooks } from './api/book';
import { BeatLoader } from 'react-spinners';
import Pagination from './components/Pagination/Pagination';

function App() {
  const [books, setBooks] = useState<ApiBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

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

  return (
    <>
      {loading && <BeatLoader />}
      {error && <p className="error">{error}</p>}
      <CatalogList books={books} />
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
