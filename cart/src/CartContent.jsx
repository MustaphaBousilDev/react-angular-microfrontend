import React, {useState, useEffect} from 'react'
import { login , jwt} from './cart'
import Login from './Login'
import MiniCart from './MiniCart'
const CartContent = () => {
  const [token, setToken] = useState("")
  
  return (
    <div>
        <div>
            JWT: {token}
        </div>
        <Login/>
        <MiniCart />
    </div>
  )
}

export default CartContent