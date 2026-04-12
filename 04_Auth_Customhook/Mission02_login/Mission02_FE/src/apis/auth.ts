import type { RequestSigninDto, RequestSignupDto, ResponseSigninDto } from "../types/auth";
import { axiosInstance } from "./axios";

export const postSignup = async (body: RequestSignupDto) => {
    const { data } = await axiosInstance.post("/v1/auth/signup", body);

    return data;
};


export const postSignin = async (
    body: RequestSigninDto,
): Promise<ResponseSigninDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signin", body);
    return data;
}

export const getMyInfo = async () => {
    const { data } = await axiosInstance.get("/v1/auth/me");
    return data;
}