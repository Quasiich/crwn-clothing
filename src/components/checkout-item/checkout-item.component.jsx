import {useContext} from 'react'
import {CartContext} from "../../contexts/cart.context";

import {CheckoutItemContainer, ImageContainer, Image, Name, Price, Quantity, Arrow, Value, RemoveButton} from './checkout-item.styles.jsx'

const CheckoutItem = ({item}) => {
    const {imageUrl, name, price, quantity} = item
    const {addItemToCart, decrementCartItem, removeItem} = useContext(CartContext)

    const addItemHandler = () => addItemToCart(item)
    const decrementHandler = () => decrementCartItem(item)
    const removeHandler = () => removeItem(item)

    return (
        <CheckoutItemContainer>
            <ImageContainer>
                <Image src={imageUrl} alt={item.name}/>
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity>
                <Arrow onClick={decrementHandler}>&#10094;</Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addItemHandler}>&#10095;</Arrow>
            </Quantity>
            <Price>{price}</Price>
            <RemoveButton onClick={removeHandler}>
                &#10005;
            </RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem