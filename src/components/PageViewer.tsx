import React from "react";
import { Page } from "../type/type";

interface PageViewerProps {
  pages: Page[];
  currentPageIndex: number;
  onPageChange: (newIndex: number) => void;
  onNextChapter: () => void;
  onPreviousChapter: () => void;
}

const PageViewer: React.FC<PageViewerProps> = React.memo(({
  pages,
  currentPageIndex,
  onPageChange,
  onNextChapter,
  onPreviousChapter,
}) => {
  const handlePageClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const screenWidth = window.innerWidth;
    const clickPosition = e.clientX;

    if (clickPosition < screenWidth / 2) {
      // Left side clicked (Previous page)
      if (currentPageIndex > 0) {
        onPageChange(currentPageIndex - 1);
      } else {
        onPreviousChapter();
      }
    } else {
      // Right side clicked (Next page)
      if (currentPageIndex < pages.length - 1) {
        onPageChange(currentPageIndex + 1);
      } else {
        onNextChapter();
      }
    }
  };

  return (
    <img
      src={pages[currentPageIndex]?.image?.file}
      alt={`Page ${currentPageIndex + 1}`}
      onClick={handlePageClick}
      style={{ cursor: "pointer", width: "100%" }}
    />
  );
});

export default PageViewer;