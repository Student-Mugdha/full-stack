import React, { useState } from 'react';
import './VeggieSection.css'; // CSS remains the same

function VeggieSection() {
    // State to store the quantity of each vegetable (can be expanded for other veggies)
    const [carrotQuantity, setCarrotQuantity] = useState(1);
    const [broccoliQuantity, setBroccoliQuantity] = useState(1);

    // Function to increase quantity
    const increaseQuantity = (setQuantity, quantity) => {
        setQuantity(quantity + 1);
    };

    // Function to decrease quantity (make sure it doesn't go below 1)
    const decreaseQuantity = (setQuantity, quantity) => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <>
            <div className="veggies-page" style={{ backgroundColor: '#1D232A', minHeight: '100vh', padding: '2rem' }}>
                <h1 className="page-header" style={{ color: '#fff', textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem' }}>Fresh Vegetables</h1>
                <div className="veggies-container">

                    {/* Veggies Card 1 (Carrots) */}
                    <div className="veggies-card">
                        <div className="veggies-image-container">
                            <img src="/carrot.png" alt="Carrots" className="veggies-image" />
                        </div>
                        <div className="veggies-info">
                            <h2 className="veggies-title">Carrots (Per 1 KG)</h2>
                            <p className="veggies-price">
                                <span className="discounted-price">Rs. 50</span>
                                <span className="original-price">Rs. 70</span>
                            </p>
                            <div className="quantity-selector">
                                <button
                                    className="quantity-btn"
                                    onClick={() => decreaseQuantity(setCarrotQuantity, carrotQuantity)}
                                >-</button>
                                <span>{carrotQuantity}</span>
                                <button
                                    className="quantity-btn"
                                    onClick={() => increaseQuantity(setCarrotQuantity, carrotQuantity)}
                                >+</button>
                            </div>
                            <button className="add-to-cart-btn">Add to Cart</button>
                        </div>
                    </div>

                    {/* Veggies Card 2 (Broccoli) */}
                    <div className="veggies-card">
                        <div className="veggies-image-container">
                            <img src="/broccoli.png" alt="Broccoli" className="veggies-image" />
                        </div>
                        <div className="veggies-info">
                            <h2 className="veggies-title">Broccoli (Per Piece 500g)</h2>
                            <p className="veggies-price">
                                <span className="discounted-price">Rs. 80</span>
                                <span className="original-price">Rs. 100</span>
                            </p>
                            <div className="quantity-selector">
                                <button
                                    className="quantity-btn"
                                    onClick={() => decreaseQuantity(setBroccoliQuantity, broccoliQuantity)}
                                >-</button>
                                <span>{broccoliQuantity}</span>
                                <button
                                    className="quantity-btn"
                                    onClick={() => increaseQuantity(setBroccoliQuantity, broccoliQuantity)}
                                >+</button>
                            </div>
                            <button className="add-to-cart-btn">Add to Cart</button>
                        </div>
                    </div>

                    {/* Add more veggie cards here */}

                </div>
            </div>
        </>
    );
}

export default VeggieSection;
