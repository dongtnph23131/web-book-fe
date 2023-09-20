import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cartNoLogin',
    initialState: {
        items: [],
    },
    reducers: {
        addItem: (state, action) => {
            const item = state.items.find(item => item.productId === action.payload.productId)
            if (item) {
                const updateItem = { ...item, quantity: item.quantity + 1 }
                state.items = state.items.map((item) => item.productId === action.payload.productId ? updateItem : item)
            }
            else {
                state.items.push(action.payload)
            }
        },
        removeItemNoLogin: (state, action) => {
            const item = state.items.find(item => item.productId === action.payload.productId)
            if (item.quantity > 1) {
                const updateItem = { ...item, quantity: item.quantity - 1 }
                state.items = state.items.map((item) => item.productId === action.payload.productId ? updateItem : item)
            }
            else {
                state.items = state.items.filter(item => item.productId !== action.payload.productId)
            }
        },
        remove:(state,action)=>{
            state.items=state.items.filter(item=>item.productId!==action.payload.productId)
        },
        clearCart:(state)=>{
            state.items=[]
        }
    }
})
export const { addItem,removeItemNoLogin,updateItem,remove,clearCart } = cartSlice.actions
export default cartSlice