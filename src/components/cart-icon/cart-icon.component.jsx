import {useContext} from 'react'

import {ReactComponent as ShoppingIcon} from "../../assets/shopping-bag.svg";

import {CartContext} from "../../contexts/cart.context"

import './cart-icon.styles.scss'

const CartIcon = () => {
    const {toggleStatus, cartItemCount} = useContext(CartContext)

    return (
        <div className="cart-icon-container" onClick={toggleStatus}>
            <ShoppingIcon className="shopping-icon"/>
            <span className="item-count">{cartItemCount}</span>
        </div>
    )
}

export default CartIcon