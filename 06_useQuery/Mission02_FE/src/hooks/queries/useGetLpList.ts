import { useInfiniteQuery} from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";

export const useGetLpList = ({ search, order, limit }: PaginationDto) => {
    return useInfiniteQuery({
        // limit 조건이 유실되지 않도록 디스트럭처링에 기본값(10) 지정 후 키에 반영합니다.
        queryKey: ["lps", order, search, limit],
        queryFn: ({ pageParam }) => getLpList({ cursor: pageParam, search, order, limit }),
        
        // [교정 1] 명세서 스펙대로 첫 페이지는 cursor 파라미터를 아예 보내지 않도록(undefined) 설정합니다.
        initialPageParam: 0,
        
        // [교정 2] Axios 응답 객체 구조에 맞게 .data 계층을 거쳐서 nextCursor를 꺼내옵니다.
        getNextPageParam: (lastPage: any) => {
            // 만약 Axios의 인터셉터 처리에 따라 구조가 다르다면 아래 두 라인을 적절히 스위칭해 보세요.
            const nextCursor = lastPage?.data?.nextCursor;
            
            return nextCursor !== null && nextCursor !== undefined ? nextCursor : undefined;
        },
        staleTime: 1000 * 60
    })
};