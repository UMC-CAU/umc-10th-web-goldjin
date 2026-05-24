import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeLp, unlikeLp } from "../../apis/lp";

export const useLike = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationKey: ["likeToggle"],
    
    mutationFn: async ({ lpId, isLiked }: { lpId: number; isLiked: boolean }) => {
      if (isLiked) {
        return unlikeLp(lpId); 
      } else {
        return likeLp(lpId);   
      }
    },
    

    onMutate: async ({ lpId, isLiked }) => {
      await qc.cancelQueries({ queryKey: ["lps", lpId] });

      const previousLpDetail = qc.getQueryData(["lps", lpId]);

      qc.setQueryData(["lps", lpId], (old: any) => {
        if (!old) return old;
        
        const updatedLikes = isLiked
          ? old.data.likes.slice(0, -1)
          : [...old.data.likes, { userId: "temp-id" }];
          
        return {
          ...old,
          data: {
            ...old.data,
            likes: updatedLikes,
          },
        };
      });

      return { previousLpDetail };
    },

    onError: (err, { lpId }, context) => {
      if (context?.previousLpDetail) {
        qc.setQueryData(["lps", lpId], context.previousLpDetail);
      }
      alert("좋아요 처리에 실패했습니다. 다시 시도해 주세요.");
    },

    onSettled: (data, error, { lpId }) => {
      qc.invalidateQueries({ queryKey: ["lps", lpId] });
      qc.invalidateQueries({ queryKey: ["lps"] });
    },
  });
};