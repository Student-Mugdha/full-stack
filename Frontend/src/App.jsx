// App.jsx
import React, { useState } from 'react';
import Home from './home/Home';
import { Route, Routes } from "react-router-dom";
import Profiles from './profile/Profiles';
import Signup from './Components/Signup';
import VendorSignup from './Components/VendorSignup';
import Cart from './cart/Cart';
import UserDashboard from './dashboard/UserDashboard';
import FruitSection from './dashboard/FruitSection';
import VeggieSection from './dashboard/VeggieSection';
import VendorDashboard from '../vendordashboard/VendorDashboard';
import AboutUs from './Components/AboutUs';
import ViewOrders from '../vendordashboard/ViewOrders';
import AddProduct from '../vendordashboard/AddProduct';

function App() {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItem = prevItems.find(item => item.name === product.name);
            if (existingItem) {
                return prevItems.map(item => 
                    item.name === product.name 
                        ? { ...item, quantity: item.quantity + product.quantity } 
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: product.quantity }];
        });
    };

    const removeFromCart = (index) => {
        setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profiles />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/vendorsignup" element={<VendorSignup />} />
                <Route path="/userdashboard" element={<UserDashboard />} />
                <Route path="/fruitsection" element={<FruitSection addToCart={addToCart} />} />
                <Route path="/veggiesection" element={<VeggieSection addToCart={addToCart} />} />
                <Route path="/vendordashboard" element={<VendorDashboard />} />
                <Route path="/vieworders" element={<ViewOrders />} />
                <Route path="/add-product" element={<AddProduct />} />
            </Routes>
        </>
    );
}

export default App;
