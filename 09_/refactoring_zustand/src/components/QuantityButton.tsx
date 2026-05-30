import { useCartStore } from "../zustand/store";


const QuantityButton = ({ id, amount }: { id: string; amount: number }) => {
    const buttonStyle = "bg-gray-300 py-1 px-3 cursor-pointer "
    const {increase, decrease} = useCartStore();


    return (
        <div className="flex items-center">
            <button onClick={() => decrease(id)} className={buttonStyle + "rounded-l"}>-</button>
            <span className="border border-gray-300 py-1 px-3">{amount}</span>
            <button onClick={() => increase(id)} className={buttonStyle + "rounded-r"}>+</button>
        </div>
    )
}

export default QuantityButton;