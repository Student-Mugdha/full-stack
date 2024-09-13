import React from 'react'
import './cart.css'; // Import the CSS file

function Cart() {
    return (
        <>
            <div className="empty-cart-container">
                <h2 className="empty-cart-text">YOUR CART IS EMPTY</h2>
                <button className="shop-button">SHOP OUR PRODUCTS</button>
                <button className="buy-button">Procced to Buy</button>
            </div>
        </>
    )
}

export default Cart