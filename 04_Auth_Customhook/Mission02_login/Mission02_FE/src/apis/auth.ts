import * as from "axios";
import type { RequestSigninDto, RequestSignupDto, ResponseSigninDto } from "../types/auth";

export const postSignup = async (body: RequestSignupDto) => {
    const { data } = axios.post(
        'http://localhost:8000/v1/auth/signup', 
        body
    );

    return data;
};


export const postSignin = async (
    body: RequestSigninDto,
): Promise<ResponseSigninDto> => {
    const { data } = await axios.post(
        import.meta.env.VITE_APP_BASE_URL + "/v1/auth/signin",
    body,
    );

    return data;
}