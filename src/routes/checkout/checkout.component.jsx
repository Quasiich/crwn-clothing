import {useSelector} from 'react-redux'

import CheckoutItem from '../../components/checkout-item/checkout-item.component'
import {selectCartItems, selectCartTotal} from "../../store/cart/cart.selector";

import './checkout.styles.scss'

const Checkout = () => {
    const cartItems = useSelector(selectCartItems)
    const totalPrice = useSelector(selectCartTotal)

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {cartItems.map((item) =>
                <CheckoutItem key={item.id} item={item}/>
            )}
            <span className={'total'}>Total: ${totalPrice}</span>
        </div>
    )
}

export default Checkout