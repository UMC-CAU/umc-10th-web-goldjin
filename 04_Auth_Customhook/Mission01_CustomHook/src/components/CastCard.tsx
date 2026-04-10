import type { CastCrew } from "../types/movie";

const CastCard = ({cast}: {cast: CastCrew}) => {
    return (
        <li className="text-center flex flex-col items-center pb-10">
            <img 
                className="size-20 object-cover rounded-full mb-3 border-white outline" 
                src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}></img>
            <span className="text-[12px] font-bold">{cast.name}</span>
            <span className="text-[10px] text-gray-500">{cast.character? cast.character: cast.job}</span>
            
        </li>
    )
}

export default CastCard