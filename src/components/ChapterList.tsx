import React from "react";

interface ChapterListProps {
  chapters: number[];
  currentChapterId: number | undefined;
  onSelectChapter: (chapterId: number) => void;
}

const ChapterList: React.FC<ChapterListProps> = React.memo(({ chapters, currentChapterId, onSelectChapter }) => (
  <div className="chapter-list">
    {chapters.map((chapterId) => (
      <button
        key={chapterId}
        className={currentChapterId === chapterId ? "selected" : ""}
        onClick={() => onSelectChapter(chapterId)}
      >
        {chapterId}
      </button>
    ))}
  </div>
));

export default ChapterList;