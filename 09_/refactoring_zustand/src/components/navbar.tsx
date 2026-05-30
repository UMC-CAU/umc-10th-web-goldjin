import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useCartStore } from "../zustand/store";


const Navbar = () => {
    const {totalAmount} = useCartStore();


    return (
        <div className="py-4 px-8 flex justify-between items-center bg-gray-700 text-white">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            <Link to="/" className="text-lg">
                <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
                <span>{totalAmount}</span>
            </Link>
        </div>
    )
}

export default Navbar;