import type { CommentDto, PaginationDto } from "../types/common";
import type { responseCommentsDto, responseLpDetailDto, responseLpListDto } from "../types/lp";
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