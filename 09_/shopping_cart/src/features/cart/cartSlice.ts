import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../../constants/cartItems";

export interface CartItemType {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
}

export interface CartState {
  cartItems: CartItemType[];
  totalAmount: number;
  totalPrice: number;
}

// 총 수량 및 총액을 계산하는 헬퍼 함수
const updateTotals = (state: CartState) => {
  let amount = 0;
  let total = 0;
  state.cartItems.forEach((item) => {
    amount += item.amount;
    total += item.amount * parseInt(item.price);
  });
  state.totalAmount = amount;
  state.totalPrice = total;
};

let initialTotalAmount = 0;
let initialTotalPrice = 0;

cartItems.forEach((item) => {
  initialTotalAmount += item.amount;
  initialTotalPrice += item.amount * parseInt(item.price);
});

const initialState: CartState = {
  cartItems: cartItems,
  totalAmount: initialTotalAmount,
  totalPrice: initialTotalPrice,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      updateTotals(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      updateTotals(state);
    },
    increase: (state, action: PayloadAction<string>) => {
      const cartItem = state.cartItems.find((item) => item.id === action.payload);
      if (cartItem) cartItem.amount += 1;
      updateTotals(state);
    },
    decrease: (state, action: PayloadAction<string>) => {
      const cartItem = state.cartItems.find((item) => item.id === action.payload);
      if (cartItem) {
        cartItem.amount -= 1;
        if (cartItem.amount === 0) {
          state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
        }
      }
      updateTotals(state);
    },
    calculateTotals: (state) => {
      updateTotals(state);
    },
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;