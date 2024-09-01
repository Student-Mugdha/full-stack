import React from 'react'
import Home from './home/Home'
import { Route, Routes } from "react-router-dom"
import Profiles from './profile/Profiles'
import Signup from './Components/Signup'

function App() {
  return (<>
    {/* <Home />
    <Profile /> */}

    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/profile" element={<Profiles />}/>
      <Route path="/signup" element={<Signup />}/>
    </Routes>
  </>
  )
}

export default App