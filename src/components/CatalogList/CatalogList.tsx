import type { ApiBook } from "../../types/book";
import CatalogItem from "../CatalogItem/CatalogItem";
import s from './CatalogList.module.scss'

type Props = {
    books: ApiBook[]
}

export default function CatalogList({books}: Props) {
    return(
        <div className={s.list}>
            {books.map(b => (
                <CatalogItem key={b.isbn13} book={b}/>
            ))}
        </div>
    )

}