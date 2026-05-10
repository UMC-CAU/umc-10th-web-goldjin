import { Link, NavLink } from "react-router-dom"

export const Navbar = () => {

    const buttonClassName = ({ isActive }: { isActive: boolean }) => 
            `px-3 py-1 text-white ${isActive ? '' : 'rounded bg-pink-500'}`
    

    return (
        <div className="h-20 bg-[#151515] flex justify-between items-center">
            <Link to="/" className="pl-4 font-bold text-lg text-pink-500">돌려돌려 LP판</Link>
            <div className="flex gap-4 pr-4">
                <NavLink to='/login' className={buttonClassName}>로그인</NavLink>
                <NavLink to='/signup' className={buttonClassName}>회원가입</NavLink>
            </div>
        </div>
    )
}