import type { PriceSort } from '../../types/book';
import s from './Sort.module.scss';

type Props = {
  value: PriceSort;
  onChange: (v: PriceSort) => void;
};

export default function OrderBy({ value, onChange }: Props) {
  return (
    <div className={s.order}>
      <div className={s.buttons}>
        <button
          className={`${s.btn} ${value === 'price_asc' ? s.active : ''}`}
          onClick={() => onChange('price_asc')}
        >
          Lowest price
        </button>

        <button
          className={`${s.btn} ${value === 'price_desc' ? s.active : ''}`}
          onClick={() => onChange('price_desc')}
        >
          Highest price
        </button>
      </div>
    </div>
  );
}
