import { useEffect, useRef, useState } from "react";
import { OrderButton } from "../components/OrderButton";
import { useGetComment } from "../hooks/queries/useGetComment";
import { useParams } from "react-router-dom";
import { usePostComment } from "../hooks/queries/usePostComment";
import { useForm } from "react-hook-form";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUpdateComment } from "../hooks/queries/useUpdateComment";
import { useAuth } from "../contexts/AuthContext";

type commentStateType = {
  isKebabOpen: boolean;
  isEditMode: boolean;
};

export const CommentsPage = () => {
    const {userId} = useAuth();
    console.log("현재 로그인한 유저 ID:", userId);
    const lpId = useParams().lpid;
    const [activeComment, setActiveComment] = useState<[id: number, state: commentStateType] | null>(null);
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const { data: response, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetComment({ lpId: Number(lpId), order });
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const { mutate: postComment } = usePostComment();
    const { mutate: updateComment } = useUpdateComment();

    // 1. 📝 댓글 [작성] 전용 훅 폼
    const { 
        register: registerPost, 
        handleSubmit: handleSubmitPost, 
        reset: resetPost 
    } = useForm<{ content: string }>({
        defaultValues: { content: "" },
    });

    // 2. ✏️ 댓글 [수정] 전용 훅 폼 (이름을 다르게 분리합니다)
    const { 
        register: registerEdit, 
        handleSubmit: handleSubmitEdit, 
        setValue: setEditValue 
    } = useForm<{ editContent: string }>({
        defaultValues: { editContent: "" },
    });

    // 댓글 작성 제출
    const onsubmitPost = (data: { content: string }) => {
        if (!lpId) return;
        if (!data.content.trim()) {
        alert("댓글 내용을 입력해주세요.");
        return;
        }
        postComment({ lpId: Number(lpId), content: data.content });
        resetPost(); 
    };

    // 케밥 메뉴에서 '수정하기'를 눌렀을 때 실행될 함수
    const handleEditClick = (commentId: number, currentContent: string) => {
        // 수정 인풋창에 기존 댓글 내용을 미리 채워넣어 줍니다.
        setEditValue("editContent", currentContent);
        // 케밥 메뉴는 닫고, 수정 모드는 활성화합니다.
        setActiveComment([commentId, { isKebabOpen: false, isEditMode: true }]);
    };

    // 댓글 수정 서버 제출 완료 핸들러
    const onCommentChangeSubmit = (commentId: number, data: { editContent: string }) => {
        if (!data.editContent.trim()) {
        alert("수정할 내용을 입력해주세요.");
        return;
        }
        console.log(`${commentId}번 댓글 수정 요청 데이터:`, data.editContent);
        updateComment({ lpId: Number(lpId), commentId, content: data.editContent });
        // TODO: 여기에 실제 useUpdateComment() 같은 mutation 연동하기
        
        // 완료 후 상태 초기화 (창 닫기)
        setActiveComment(null);
    };

    useEffect(() => {
        if (!sentinelRef.current || !hasNextPage || isFetchingNextPage) return;

        const el = sentinelRef.current;
        const observer = new IntersectionObserver((entries) => {
        const first = entries[0];
        if (first.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
        });
        observer.observe(el);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    return (
        <div className="w-full bg-[#353540] rounded mx-8 py-8 px-20 text-white">
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold mb-4">댓글</h2>
            <OrderButton setOrder={setOrder} order={order} />
        </div>

        {/* 📝 댓글 작성 Form */}
        <form className="flex justify-between items-center mb-4" onSubmit={handleSubmitPost(onsubmitPost)}>
            <input
            type="text"
            placeholder="댓글을 입력하세요!"
            className="flex-1 w-full p-2 rounded border border-white text-white bg-transparent"
            {...registerPost("content")}
            />
            <button type="submit" className="cursor-pointer w-16 ml-4 px-4 py-2 bg-gray-400 text-white rounded">
            작성
            </button>
        </form>

        {/* 댓글 리스트 렌더링 영역 */}
        <div>
            {response?.pages.map((page, pageIndex) => (
            <div key={pageIndex}>
                {page?.data?.data.map((comment) => {
                const isCurrentActive = activeComment?.[0] === comment.id;
                const isKebabOpen = isCurrentActive && activeComment[1].isKebabOpen;
                const isEditMode = isCurrentActive && activeComment[1].isEditMode;

                return (
                    <div key={comment.id} className="border-b border-gray-600 py-4 w-full">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                        <img src={comment.author.avatar} alt="avatar" className="w-6 h-6 rounded-full inline-block mr-2" />
                        <span className="text-sm font-semibold text-gray-300">{comment.author.name}</span>
                        </div>

                        {/* 케밥 버튼 및 드롭다운 위치 */}
                        <div className="relative">
                        {comment.authorId === userId && (
                            <button
                                type="button"
                                onClick={() =>
                                    setActiveComment([
                                        comment.id,
                                        { isKebabOpen: !isKebabOpen, isEditMode: false },
                                ])
                                }
                                className="p-1 cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faEllipsisVertical} className="text-gray-400" />
                            </button>)}

                        {/* 케밥 드롭다운 메뉴 */}
                        {isKebabOpen && (
                            <div className="absolute right-0 mt-1 w-24 bg-zinc-900 border border-gray-700 rounded shadow-xl z-50 overflow-hidden">
                            <button
                                type="button"
                                className="w-full text-left px-3 py-2 text-xs text-gray-300 hover:bg-zinc-800 transition-colors cursor-pointer"
                                onClick={() => handleEditClick(comment.id, comment.content)}
                            >
                                수정하기
                            </button>
                            <button
                                type="button"
                                className="w-full text-left px-3 py-2 text-xs text-red-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                                onClick={() => {
                                if (window.confirm("정말 삭제하시겠습니까?")) {
                                    console.log("삭제요청:", comment.id);
                                }
                                setActiveComment(null);
                                }}
                            >
                                삭제하기
                            </button>
                            </div>
                        )}
                        </div>
                    </div>

                    {/* 댓글 내용 혹은 수정 폼 분기 */}
                    <div className="pl-8 pr-2">
                        {isEditMode ? (
                        /* ✏️ 댓글 수정 Form */
                        <form
                            onSubmit={handleSubmitEdit((data) => onCommentChangeSubmit(comment.id, data))}
                            className="flex gap-2 mt-2"
                        >
                            <input
                            type="text"
                            className="flex-1 p-2 bg-transparent border border-gray-400 rounded text-sm text-white"
                            {...registerEdit("editContent")}
                            />
                            <button type="submit" className="px-3 py-1 bg-blue-500 rounded text-xs text-white cursor-pointer">
                            Save
                            </button>
                            <button
                            type="button"
                            onClick={() => setActiveComment(null)}
                            className="px-3 py-1 bg-zinc-600 rounded text-xs text-white cursor-pointer"
                            >
                            Cancel
                            </button>
                        </form>
                        ) : (
                        <p className="text-sm text-gray-300 break-all">{comment.content}</p>
                        )}
                    </div>
                    </div>
                );
                })}
            </div>
            ))}

            {/* 스켈레톤 로딩 */}
            {(isFetchingNextPage || isLoading) &&
            Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="border-b border-gray-600 py-4 flex flex-col gap-2">
                <div className="flex items-center">
                    <div className="animate-pulse w-6 h-6 rounded-full mr-2 bg-gray-500" />
                    <div className="animate-pulse rounded-full h-4 w-24 bg-gray-500" />
                </div>
                <div className="animate-pulse rounded-full h-4 w-full max-w-xl bg-gray-500 ml-8" />
                </div>
            ))}
            {isError && <div className="text-red-400 mt-4">Error loading comments.</div>}
        </div>

        <div ref={sentinelRef} className="h-4 w-full" />
        </div>
    );
};