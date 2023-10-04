import React, {useState, useEffect} from 'react'
import { login , jwt} from './cart'
import Login from './Login'
const CartContent = () => {
  const [token, setToken] = useState("")
  
  return (
    <div>
        <div>
            JWT: {token}
        </div>
        <Login/>
    </div>
  )
}

export default CartContent