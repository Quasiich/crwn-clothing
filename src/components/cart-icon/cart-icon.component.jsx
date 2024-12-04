import {useContext} from 'react'

import {CartContext} from "../../contexts/cart.context"

import {CartIconContainer, ItemCount, Icon} from './cart-icon.styles.jsx'

const CartIcon = () => {
    const {toggleStatus, cartItemCount} = useContext(CartContext)

    return (
        <CartIconContainer onClick={toggleStatus}>
            <Icon/>
            <ItemCount>{cartItemCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon