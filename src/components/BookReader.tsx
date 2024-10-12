import React, { useEffect, useState, useCallback } from "react";
import { Book, Chapter, Page } from "../type/type";
import { preloadImages } from "../utils/imageUtils";
import { bookAPI} from "../api";
import PageViewer from "./PageViewer";
import ChapterList from "./ChapterList";
import BookList from "./BookList";


const BookReader: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [currentChapter, setCurrentChapter] = useState<Chapter | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data = await bookAPI.fetchBooks();
        setBooks(data);
        if (data.length > 0) {
          selectBook(data[0]);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    loadBooks();
  }, []);

  const selectBook = useCallback(async (book: Book) => {
    setCurrentBook(book);
    if (book.chapter_ids.length > 0) {
      await selectChapter(book.chapter_ids[0]);
    }
  }, []);

  const selectChapter = useCallback(async (chapterId: number) => {
    try {
      const data = await bookAPI.fetchChapterDetails(chapterId);
      preloadImages(data.pages.map((page) => page.image.file));
      setCurrentChapter(data);
      setCurrentPageIndex(0);
    } catch (error) {
      console.error("Error fetching chapter details:", error);
    }
  }, []);

  const handlePageChange = useCallback((newIndex: number) => {
    setCurrentPageIndex(newIndex);
  }, []);

  const handleNextChapter = useCallback(() => {
    if (currentBook && currentChapter) {
      const currentChapterIndex = currentBook.chapter_ids.indexOf(currentChapter.id);
      if (currentChapterIndex < currentBook.chapter_ids.length - 1) {
        selectChapter(currentBook.chapter_ids[currentChapterIndex + 1]);
      }
    }
  }, [currentBook, currentChapter, selectChapter]);

  const handlePreviousChapter = useCallback(() => {
    if (currentBook && currentChapter) {
      const currentChapterIndex = currentBook.chapter_ids.indexOf(currentChapter.id);
      if (currentChapterIndex > 0) {
        selectChapter(currentBook.chapter_ids[currentChapterIndex - 1]);
      }
    }
  }, [currentBook, currentChapter, selectChapter]);

  return (
    <div className="container">
      <div className="header">
        <BookList
          books={books}
          currentBookId={currentBook?.id}
          onSelectBook={selectBook}
        />
        {currentBook && (
          <ChapterList
            chapters={currentBook.chapter_ids}
            currentChapterId={currentChapter?.id}
            onSelectChapter={selectChapter}
          />
        )}
      </div>
      <div className="book-content">
        {currentChapter && (
          <PageViewer
            pages={currentChapter.pages}
            currentPageIndex={currentPageIndex}
            onPageChange={handlePageChange}
            onNextChapter={handleNextChapter}
            onPreviousChapter={handlePreviousChapter}
          />
        )}
      </div>
      <div className="page-number">
        {currentPageIndex + 1} / {currentChapter?.pages.length || 0}
      </div>
    </div>
  );
};

export default BookReader;