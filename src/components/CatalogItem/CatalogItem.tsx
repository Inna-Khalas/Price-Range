import type { ApiBook } from '../../types/book';
import s from './CatalogItem.module.scss'

type Props = {
  book: ApiBook;
};

export default function CatalogItem({ book }: Props) {
  const { image, title, subtitle, price } = book;
  return (
    <div className={s.item}>
      <img src={image} alt={title} className={s.image}/>
      <div className={s.content}>
        <h1 className={s.title}>{title}</h1>
        <p className={s.subtitle}>{subtitle}</p>
        <p className={s.price}>{price}</p>
      </div>
    </div>
  );
}
