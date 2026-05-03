import { useParams } from "react-router-dom"
import MovieCast from "../components/movieCast"
import { type MovieInfo, type CastCrew } from "../types/movie"
import { LoadingSpinner } from "../components/loadingSpinner"
import MovieDetailInfo from "../components/MovieInfo"
import { useFetch } from "../hooks/useFetch"

const MovieDetail = () => {
    const params = useParams()

    const casts = useFetch<CastCrew[]>({dataType: "cast", movieId: params.movieId})
    const info = useFetch<MovieInfo>({dataType: "info", movieId: params.movieId})

    if (casts.isPending || info.isPending) {
        return (
            <div className="w-screen h-screen bg-black flex items-center justify-center">
                <LoadingSpinner />
            </div>
        )
    }

    if (casts.isError || info.isError || !casts.data || !info.data) {
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
            <MovieDetailInfo info={info.data}/>
            <MovieCast casts={casts.data} />
        </div>
    )
}

export default MovieDetail;