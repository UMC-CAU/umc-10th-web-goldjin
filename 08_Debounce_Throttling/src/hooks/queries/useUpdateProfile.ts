import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upDateMyInfo } from "../../apis/auth";

export const useUpdateProfile = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationKey: ["updateProfile"],
        mutationFn: (profileData: { name: string; bio?: string; avatar?: string }) => {
            return upDateMyInfo(profileData);
        },
        onSettled: () => {
            // 프로필 정보이므로, 내 정보 쿼리를 새로고침하여 변경된 내용을 반영합니다.
            qc.invalidateQueries({ queryKey: ["myInfo"] });
        }
    });
}