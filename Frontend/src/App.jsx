import React from 'react'
import Home from './home/Home'
import { Route, Routes } from "react-router-dom"
import Profiles from './profile/Profiles'
import Signup from './Components/Signup'
import VendorSignup from './Components/VendorSignup'
import Cart from './cart/Cart'
import UserDashboard from './dashboard/UserDashboard'
import FruitSection from './dashboard/FruitSection'
import VeggieSection from './dashboard/VeggieSection'
import VendorDashboard from '../vendordashboard/VendorDashboard'
import AboutUs from './Components/AboutUs'

function App() {
  return (<>
    {/* <Home />
    <Profile /> */}

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profiles />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/vendorsignup" element={<VendorSignup />} />
      <Route path="/userdashboard" element={<UserDashboard />} />
      <Route path="/fruitsection" element={<FruitSection />} />
      <Route path="/veggiesection" element={<VeggieSection />} />
      <Route path="/vendordashboard" element={<VendorDashboard />} />
    </Routes>
  </>
  )
}

export default App