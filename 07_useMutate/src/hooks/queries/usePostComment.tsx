import { useQueryClient, useMutation } from "@tanstack/react-query" // 1. useQueryClient 임포트
import { postComment } from "../../apis/lp";

export const usePostComment = () => {
    const qc = useQueryClient(); 
    
    return useMutation({
        mutationKey: ["postComment"],
        mutationFn: (commentData: { lpId: number; content: string }) => {
            return postComment(commentData);
        },
        onSettled: () => {
            // 이제 진짜 메인 클라이언트에 명령을 내리므로 즉시 새로고침(Refetch)이 돕니다!
            qc.invalidateQueries({ queryKey: ["comments"] });
        }
    })
}