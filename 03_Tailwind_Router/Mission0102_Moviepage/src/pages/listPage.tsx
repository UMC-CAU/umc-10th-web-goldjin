import { useEffect, useState } from "react"
import PageButton from "../components/pageButton"
import { usePage } from "../contexts/pageContext"
import MovieGallary from "../components/moviegrid"
import type { ListType } from "../types/movie"

const ListPage = ({type}: {type: ListType}) => {
    const {setPage} = usePage()
    useEffect(() => {
        setPage(1);
    },[type])

    return (
        <div className="flex flex-col items-center flex-wrap">
            <PageButton />
            <MovieGallary type={type} />

        </div>
    )
}

export default ListPage