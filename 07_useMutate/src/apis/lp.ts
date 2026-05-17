import type { CommentDto, PaginationDto } from "../types/common";
import type { requestLpDto, responseCommentsDto, responseLpDetailDto, responseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";



export const getLpList = async (paginationDto: PaginationDto): Promise<responseLpListDto> => {
    const {data} = await axiosInstance.get("/v1/lps", { params: paginationDto });
    return data;
};

export const getLpDetail = async (lpid: number): Promise<responseLpDetailDto> => {
    const {data} = await axiosInstance.get(`/v1/lps/${lpid}`);
    return data;
}

export const likeLp = async (lpid: number) => {
    await axiosInstance.post(`/v1/lps/${lpid}/likes`);
}

export const unlikeLp = async (lpid: number) => {
    await axiosInstance.delete(`/v1/lps/${lpid}/likes`);
}

export const getComments = async (commentDto: CommentDto): Promise<responseCommentsDto> => {
    const {data} = await axiosInstance.get(`/v1/lps/${commentDto.lpId}/comments`, { params: commentDto });
    return data;
}

export const postLp = async (requestLpDto: requestLpDto) => {
    const { data } = await axiosInstance.post("/v1/lps", requestLpDto);
    return data;
}

export const postComment = async (commentData: { lpId: number; content: string }) => {
    const { data } = await axiosInstance.post(`/v1/lps/${commentData.lpId}/comments`, { content: commentData.content });
    return data;
}

export const updateComment = async ({ lpId, commentId, content }: { lpId: number; commentId: number; content: string }) => {
    const { data } = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, { content });
    return data;
}
