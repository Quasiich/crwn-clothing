import {createContext, useState, useEffect, useReducer} from 'react';

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

const removeFromCart = (cartItems, productToRemove) => {
    return cartItems.filter((cartItem) => cartItem.id !== productToRemove.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    toggleStatus: () => {
    },
    cartItems: [],
    addItemToCart: () => {
    },
    cartItemCount: 0,
    decrementCartItem: () => {
    },
    removeItem: () => {
    },
    totalPrice: 0
});

export const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            }
        default:
            throw new Error(`Unhandled action type ${type} in cartReducer`);
    }
}


const INITIAL_STATE = {
    totalPrice: 0,
    isCartOpen: false,
    cartItems: [],
    cartItemCount: 0,
}

export const CartProvider = ({children}) => {
    const [{totalPrice, isCartOpen, cartItems, cartItemCount}, dispatch] = useReducer(cartReducer, INITIAL_STATE)

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);

        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);


        dispatch({
            type: CART_ACTION_TYPES.SET_CART_ITEMS,
            payload: {
                cartItems: newCartItems,
                totalPrice: newCartTotal,
                cartItemCount: newCartCount
            }
        })
    }

    const toggleStatus = () => {
        dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: !isCartOpen})
    }

    const addItemToCart = (productToDecrement) => {
        const newCartItems = addCartItem(cartItems, productToDecrement)
        updateCartItemsReducer(newCartItems)
    }

    const decrementCartItem = (productToAdd) => {
        const newCartItems = removeCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems)
    }

    const removeItem = (productToRemove) => {
        const newCartItems = removeFromCart(cartItems, productToRemove)
        updateCartItemsReducer(newCartItems)
    }

    const value = {
        isCartOpen,
        toggleStatus,
        addItemToCart,
        cartItems,
        cartItemCount,
        decrementCartItem,
        removeItem,
        totalPrice,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}