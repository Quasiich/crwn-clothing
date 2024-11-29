import {useContext} from 'react'
import {CartContext} from "../../contexts/cart.context";

const CheckoutItem = ({item}) => {
    const {imageUrl, name, price, quantity} = item
    const {addItemToCart} = useContext(CartContext)

    return (
        <div>
            <img src={imageUrl} alt={item.name}/>
            <span>{name}</span>
            <div>
                <span>{'<'}</span>
                <span>{quantity}</span>
                <span onClick={() => addItemToCart(item)}>{'>'}</span>
            </div>
            <span>{price}</span>
        </div>
    )
}

export default CheckoutItem