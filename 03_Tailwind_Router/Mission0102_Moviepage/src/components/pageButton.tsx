import { usePage } from "../contexts/pageContext"

const PageButton = () => {
    const buttonClass = "px-5 py-3 rounded-md text-white font-bold"

    const {page, maxPage, setPage} = usePage();
    return (
        <div className="w-50 flex justify-between items-center m-10">
            <button 
                className={buttonClass + (page === 1? " bg-gray-300": " bg-purple-300 hover:bg-green-200")} 
                onClick={() => {setPage((prev) => prev !== 1? prev-1: prev )}}
            >&lt;</button>
            {page} 페이지
            <button 
                className={buttonClass + (page === maxPage? "bg-gray-300": " bg-purple-300 hover:bg-green-200")} 
                onClick={() => {setPage((prev) => prev !== maxPage? prev+1: prev)}}
            >&gt;</button>
        </div>
    )
}

export default PageButton