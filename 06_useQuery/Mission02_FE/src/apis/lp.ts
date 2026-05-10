import type { PaginationDto } from "../types/common";
import type { responseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";


export const getLpList = async (paginationDto: PaginationDto): Promise<responseLpListDto> => {
    const {data} = await axiosInstance.get("/v1/lps", { params: paginationDto });
    return data;
};