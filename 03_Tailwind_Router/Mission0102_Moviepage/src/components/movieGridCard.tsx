import { useEffect, useState } from "react"
import type { Movie } from "../types/movie"
import { Link } from "react-router-dom"

export const MovieCard = ({movie}: {movie: Movie}) => {
    useEffect(() => {

    },[])

    return(
        <li 
            className={`relative group 
                flex justify-center items-center
                hover:scale-105`}
        >
            <Link to={`/movies/${movie.id}`}>
                <img className={`rounded-md `}
                    src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`} 
                />

                <div className={`absolute inset-0 px-2 opacity-0 rounded-md
                    flex flex-col items-center justify-center  
                    group-hover:opacity-100 group-hover:backdrop-blur-sm 
                    text-center`}
                >
                    <span className="font-bold text-white text-sm text-center mb-2">
                        {movie.title}
                    </span>
                    <span className="text-white text-xs text-center line-clamp-3">
                        {movie.overview}
                    </span>
                </div>
            </Link>
            
        </li>
    )
}