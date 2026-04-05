import type { MovieInfo } from "../types/movie"

const MovieDetailInfo = ({info}:{info:MovieInfo}) => {
    return ( 
        <div className="relative p-4">
            <img className="h-100 w-full object-cover rounded-md" src={`https://image.tmdb.org/t/p/original/${info.backdrop_path}`}></img>
            <div className="absolute inset-4 bg-gradient-to-r from-black/100 to-transparent"></div>
            <div className="absolute inset-4">
                <h1 className="text-[40px] font-bold my-4">{info.title}</h1>
                <p>평균 {Math.round(info.vote_average*10)/10}</p>
                <p>{info.release_date.slice(0,4)}</p>
                <p>{info.runtime}분</p>
                <p className="text-[25px] italic py-4">{info.tagline}</p>
                <p className="inline-block w-200 whitespace-normal">{info.overview}</p>
            </div>
        </div>
    )
}


export default MovieDetailInfo