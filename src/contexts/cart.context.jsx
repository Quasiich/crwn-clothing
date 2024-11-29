import {createContext, useState, useEffect} from 'react';

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
    }
});


export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartItemCount, setCartItemCount] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartItemCount(newCartCount)
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

    const value = {isCartOpen, toggleStatus, addItemToCart, cartItems, cartItemCount, decrementCartItem, removeItem};

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
}