import { createContext, useContext, useState, type PropsWithChildren } from "react"

interface SearchContextType {
    isSearching: boolean
    setIsSearching: (isSearching: boolean) => void
}

// 2. 기본값 설정
export const SearchContext = createContext<SearchContextType>({
    isSearching: false,
    setIsSearching: () => {}
})

// 3. Provider 구현
export const SearchProvider = ({ children }: PropsWithChildren) => {
    const [isSearching, setIsSearching] = useState<boolean>(false)

    return (
        <SearchContext.Provider value={{ isSearching, setIsSearching }}>
            {children}
        </SearchContext.Provider>
    )
}

// 4. 커스텀 훅
export const useSearch = () => {
    const context = useContext(SearchContext)
    if (!context) {
        throw new Error("useSearch는 SearchProvider 내에서 사용되어야 합니다.")
    }
    return context
}