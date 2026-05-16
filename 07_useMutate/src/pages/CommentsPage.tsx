import { useEffect, useRef, useState } from "react";
import { OrderButton } from "../components/OrderButton"
import { useGetComment } from "../hooks/queries/useGetComment";
import { useParams } from "react-router-dom";

export const CommentsPage = () => {
    const lpId = useParams().lpid;
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const {data:response, isLoading,isError, fetchNextPage, hasNextPage, isFetchingNextPage} = useGetComment({ lpId: (Number(lpId)), order });
    const sentinelRef = useRef<HTMLDivElement | null>(null);

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
    
    return (
        <div className="w-full bg-[#353540] rounded mx-8 py-8 px-20">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold mb-4">댓글</h2>
                <OrderButton setOrder={setOrder} order={order} />
            </div>
            <div className="flex justify-between items-center mb-4">
                <input type="text" placeholder="댓글을 입력하세요!" className="flex-1 w-full p-2 rounded border border-white text-white" />
                <button className="w-16 ml-4 px-4 py-2 bg-gray-400 text-white rounded">작성</button>
            </div>
            <div>
            {response?.pages.map((page, pageIndex) => (
                <div key={pageIndex}>
                    {page?.data?.data.map((comment) => (
                        <div key={comment.id} className="border-b border-gray-600 py-4">
                            <img src={comment.author.avatar} alt="avatar" className="w-6 h-6 rounded-full inline-block mr-2" />
                            <span className="text-sm text-gray-400 mr-2">
                                <p>{comment.author.name}</p>
                                <p>{comment.content}</p>
                            </span>
                        </div>
                    ))}
                </div>
            ))}
            {(isFetchingNextPage || isLoading) && 
            ( Array.from({length: 10}).map((_, index) => (
            <div key={index} className="border-b border-gray-600 py-4">
                <div className="animate-pulse w-6 h-6 rounded-full mr-2 bg-gray-500"></div>
                <div className="animate-pulse rounded-full h-4 w-64 bg-gray-500"></div>
                <div className="animate-pulse rounded-full h-4 w-128 bg-gray-500 mt-2 w-3/4"></div>
            </div>)))}
            {isError && <div>Error loading comments.</div>}
            </div>

            <div ref={sentinelRef} className="h-4 w-full"></div>

        </div>
        
    )
}