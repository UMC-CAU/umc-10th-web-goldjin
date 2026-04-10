import { createContext, useContext, useState, type ReactNode } from "react"
interface pageContextType {
    page: number
    maxPage: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    setMaxPage: React.Dispatch<React.SetStateAction<number>>

}

const pageContext = createContext<pageContextType|undefined>(undefined);

export const PageProvider = ({children}: {children: ReactNode}) => {

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    return (
        <pageContext.Provider value={{page, maxPage ,setPage, setMaxPage}}>
            {children}
        </pageContext.Provider>
    )   
}

export const usePage = () => {
    const page = useContext(pageContext);
    if (!page) {
        throw new Error("pageprovider 설정하지 않음");
    }
    return page;
}