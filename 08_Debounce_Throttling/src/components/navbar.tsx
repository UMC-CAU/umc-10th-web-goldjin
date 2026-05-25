import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { getMyInfo } from "../apis/auth";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faX } from "@fortawesome/free-solid-svg-icons";
import { useSearch } from "../contexts/searchContext";
export const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {

    const {isSearching, setIsSearching} = useSearch();

    const handleSearch = () => {
        setIsSearching(!isSearching)
    }

    const buttonClassName = ({ isActive }: { isActive: boolean }) => 
            `px-3 py-1 text-white ${isActive ? '' : 'rounded bg-pink-500'}`

    const {accessToken, logout} = useAuth();
    const [name, setName] = useState("");
    
    useEffect(() => {
        if (!accessToken) {
            return;
        }
        
        const getName = async () => {
            const {data} = await getMyInfo();
            setName(data.name);
        }

        getName();

    }, [accessToken])
    



    return (
        <div className="h-20 bg-[#151515] flex justify-between items-center">
            <header>
                <button className="m-4 cursor-pointer" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
                <Link to="/" className=" font-bold text-lg text-pink-500">돌려돌려 LP판</Link>
            </header>
            <div className="flex gap-4 pr-4">
                {!accessToken && (
                    <>
                        <NavLink to='/login' className={buttonClassName}>로그인</NavLink>
                        <NavLink to='/signup' className={buttonClassName}>회원가입</NavLink>
                    </>
                )}
                {accessToken && (
                    <>
                        <p>
                            <button onClick = {handleSearch}><FontAwesomeIcon icon={isSearching? faX : faMagnifyingGlass} className="mr-2 cursor-pointer"/></button>
                            {name}님 환영합니다!
                        </p>
                        <button onClick={logout} className="cursor-pointer" >
                            로그아웃
                        </button>
                    </> 
                )}
            </div>
        </div>
    )
}