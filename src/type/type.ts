export interface Book {
  id: number;
  title: string;
  chapter_ids: number[];
}

export interface Chapter {
  id: number;
  pages: Page[];
}

export interface Page {
  id: number;
  page_index: number;
  image: {
    file: string;
    width: number;
    height: number;
  };
}