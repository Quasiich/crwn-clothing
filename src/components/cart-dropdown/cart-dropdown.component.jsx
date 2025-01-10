import {CartDropdownContainer, CartItems, EmptyMessage} from './cart-dropdown.styles.jsx'

import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import Button from '../button/button.component'
import CartItem from "../cart-item/cart-item.component";
import {selectCartItems, selectIsCartOpen} from "../../store/cart/cart.selector";
import {setIsCartOpen} from "../../store/cart/cart.action";

const CartDropdown = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const isCartOpen = useSelector(selectIsCartOpen);
    const navigate = useNavigate();

    const goToCheckoutHandler = () => {
        navigate("/checkout")
        dispatch(setIsCartOpen(!isCartOpen));
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