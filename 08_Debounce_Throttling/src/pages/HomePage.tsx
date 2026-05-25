import { useState, useEffect, useRef, type ChangeEvent } from "react";
import { useGetLpList } from "../hooks/queries/useGetLpList";
import { Card } from "../components/Card";
import { Link } from "react-router-dom"; // react-router 대신 react-router-dom이 안전합니다.
import { OrderButton } from "../components/OrderButton";
import { CreateModal } from "../components/CreateModal";
import { useSearch } from "../contexts/searchContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "../hooks/useDebounce";

type orderType = "asc" | "desc";

const HomePage = () => {
    const {isSearching} = useSearch();
    const [searchInputText, setSearchInputText] = useState("");
    const [search, setSearch] = useState("");
    const [order, setOrder] = useState<orderType>("desc");
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const debouncedSearch = useDebounce<string>(searchInputText.trim());

    const { 
        data: response, 
        isLoading, 
        isError, 
        fetchNextPage, // 다음 페이지를 불러오는 함수
        hasNextPage,   // 다음 페이지가 더 있는지 여부 (boolean)
        isFetchingNextPage 
    } = useGetLpList({ search, order });

    const sentinelRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        setSearch(debouncedSearch);
    },[debouncedSearch])

    // 5. Intersection Observer 설정
    useEffect(() => {
        
        if (!sentinelRef.current|| !hasNextPage || isFetchingNextPage) return;
    
        const el = sentinelRef.current;
        const observer = new IntersectionObserver((entries) => {
            const first = entries[0];
            if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage(); // 조건 만족하면 다음 페이지 불러오기!
            }
        });
        // 센티널 요소 관찰 시작
        observer.observe(el);

        // 컴포넌트가 언마운트되면 관찰 중지
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage, response]);
    // 의존성 배열: 이 값들이 바뀌면 useEffect가 다시 실행돼요

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchInputText(value);
    }


    if (isError) return <div className="flex justify-center items-center h-screen text-red-500">Error!</div>;

    return (
        <div className="p-6 w-full max-w-7xl mx-auto text-white">
            {isSearching && 
            <div className="mx-10">
                <div className="flex items-center border-b border-white flex-1">
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                    <input placeholder="검색" className="py-2 px-4 flex-1" onChange={handleSearchChange}></input>
                </div>
                <p className="mt-6">최근 검색어</p>
                <ul>

                </ul>
            </div>}
            {/* 정렬 버튼 영역 (명세서 기준: desc가 최신순, asc가 오래된 순) */}
            <div className="flex justify-end mb-8">
                <OrderButton setOrder={setOrder} order={order} />
            </div>
            {/* 그리드 리스트 영역 */}
            { isLoading? <div className="flex justify-center items-center h-screen text-white">Loading...</div>
            : <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                    {response?.pages
                        .flatMap((page) => page?.data?.data || page?.data || [])
                        .map((lp) => (
                            <Link key={lp.id} to={`/lp/${lp.id}`} className="w-full flex justify-center">
                                <Card 
                                    thumbnail={lp.thumbnail} 
                                    title={lp.title} 
                                    likes={lp.likes} 
                                    published={lp.createdAt}
                                />
                            </Link>
                        ))
                    }
                    {isFetchingNextPage && (
                            Array.from({ length: 10 }).map((_, i) => (
                                <div key={i} className="animate-pulse bg-gray-300 w-56 h-56 mx-2" />
                            ))
                        
                    )}
                </div>

                <div ref={sentinelRef} className="h-4 w-full" />



                <div style={{ padding: 8, textAlign: 'center', color: '#666' }}>
                    {hasNextPage
                        ? '아래로 스크롤하면 더 가져와요.'
                        : '더 이상 데이터가 없어요.'}
                </div>
            </>}

            {/* 글쓰기 플로팅 버튼 */}
            <button 
                className="flex items-center justify-center w-16 h-16 fixed rounded-full bg-pink-500 bottom-10 right-10 shadow-lg hover:bg-pink-600 transition-colors z-50" 
                onClick={() => setIsCreateModalOpen(true)}
            >
                <p className="text-3xl font-bold text-white">+</p>
            </button>

            {/* 글쓰기 모달 */}
            {isCreateModalOpen && (<CreateModal setIsCreateModalOpen={setIsCreateModalOpen}/>)}
        </div>
    );
};

export default HomePage;