
const API_BASE_URL = 'http://52.195.171.228:8080';

interface Book {
  id: number;
  title: string;
  chapter_ids: number[];
}

interface ChapterDetails {
  id: number;
  pages: {
    id: number;
    page_index: number;
    image: {
      file: string;
      width: number;
      height: number;
    };
  }[];
}

async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
}

export const bookAPI = {
  fetchBooks: (): Promise<Book[]> => fetchFromAPI('/books/'),
  fetchChapterDetails: (chapterId: number): Promise<ChapterDetails> => 
    fetchFromAPI(`/chapters/${chapterId}/`),
};