import { useEffect } from "react";
import type { CastCrew } from "../types/movie";
import CastCard from "./CastCard";

const MovieCast = ({casts}: {casts: CastCrew[]}) => {
    

    useEffect(() => {
        
    },[])

    return (
        <>
            <h1 className="text-[30px] font-bold p-4 mb-5">감독/출연</h1>
            <ul className="grid grid-cols-8 w-full">
                {casts.map((cast) => (
                    <CastCard key={cast.id} cast={cast} />
                ))}
            </ul>
        </>
    )
}

export default MovieCast;