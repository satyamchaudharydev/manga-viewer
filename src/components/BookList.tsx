import React from "react";
import { Book } from "../type/type";

interface BookListProps {
  books: Book[];
  currentBookId: number | undefined;
  onSelectBook: (book: Book) => void;
}

const BookList: React.FC<BookListProps> = React.memo(({ books, currentBookId, onSelectBook }) => (
  <div className="book-list">
    {books.map((book) => (
      <button
        className={currentBookId === book.id ? "selected" : ""}
        key={book.id}
        onClick={() => onSelectBook(book)}
      >
        {book.title}
      </button>
    ))}
  </div>
));

export default BookList;