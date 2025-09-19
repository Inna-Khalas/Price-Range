import type { ApiBook } from "../../types/book";
import CatalogItem from "../CatalogItem/CatalogItem";

type Props = {
    books: ApiBook[]
}

export default function CatalogList({books}: Props) {
    return(
        <div>
            {books.map(b => (
                <CatalogItem key={b.isbn13} book={b}/>
            ))}
        </div>
    )

}