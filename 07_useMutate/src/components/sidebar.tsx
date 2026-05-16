import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";


export const Sidebar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {

    return (
        <div className="w-full h-screen bg-[#151515] p-4 flex flex-col justify-between">
            <ul>
                <li className="mb-5 text-sm"><Link to="/find" onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="mr-2"/>
                    LP 목록
                </Link></li>
                <li className="mb-5 text-sm"><Link to="/my">
                    <FontAwesomeIcon icon={faUser} className="mr-2"/>
                    마이페이지
                </Link></li>
            </ul>
            <Link to="/signout" className="text-sm text-gray-400 text-center">
                회원탈퇴
            </Link>
        </div>
    )
}