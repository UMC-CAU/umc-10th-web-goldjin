import { useQuery } from "@tanstack/react-query"
import { getLpDetail } from "../../apis/lp"

export const useGetLpDetail = (lpid: number) => {
    return useQuery({
        queryKey: ["lp", lpid],
        queryFn: () => getLpDetail(lpid),
        staleTime: 1000 * 60
    })
}