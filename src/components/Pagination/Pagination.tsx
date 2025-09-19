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
    <nav>
      <button disabled={!prev} onClick={()=> onChange(1)}>First page</button>
      <button disabled={!prev} onClick={()=> onChange(page - 1)}>Prev</button>
      <span>{page}/{pages}</span>
      <button disabled={!next} onClick={()=> onChange(page+1)}>Next</button>
      <button disabled={!next} onClick={()=> onChange(pages)}>Last page</button>
    </nav>
  );
}
