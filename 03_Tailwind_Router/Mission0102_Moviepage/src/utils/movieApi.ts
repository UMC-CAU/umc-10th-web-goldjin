import axios from "axios";
import type { ListType, MovieCredit, MovieInfo, MovieResponse } from "../types/movie";



export const getMovie = (page:number, movieType: ListType) => {
    const data = axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${movieType}?language=ko-KR&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_TOKEN}`,  
          }  
        }
    );

    return data
    
}

export const getMovieCredit = (movieId: string) => {
    const data = axios.get<MovieCredit>(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_TOKEN}`,  
          }  
        }
    );

    return data
}

export const getMovieInfo = (movieId: string) => {
  const data = axios.get<MovieInfo>(
        `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_MOVIE_TOKEN}`,  
          }  
        }
    );

    return data;
}

