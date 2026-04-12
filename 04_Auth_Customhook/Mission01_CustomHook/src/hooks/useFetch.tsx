import { useEffect, useState } from "react"
import { getMovie, getMovieCredit, getMovieInfo } from "../utils/movieApi";
import type { ListType } from "../types/movie";


interface FetchParams {
  dataType: "info" | "cast" | "movie";
  movieId?: string;
  page?: number;
  type?: ListType;
}

export const useFetch = <T, >({ dataType, movieId, page, type }: FetchParams) => { // 제네릭과 HTML태그와의 모호함 해소를 위해 쉼표 추가
    const [data, setData] = useState<T>()
    const [isError, setIsError] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(true);
    
    useEffect(() => {
        setIsError(false);
        setIsPending(true);

        const fetchData = async () => {
            try {
                switch(dataType) {
                    case "info": {
                        if (!movieId) {
                            throw new Error("movieId 없음");
                        }
                        const {data: result} = await getMovieInfo(movieId);
                        setData(result as T); // as 진짜 넣기 싫었는데 switch문을 쓰면 타입 단언이 안되서 이렇게 해야한다고 하네요 다른 방법이 없을까요 ㅜ
                        break;
                    }
                    case "cast": {
                        if (!movieId) {
                            throw new Error("movieId 없음");
                        }
                        const {data: result} = await getMovieCredit(movieId);
                        setData([...result.cast, ...result.crew] as T)
                        break;
                    }
                    case "movie": {
                        if(!page || !type) {
                            throw new Error("카테고리 type과 page 없음")
                        }
                        const {data: result} = await getMovie(page, type)
                        setData({movies: result.results, maxPage: result.total_pages} as T);
                        break;
                    }
                }
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }

        };

        fetchData();
        
    },[page, type]) // 제미나이 피셜 여기에 모든 파라미터를 넣으라는데,,, 왠지 진짜 모르겠음!!!

    return(
        {data, isError, isPending}
    )
    
}