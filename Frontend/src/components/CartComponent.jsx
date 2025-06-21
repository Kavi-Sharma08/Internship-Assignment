import Cart from './Cart'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
const CartComponent = () => {
    const items = useSelector((store)=>store.cart.items)
    useEffect(()=>{} , [items])
  return (
    <Cart data = {items}/>
  )
}

export default CartComponent