import {useContext} from 'react'
import {CartContext} from "../../contexts/cart.context";

import './checkout-item.styles.scss'

const CheckoutItem = ({item}) => {
    const {imageUrl, name, price, quantity} = item
    const {addItemToCart, decrementCartItem, removeItem} = useContext(CartContext)

    const addItemHandler = () => addItemToCart(item)
    const decrementHandler = () => decrementCartItem(item)
    const removeHandler = () => removeItem(item)

    return (
        <div className="checkout-item-container">
            <div className={'image-container'}>
                <img src={imageUrl} alt={item.name}/>
            </div>
            <span className={'name'}>{name}</span>
            <span className={'quantity'}>
                <div className='arrow' onClick={decrementHandler}>&#10094;</div>
                <span className={'value'}>{quantity}</span>
                <div className={'arrow'} onClick={addItemHandler}>&#10095;</div>
            </span>
            <span className="price">{price}</span>
            <div className="remove-button" onClick={removeHandler}>
                &#10005;
            </div>
        </div>
    )
}

export default CheckoutItem