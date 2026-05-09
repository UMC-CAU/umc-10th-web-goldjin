import { createContext, useContext, useState, type PropsWithChildren } from "react"
import type { RequestSigninDto } from "../types/auth"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { LOCAL_STORAGE_KEY } from "../constants/key"
import { postSignin, postSignout } from "../apis/auth"

interface AuthContextType {
    accessToken: string | null
    refreshToken: string | null
    login: (signindata: RequestSigninDto) => Promise<void>
    logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    refreshToken: null,
    login: async () => {},
    logout: async () => {}
})

export const AuthProvider = ({children}: PropsWithChildren) => {
    const { getItem: getAccessToken, setItem: setAccessTokenInStorage, removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const { getItem: getRefreshToken, setItem: setRefreshTokenInStorage, removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

    const [accessToken, setAccessToken] = useState<string | null>(getAccessToken());
    const [refreshToken, setRefreshToken] = useState<string | null>(getRefreshToken());

    const login = async (signinData: RequestSigninDto) => {
        try {
            const {data} = await postSignin(signinData);
            setAccessTokenInStorage(data.accessToken);
            setRefreshTokenInStorage(data.refreshToken);
            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
        } catch (error) {
            console.error("로그인 중 오류가 발생했습니다.", error);
        }

    };

    const logout = async () => {
        try {
            await postSignout();
            removeAccessToken();
            removeRefreshToken();
            setAccessToken(null);
            setRefreshToken(null);
        } catch (error) {
            console.error("로그아웃 중 오류가 발생했습니다.", error);
        }
    };

    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth는 AuthProvider 내에서 사용되어야 합니다.");
    }
    
    return context;
}
