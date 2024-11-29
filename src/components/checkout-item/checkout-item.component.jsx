import {useState} from 'react'

const CheckoutItem = ({item}) => {
    const {imageUrl, name, price, quantity} = item

    return (
        <div>
            <img src={imageUrl} alt={item.name}/>
            <span>{name}</span>
            <div>
                <span>{'<'}</span>
                <span>{quantity}</span>
                <span>{'>'}</span>
            </div>
            <span>{price}</span>
        </div>
    )
}

export default CheckoutItem