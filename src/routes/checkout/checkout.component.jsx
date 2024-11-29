import {useContext} from "react";

import CheckoutItem from '../../components/checkout-item/checkout-item.component'

import './checkout.styles.scss'
import {CartContext} from "../../contexts/cart.context";

const Checkout = () => {
    const {cartItems} = useContext(CartContext)

    return (
        <div>
            {cartItems.map((item) =>
                <CheckoutItem key={item.id} item={item}/>
            )}
        </div>
    )
}

export default Checkout