import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      //Payloan needs to be = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //Payload needs to be = pizzaId
      state.cart = state.cart.filter(item => item.pizzaId !== action.payload);
    },
    increseItemQuantity(state, action) {
      //Payload need to be = pizzId
      const item = state.cart.find(item => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      //Payload need to be = pizzId
      const item = state.cart.find(item => item.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      //Small trick to call the other action from here
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

//GET FUNCTION TO ACCESS THE DATA EASILY IN THE COMPONENTS
export const getCart = state => state.cart.cart;

export const getTotalCartPrice = state =>
  state.cart.cart.reduce((acc, crr) => acc + crr.unitPrice * crr.quantity, 0);

export const getTotalCartQuantity = state =>
  state.cart.cart.reduce((acc, crr) => acc + crr.quantity, 0);

export const getCurrentQuantityById = id => state =>
  state.cart.cart.find(item => item.pizzaId === id)?.quantity ?? 0;

export default cartSlice.reducer;
