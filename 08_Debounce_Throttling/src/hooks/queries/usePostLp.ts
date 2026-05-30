import { useMutation, useQueryClient } from "@tanstack/react-query"
import { postLp } from "../../apis/lp";
import type { requestLpDto } from "../../types/lp";

export const usePostLp = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationKey: ["postLp"],
        mutationFn: (requestLpDto: requestLpDto) => postLp(requestLpDto),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["lps"] }),
    });

}