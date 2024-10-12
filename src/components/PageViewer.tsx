import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Page } from "../type/type";

interface PageViewerProps {
  pages: Page[];
  currentPageIndex: number;
  onPageChange: (newIndex: number) => void;
  onNextChapter: () => void;
  onPreviousChapter: () => void;
}

export const PageViewer: React.FC<PageViewerProps> = React.memo(({
  pages,
  currentPageIndex,
  onPageChange,
  onNextChapter,
  onPreviousChapter,
}) => {
  const [direction, setDirection] = useState<number>(0);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const handlePageClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const screenWidth = window.innerWidth;
    const clickPosition = e.clientX;

    if (clickPosition < screenWidth / 2) {
      // Left side clicked (Previous page)
      if (currentPageIndex > 0) {
        setDirection(-1);
        onPageChange(currentPageIndex - 1);
      } else {
        setDirection(-1);
        onPreviousChapter();
      }
    } else {
      // Right side clicked (Next page)
      if (currentPageIndex < pages.length - 1) {
        setDirection(1);
        onPageChange(currentPageIndex + 1);
      } else {
        setDirection(1);
        onNextChapter();
      }
    }
  };

  return (
    <div className="page-viewer" onClick={handlePageClick} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={currentPageIndex}
          src={pages[currentPageIndex]?.image?.file}
          alt={`Page ${currentPageIndex + 1}`}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </AnimatePresence>
    </div>
  );
});

export default PageViewer;
