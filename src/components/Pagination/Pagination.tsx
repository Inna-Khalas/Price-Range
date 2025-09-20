import s from './Pagination.module.scss'

type Props = {
  page: number;
  pages: number;
  disabled?: boolean;
  onChange: (p: number) => void;
};

export default function Pagination({ page, pages, disabled, onChange }: Props) {
  const prev = page > 1 && !disabled;
  const next = page < pages && !disabled;

  return (
    <nav className={s.pagination}>
      <button disabled={!prev} onClick={()=> onChange(1)} className={s.btn}>First page</button>
      <button disabled={!prev} onClick={()=> onChange(page - 1)} className={s.btn}>Prev</button>
      <span className={s.counter}>{page}/{pages}</span>
      <button disabled={!next} onClick={()=> onChange(page+1)} className={s.btn}>Next</button>
      <button disabled={!next} onClick={()=> onChange(pages)} className={s.btn}>Last page</button>
    </nav>
  );
}
