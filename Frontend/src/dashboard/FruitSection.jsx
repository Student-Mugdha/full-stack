import React, { useState } from 'react';
import './FruitSection.css'; // CSS file for styling
import DashboardNavbar from './DasboardNavbar.jsx';

function FruitSection() {
    // State to store the quantity of each product
    const [orangeQuantity, setOrangeQuantity] = useState(1);
    const [papayaQuantity, setPapayaQuantity] = useState(1);
    const [mangoQuantity, setMangoQuantity] = useState(1);

    // Function to increase the quantity
    const increaseQuantity = (setQuantity, quantity) => {
        setQuantity(quantity + 1);
    };

    // Function to decrease the quantity (ensure it doesn't go below 1)
    const decreaseQuantity = (setQuantity, quantity) => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    return (
        <>
            <DashboardNavbar />
            <div className="product-page" style={{ backgroundColor: '#1D232A', minHeight: '100vh', padding: '2rem' }}>
                <h1 className="page-header" style={{ color: '#fff', textAlign: 'center', marginBottom: '2rem', fontSize: '2.5rem' }}>Our Products</h1>
                <div className="product-container">

                    {/* Product Card 1 - Orange */}
                    <div className="product-card">
                        <div className="product-image-container">
                            {/* Use actual product image here */}
                            <img src="\orange.png" alt="Orange" className="product-image" />
                        </div>
                        <div className="product-info">
                            <h2 className="product-title">Orange (Per 500 Grams)</h2>
                            <p className="product-price">
                                <span className="discounted-price">Rs. 70</span>
                                <span className="original-price">Rs. 95</span>
                            </p>
                            <div className="quantity-selector">
                                <button
                                    className="quantity-btn"
                                    onClick={() => decreaseQuantity(setOrangeQuantity, orangeQuantity)}
                                >
                                    -
                                </button>
                                <span>{orangeQuantity}</span>
                                <button
                                    className="quantity-btn"
                                    onClick={() => increaseQuantity(setOrangeQuantity, orangeQuantity)}
                                >
                                    +
                                </button>
                            </div>
                            <button className="add-to-cart-btn">Add to Cart</button>
                        </div>
                    </div>

                    {/* Product Card 2 - Papaya */}
                    <div className="product-card">
                        <div className="product-image-container">
                            {/* Use actual product image here */}
                            <img src="/papaya.png" alt="Papaya" className="product-image" />
                        </div>
                        <div className="product-info">
                            <h2 className="product-title">Papaya (Per Piece 1.2 KG)</h2>
                            <p className="product-price">
                                <span className="discounted-price">Rs. 120</span>
                                <span className="original-price">Rs. 155</span>
                            </p>
                            <div className="quantity-selector">
                                <button
                                    className="quantity-btn"
                                    onClick={() => decreaseQuantity(setPapayaQuantity, papayaQuantity)}
                                >
                                    -
                                </button>
                                <span>{papayaQuantity}</span>
                                <button
                                    className="quantity-btn"
                                    onClick={() => increaseQuantity(setPapayaQuantity, papayaQuantity)}
                                >
                                    +
                                </button>
                            </div>
                            <button className="add-to-cart-btn">Add to Cart</button>
                        </div>
                    </div>

                    <div className="product-card">
                        <div className="product-image-container">
                            {/* Use actual product image here */}
                            <img src="/mango.png" alt="Mango" className="product-image" />
                        </div>
                        <div className="product-info">
                            <h2 className="product-title">Mango (Per 1 KG)</h2>
                            <p className="product-price">
                                <span className="discounted-price">Rs. 925</span>
                                <span className="original-price">Rs. 1000</span>
                            </p>
                            <div className="quantity-selector">
                                <button
                                    className="quantity-btn"
                                    onClick={() => decreaseQuantity(setMangoQuantity, mangoQuantity)}
                                >
                                    -
                                </button>
                                <span>{mangoQuantity}</span>
                                <button
                                    className="quantity-btn"
                                    onClick={() => increaseQuantity(setMangoQuantity, mangoQuantity)}
                                >
                                    +
                                </button>
                            </div>
                            <button className="add-to-cart-btn">Add to Cart</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default FruitSection;
