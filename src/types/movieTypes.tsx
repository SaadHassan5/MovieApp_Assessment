export type Movie = {
  id: number;
  poster_path: string;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  genreName?: string;
};

export type MovieListResponse = {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
};

export type Category = {
  id: number;
  name: string;
  image?: string;
};
