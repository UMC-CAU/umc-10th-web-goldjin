import { useDispatch } from "react-redux";
import { increase, decrease } from "../features/cart/cartSlice";

const QuantityButton = ({ id, amount }: { id: string; amount: number }) => {
    const buttonStyle = "bg-gray-300 py-1 px-3 cursor-pointer "
    const dispatch = useDispatch();

    return (
        <div className="flex items-center">
            <button onClick={() => dispatch(decrease(id))} className={buttonStyle + "rounded-l"}>-</button>
            <span className="border border-gray-300 py-1 px-3">{amount}</span>
            <button onClick={() => dispatch(increase(id))} className={buttonStyle + "rounded-r"}>+</button>
        </div>
    )
}

export default QuantityButton;