export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  // 필요하다면 추가 필드도 정의 가능
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type CastCrew = {
  id: number;
  name: string;
  profile_path: string;
  character: string;
  job: string;
}

export type MovieCredit = {
  id: number;
  cast: CastCrew[];
  crew: CastCrew[];
};

export type MovieInfo = {
  id: number;
  title: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  tagline: string;
  overview: string;
  backdrop_path: string;
}

export type ListType = "now_playing"|"popular"|"top_rated"|"upcoming"