import type { PriceSort } from "../../types/book";

type Props = {
  value: PriceSort;
  onChange: (v: PriceSort) => void;
};

export default function OrderBy({ value, onChange }: Props) {
  return (
    <div>
      <span>Order by</span>
      <div>
        <button
          onClick={() => onChange('price_asc')}
        >
          Lowest price
        </button>

        <button
          onClick={() => onChange('price_desc')}
        >
          Highest price
        </button>
      </div>
    </div>
  );
}
