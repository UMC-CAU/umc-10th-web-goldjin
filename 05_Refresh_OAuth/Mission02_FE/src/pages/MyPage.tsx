import { useEffect, useState } from "react";
import type { ResponseMyInfoDto } from "../types/auth";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const MyPage = () => {
    const [data, setData] = useState<ResponseMyInfoDto|null>(null);
    const {logout} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await getMyInfo();
                setData(response);

            } catch (error) {
                console.error("데이터를 가져오는 중 오류가 발생했습니다.", error);
            }
        };

        getData();

    }, []);

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return (
    <>
        {data?.data.name}<br />
        {data?.data.email}<br />
        <button className="w-40 h-40 text-black bg-green-100 cursor-pointer" onClick={handleLogout}>로그아웃</button>
    </>
    );
}
