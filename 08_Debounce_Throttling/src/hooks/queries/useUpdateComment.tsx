import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateComment } from "../../apis/lp";

export const useUpdateComment = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationKey: ["updateComment"],
        mutationFn: ({ lpId, commentId, content }: { lpId: number; commentId: number; content: string }) => {
            return updateComment({ lpId, commentId, content });
        },
        onSettled: () => {
            // 댓글 목록을 새로고침하여 변경된 내용을 반영합니다.
            qc.invalidateQueries({ queryKey: ["comments"] });
        }
    })
}