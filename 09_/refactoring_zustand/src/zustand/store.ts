import { create } from "zustand";
import cartItems from "../constants/cartItems";

interface ModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

export interface CartItemType {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
}

interface CartState {
  cartItems: CartItemType[];
  totalAmount: number;
  totalPrice: number;
  clearCart: () => void;
  removeItem: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  calculateTotals: () => void;
}

let initialTotalAmount = 0;
let initialTotalPrice = 0;

cartItems.forEach((item) => {
  initialTotalAmount += item.amount;
  initialTotalPrice += item.amount * parseInt(item.price);
});

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: cartItems,
  totalAmount: initialTotalAmount,
  totalPrice: initialTotalPrice,

  calculateTotals: () => {
    const { cartItems } = get();
    let amount = 0;
    let total = 0;
    cartItems.forEach((item) => {
      amount += item.amount;
      total += item.amount * parseInt(item.price);
    });
    set({ totalAmount: amount, totalPrice: total });
  },

  clearCart: () => {
    set({ cartItems: [] });
    get().calculateTotals();
  },

  removeItem: (id) => {
    set((state) => ({ cartItems: state.cartItems.filter((item) => item.id !== id) }));
    get().calculateTotals();
  },

  increase: (id) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) => (item.id === id ? { ...item, amount: item.amount + 1 } : item)),
    }));
    get().calculateTotals();
  },

  decrease: (id) => {
    set((state) => ({
      cartItems: state.cartItems.map((item) => (item.id === id ? { ...item, amount: item.amount - 1 } : item)).filter((item) => item.amount > 0),
    }));
    get().calculateTotals();
  },
}));
