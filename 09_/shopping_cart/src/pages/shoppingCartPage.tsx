import { useDispatch, useSelector } from "react-redux"
import QuantityButton from "../components/QuantityButton"
import { clearCart, type CartItemType } from "../features/cart/cartSlice";
import { closeModal, openModal } from "../features/modal/modalSlice";

export const ShoppingCartPage = () => {

    const {cartItems} = useSelector((state: any) => state.cart);
    const {isOpen} = useSelector((state: any) => state.modal);
    const dispatch = useDispatch();


    return (
    <>
        {
            isOpen && (
                <>
                <div 
                    className="fixed inset-0 backdrop-blur-sm z-40"
                    onClick={() => dispatch(closeModal())}
                ></div>
                
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-xl z-50 flex flex-col items-center">
                    <p className="mb-6 text-lg font-semibold">정말 삭제하시겠습니까?</p>
                    <div className="flex gap-4">
                        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={() => dispatch(closeModal())}>아니요</button>
                        <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => { dispatch(clearCart()); dispatch(closeModal()); }}>삭제</button>
                    </div>
                </div>
                </>
            )
        }
        {cartItems.map((item: CartItemType, idx: number) => (
            <div key={idx} className="flex items-center my-4 border-b border-gray-300 pb-8">
                <div className="w-24 h-24 rounded-md overflow-hidden mr-4">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col flex-1">
                    <p className="font-bold text-xl">{item.title}</p>
                    <p className="text-gray-500 text-sm">{item.singer}</p>
                    <p className="text-gray-800 text-md font-bold">\{item.price}</p>
                </div>
                <QuantityButton id={item.id} amount={item.amount} />
            </div>
        ))}
        
        
        <footer className="flex justify-center items-center">
            <button className="p-4 rounded-lg border-2  border-gray-800 text-gray-800 text-lg font-bold"
            onClick = {() => dispatch(openModal())}>
                전체 삭제   
            </button>
        </footer>
    </>
    )
}