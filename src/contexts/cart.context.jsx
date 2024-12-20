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
    SET_TOTAL_PRICE: 'SET_TOTAL_PRICE',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_ITEM_COUNT: 'SET_CART_ITEM_COUNT',
}

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_TOTAL_PRICE:
            return {
                ...state,
                totalPrice: payload,
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                cartItems: payload,
            }
        case CART_ACTION_TYPES.SET_CART_ITEM_COUNT:
            return {
                ...state,
                cartItemCount: payload,
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

    const setTotalPrice = (total) => {
        dispatch({type: CART_ACTION_TYPES.SET_TOTAL_PRICE, payload: total})
    }

    const setIsCartOpen = (isCartOpen) => {
        dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: isCartOpen})
    }

    const setCartItems = (cartItems) => {
        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: cartItems})
    }

    const setCartItemCount = (cartItemCount) => {
        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEM_COUNT, payload: cartItemCount})
    }

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartItemCount(newCartCount)
    }, [cartItems])

    useEffect(() => {
        let total = 0
        for (const item of cartItems) {
            total = total + (item.price * item.quantity)
        }
        setTotalPrice(total)
    }, [cartItems])

    const toggleStatus = () => {
        setIsCartOpen(!isCartOpen)
    }

    const addItemToCart = (productToDecrement) => {
        setCartItems(addCartItem(cartItems, productToDecrement))
    }

    const decrementCartItem = (productToAdd) => {
        setCartItems(removeCartItem(cartItems, productToAdd))
    }

    const removeItem = (productToRemove) => {
        setCartItems(removeFromCart(cartItems, productToRemove))
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
        setTotalPrice
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}