import {CART_ACTION_TYPES} from "./cart.types";
import {createAction} from "../../utils/reducer/reducer.utils";


const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id ?
                {
                    ...cartItem, quantity: cartItem.quantity + 1
                } : cartItem
        )
    }

    return [...cartItems, {...productToAdd, quantity: 1}]
}

const removeCartItem = (cartItems, productToDecrement) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToDecrement.id
    );

    if (existingCartItem.quantity > 1) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToDecrement.id ?
                {
                    ...cartItem, quantity: cartItem.quantity - 1
                } : cartItem
        )
    }

    return cartItems.filter((cartItem) => cartItem.id !== productToDecrement.id);
}

export const setIsCartOpen = (boolean) => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
}

const removeFromCart = (cartItems, productToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
}

export const addItemToCart = (cartItems, productToDecrement) => {
    const newCartItems = addCartItem(cartItems, productToDecrement)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const decrementCartItem = (cartItems, productToAdd) => {
    const newCartItems = removeCartItem(cartItems, productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

export const removeItem = (cartItems, productToRemove) => {
    const newCartItems = removeFromCart(cartItems, productToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}