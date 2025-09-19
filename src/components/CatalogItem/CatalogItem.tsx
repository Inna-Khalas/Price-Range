import type { ApiBook } from '../../types/book';

type Props = {
  book: ApiBook;
};

export default function CatalogItem({ book }: Props) {
  const { image, title, subtitle, price } = book;
  return (
    <div>
      <img src={image} alt={title} />
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <p>{price}</p>
      </div>
    </div>
  );
}
