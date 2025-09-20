import { useEffect, useMemo, useState } from 'react';
import { BeatLoader } from 'react-spinners';

import Pagination from './components/Pagination/Pagination';
import CatalogList from './components/CatalogList/CatalogList';
import OrderBy from './components/Sort/Sort';
import PriceFilter from './components/Filters/Filters';
import ThemeToggle from './components/Theme/Theme';

import './styles/App.scss';

import type { ApiBook, PriceSort } from './types/book';
import { parsePrice } from './utils/price';
import { fetchAllBooks } from './api/book';

const PER_PAGE = 10;
const QUERY = 'javascript';

function App() {
  const [allBooks, setAllBooks] = useState<ApiBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<PriceSort>('price_asc');

  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);

  useEffect(() => {
    async function loadBooks() {
      try {
        setLoading(true);
        setError(null);
        const all = await fetchAllBooks(QUERY);
        setAllBooks(all);
      } catch (error: any) {
        setError(error?.message || 'Failed to load books');
        setAllBooks([]);
      } finally {
        setLoading(false);
      }
    }
    loadBooks();
  }, []);

  const { minLimit, maxLimit } = useMemo(() => {
    if (!allBooks.length) return { minLimit: 0, maxLimit: 0 };
    const nums = allBooks.map((b) => parsePrice(b.price));
    return { minLimit: Math.min(...nums), maxLimit: Math.max(...nums) };
  }, [allBooks]);

  const filteredSorted = useMemo(() => {
    let arr = allBooks;

    arr = arr.filter((b) => parsePrice(b.price) > 0);

    if (priceMin !== null)
      arr = arr.filter((b) => parsePrice(b.price) >= priceMin);
    if (priceMax !== null)
      arr = arr.filter((b) => parsePrice(b.price) <= priceMax);

    const sorted = [...arr];
    if (sortBy === 'price_asc') {
      sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    } else if (sortBy === 'price_desc') {
      sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    }
    return sorted;
  }, [allBooks, priceMin, priceMax, sortBy]);

  const pages = Math.max(1, Math.ceil(filteredSorted.length / PER_PAGE));
  const pageItems = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filteredSorted.slice(start, start + PER_PAGE);
  }, [filteredSorted, page]);

  useEffect(() => {
    setPage(1);
  }, [priceMin, priceMax, sortBy]);

  return (
    <main className="container">
      {loading && <BeatLoader />}
      {error && <p className="error">{error}</p>}
      <ThemeToggle />

      {!loading && !error && (
        <>
          <PriceFilter
            minLimit={minLimit}
            maxLimit={maxLimit}
            onApply={(min, max) => {
              setPriceMin(min);
              setPriceMax(max);
            }}
          />

          <OrderBy value={sortBy} onChange={setSortBy} />

          <CatalogList books={pageItems} />
          <Pagination
            page={page}
            pages={pages}
            disabled={loading}
            onChange={setPage}
          />
        </>
      )}
    </main>
  );
}

export default App;
