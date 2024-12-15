import {useContext} from 'react'

import {CartContext} from "../../contexts/cart.context"

import {CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles.jsx'

const CartIcon = () => {
    const {toggleStatus, cartItemCount} = useContext(CartContext)

    return (
        <CartIconContainer onClick={toggleStatus}>
            <ShoppingIcon/>
            <ItemCount>{cartItemCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon