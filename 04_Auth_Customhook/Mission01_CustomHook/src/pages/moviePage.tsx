import { useParams } from "react-router-dom"
import MovieCast from "../components/movieCast"
import { useEffect, useState } from "react"
import { type MovieInfo, type CastCrew } from "../types/movie"
import { getMovieCredit, getMovieInfo } from "../utils/movieApi"
import { LoadingSpinner } from "../components/loadingSpinner"
import MovieDetailInfo from "../components/MovieInfo"

const MovieDetail = () => {
    const params = useParams()
    const [casts, setCasts] = useState<CastCrew[]>([]);
    const [info, setInfo] = useState<MovieInfo>();
    const [isError, setIsError] = useState<boolean>(false);
    const [isPending, setIsPending] = useState<boolean>(true);

    useEffect(() => {
        setIsError(false);
        setIsPending(true);

        const fetchCasts = async () => {
            if (!params.movieId) {
                throw new Error("movieId가 없음")
            }

            try {
                const { data: infoData } = await getMovieInfo(params.movieId);
                setInfo(infoData);

                const { data: castData } = await getMovieCredit(params.movieId);
                setCasts([...castData.cast, ...castData.crew])
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        }
        
        fetchCasts();
    },[])

    if (isPending) {
        return (
            <div className="w-screen h-screen bg-black flex items-center justify-center">
                <LoadingSpinner />
            </div>
        )
    }

    if (isError) {
        return (
            <div className="bg-black">
                <span className="text-white">에러남</span>
            </div>
        )
    }

    if (!info) {
        throw new Error("인포 없음");
    }

    return (
        <div className="w-full h-full bg-black text-white">
            <MovieDetailInfo info={info}/>
            <MovieCast casts={casts} />
        </div>
    )
}

export default MovieDetail;