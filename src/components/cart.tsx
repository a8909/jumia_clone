import React, { useEffect, useState } from 'react'
import { getProductValue } from '../services/localStorage'
import { allProduct } from '../interfaces/allCategories'
import SingleCart from './singleCart'

const Cart = () => {
    const [updatedCart, setUpdatedCart] = useState<allProduct[]>([])
    const handleAdd = ()=>{}
    const handleSubtract = ()=>{}
    const handleDelete = ()=>{}

    const getCartList = () =>{
      const cartData: allProduct[] = getProductValue("PRODUCTITEMS");
      setUpdatedCart(cartData);
      console.log(cartData)
    }
    useEffect(()=>{
      getCartList();
    },[])
  return (
    <React.Fragment>
        {updatedCart.map((storedCart, index)=><SingleCart
        key={index} 
        productImage={storedCart.images[0]}
        productTitle={storedCart.title}
        productAdd={handleAdd}
        productSubtract={handleSubtract}
        productDelete={handleDelete}
        productPrice={storedCart.price}
        />)}
    </React.Fragment>
  )
}

export default Cart