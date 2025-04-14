import React, { useEffect, useState } from 'react'
import { getProductValue } from '../services/localStorage'
import { allProduct } from '../interfaces/allCategories'
import SingleCart from './singleCart'
import HomeLayout from './homeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { productDelete } from '../state/slice/productSlice'
import { dismiss } from '../state/slice/modalClose'
import { RootState } from '../state/store'

const Cart = () => {
    const [updatedCart, setUpdatedCart] = useState<allProduct[]>([]);
    const [existedCartCount, setExistedCartCount] = useState<number>(0);
    const dispatch = useDispatch();
    const closeModal = useSelector((state: RootState) => state.dismissModal.closeModal)


    const handleAdd = (index: number)=>{
      const singleCart = updatedCart[index];
      setExistedCartCount(oldCount => oldCount + 1);
      setUpdatedCart([...updatedCart, singleCart]);
    }
    const handleSubtract = ()=>{}
    
    const handleModalEvent = () => {
      dispatch(dismiss(false));
    };

    const getCartList = () =>{
      const cartData: allProduct[] = getProductValue("PRODUCTITEMS");
      const newCart: allProduct[] = [];
      if(cartData){
        cartData.forEach((cart) => {
          const existedCart = newCart.findIndex(cartItem => cartItem.id === cart.id);
          if(existedCart !== -1){ // if no duplicate record found 
            setExistedCartCount(existedCart);
          }else{
            newCart.push({ ...cart });
          }
        })
      }
      setUpdatedCart(newCart);
    }
    useEffect(()=>{
      getCartList();
    },[])
  return (
    <HomeLayout onSearch={console.log} closeModal={closeModal}>
      <div onClick={handleModalEvent}>
        {updatedCart.length !== 0 &&
          updatedCart.map((storedCart, index) => (
            <SingleCart
              key={index}
              productImage={storedCart.images[0]}
              productTitle={storedCart.title}
              productAdd={() => handleAdd(index)}
              productCount={existedCartCount}
              productSubtract={handleSubtract}
              productDelete={() => dispatch(productDelete(storedCart.id))}
              productPrice={storedCart.price}
            />
          ))}
        {updatedCart.length === 0 && <h4 className="text-center">No cart has been added. </h4>}
      </div>
    </HomeLayout>
  );
}

export default Cart