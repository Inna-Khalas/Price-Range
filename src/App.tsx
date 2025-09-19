import { useEffect, useState } from 'react';
import './styles/App.scss';
import CatalogList from './components/CatalogList/CatalogList';
import type { ApiBook } from './types/book';
import { fetchBooks } from './api/book';

function App() {
  const [books, setBooks] = useState<ApiBook[]>([]);
  useEffect(() => {
    async function loadBooks() {
      const res = await fetchBooks('javascript', 1);
      console.log(res);

      setBooks(res.books);
    }
    loadBooks();
  }, []);

  return (
    <>
      <CatalogList books={books} />
    </>
  );
}

export default App;
