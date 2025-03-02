import {useSelector, useDispatch} from 'react-redux'

import {selectCartItems} from "../../store/cart/cart.selector";

import {addItemToCart, decrementCartItem, removeItem} from "../../store/cart/cart.action";

import {
    CheckoutItemContainer,
    ImageContainer,
    Image,
    Name,
    Price,
    Quantity,
    Arrow,
    Value,
    RemoveButton
} from './checkout-item.styles.jsx'

const CheckoutItem = ({item}) => {
    const dispatch = useDispatch();

    const {imageUrl, name, price, quantity} = item
    const cartItems = useSelector(selectCartItems)

    const addItemHandler = () => dispatch(addItemToCart(cartItems, item))
    const decrementHandler = () => dispatch(decrementCartItem(cartItems, item))
    const removeHandler = () => dispatch(removeItem(cartItems, item))

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
            <Price>{price * quantity}</Price>
            <RemoveButton onClick={removeHandler}>
                &#10005;
            </RemoveButton>
        </CheckoutItemContainer>
    )
}

export default CheckoutItem