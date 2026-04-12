import type { ListType, Movie } from "../types/movie";
import { MovieCard } from "./movieGridCard";
import { usePage } from "../contexts/pageContext";
import { LoadingSpinner } from "./loadingSpinner";
import { useFetch } from "../hooks/useFetch";
import { useEffect } from "react";

interface FetchType {
    movies: Movie[]
    maxPage: number
}

const MovieGallary = ({type}: {type:ListType}) => {
    const {page, setMaxPage} = usePage();
    const {data, isError, isPending} = useFetch<FetchType>({dataType: "movie", page, type})

    useEffect(() => {
        if (data)
            setMaxPage(data.maxPage)
    },[data?.maxPage])
    
        
    if (isPending) {
        return (
            <LoadingSpinner />
        )
    }

    if (isError || !data) {
        return (
            <div>
                <span>에러가 발생했습니다.</span>
            </div>
        )
    }

    const movies: Movie[] = data.movies
    

    return (
        <ul className="grid grid-cols-5 gap-3 content-center justify-center list-none w-[800px] p-0 m-0">
        {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
        ))}
        </ul>
    );
}

export default MovieGallary