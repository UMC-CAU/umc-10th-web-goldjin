import { useQuery } from "@tanstack/react-query";
import type { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";

export const useGetLpList = ({cursor, search, order, limit}: PaginationDto) => {
    return useQuery({
        queryKey: ["lps"],
        queryFn: () => getLpList({ cursor, search, order, limit }),
    })
};
