import { useEffect, useState } from 'react';
import './styles/App.scss';
import CatalogList from './components/CatalogList/CatalogList';
import type { ApiBook } from './types/book';
import { fetchBooks } from './api/book';
import{ BeatLoader} from 'react-spinners';



function App() {
  const [books, setBooks] = useState<ApiBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchBooks('javascript', 1);
        setBooks(res.books);
      } catch (error: any) {
        setError(error?.message || 'Failed to load books');
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, []);

  return (
    <>
      {loading && <BeatLoader/>}
      {error && <p className="error">{error}</p>}
     <CatalogList books={books} />
    </>
  );
}

export default App;
