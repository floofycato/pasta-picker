import React, { useState } from 'react';

const ChangeQuantity = () => {
    const [quantity, setQuantity] = useState(0);

    const increaseQty = () => {
        setQuantity(quantity + 1);
    };

    const decreaseQty = () => {
        setQuantity(quantity - 1);
    };

    return (
        <div className="quantity-container">
            <button onClick={decreaseQty}>-</button>
            <p>{quantity}</p>
            <button onClick={increaseQty}>+</button>
        </div>
    )
}

export default ChangeQuantity;