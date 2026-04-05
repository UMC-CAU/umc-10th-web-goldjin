import { useEffect, useState } from "react";
import type { ListType, Movie } from "../types/movie";
import { getMovie } from "../utils/movieApi";
import { MovieCard } from "./movieGridCard";
import { usePage } from "../contexts/pageContext";
import { LoadingSpinner } from "./loadingSpinner";

const MovieGallary = ({type}: {type:ListType}) => {
    const {page, setMaxPage} = usePage();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [isError, setIsError] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(true);

    useEffect(() => {
        setIsError(false);
        setIsPending(true);

        const fetchMovies = async () => {
            try {
                const { data } = await getMovie(page, type)
                setMovies(data.results);
                setMaxPage(data.total_pages)
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }

        };


        fetchMovies();
        
    }, [page, type]);

    if (isPending) {
        return (
            <LoadingSpinner />
        )
    }

    if (isError) {
        return (
            <div>
                <span>에러가 발생했습니다.</span>
            </div>
        )
    }

    return (
        <ul className="grid grid-cols-5 gap-3 content-center justify-center list-none w-[800px] p-0 m-0">
        {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
        ))}
        </ul>
    );
}

export default MovieGallary