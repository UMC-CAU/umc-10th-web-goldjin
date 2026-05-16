import { useInfiniteQuery } from "@tanstack/react-query"
import type { CommentDto } from "../../types/common"
import { getComments } from "../../apis/lp"

export const useGetComment = ({lpId, order, cursor, limit}: CommentDto) => {
    return useInfiniteQuery({
        queryKey: ["comments", lpId, order],
        queryFn: ({ pageParam }) => getComments({ lpId, order, cursor: pageParam, limit }),
        initialPageParam: 0,
        getNextPageParam: (lastPage: any) => {
            const nextCursor = lastPage?.data?.nextCursor;
            return nextCursor !== null && nextCursor !== undefined ? nextCursor : undefined;
        }
    })
}