import {CartDropdownContainer, CartItems, EmptyMessage} from './cart-dropdown.styles.jsx'

import {useContext} from "react";
import {useNavigate} from "react-router-dom";

import {CartContext} from "../../contexts/cart.context";

import Button from '../button/button.component'
import CartItem from "../cart-item/cart-item.component";

const CartDropdown = () => {
    const {cartItems, toggleStatus} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate("/checkout")
        toggleStatus()
    }

    return (
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? (cartItems.map((item) => (
                        <CartItem key={item.id} cartItem={item}/>
                    ))) : (
                        <EmptyMessage>Your cart is empty</EmptyMessage>
                    )
                }
            </CartItems>
            <Button onClick={goToCheckoutHandler}>
                Checkout
            </Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown