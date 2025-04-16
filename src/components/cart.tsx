import React, { useEffect, useState } from 'react'
import { getProductValue, productValue } from '../services/localStorage'
import { allProduct } from '../interfaces/allCategories'
import SingleCart from './singleCart'
import HomeLayout from './homeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { productDelete, setProduct } from '../state/slice/productSlice'
import { dismiss } from '../state/slice/modalSlice'
import { RootState } from '../state/store'
import LoadingSpinner from '../sharedComponents/loadingSpinner'

const Cart = () => {
    const [updatedCart, setUpdatedCart] = useState<allProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [existedCartCount, setExistedCartCount] = useState<number>(0);
    const dispatch = useDispatch();
    const closeModal = useSelector((state: RootState) => state.dismissModal.closeModal);
    const product = useSelector((state: RootState) => state.productReducer.product);
    let close = closeModal;

    const handleAdd = (index: number)=>{
      const singleCart = updatedCart[index];
      setExistedCartCount(oldCount => oldCount + 1);
      setUpdatedCart([...updatedCart, singleCart]);
    }

    const handleDelete = (cartId: number) => {
        dispatch(productDelete(cartId));
        productValue("PRODUCTITEMS", JSON.stringify(product));
    }
    const handleSubtract = ()=>{}

    const getCartList = () =>{
      setIsLoading(true);
      const cartData: allProduct[] =  getProductValue("PRODUCTITEMS");
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
      setIsLoading(false);
    }

    const getUpdatedCart = (): allProduct[] =>{
      let newlyUpdatedCart = product ;
      if(newlyUpdatedCart.length === 0){
        newlyUpdatedCart = getProductValue("PRODUCTITEMS");
      }
      return newlyUpdatedCart;
    }
    useEffect(()=>{
      getCartList();
    },[product])

    // useEffect(()=>{
    //     setUpdatedCart(getUpdatedCart());
    //     return ()=>{}
    // },[product])
  return (
    <HomeLayout onSearch={console.log}>
      {isLoading && <LoadingSpinner />}
      { !isLoading && <div onClick={() => dispatch(dismiss(!close))}>
        {updatedCart.length !== 0 &&
          updatedCart.map((storedCart, index) => (
            <SingleCart
              key={index}
              productImage={storedCart.images[0]}
              productTitle={storedCart.title}
              productAdd={() => handleAdd(index)}
              productCount={existedCartCount}
              productSubtract={handleSubtract}
              productDelete={() => handleDelete(storedCart.id)}
              productPrice={storedCart.price}
            />
          ))}
        {( !updatedCart.length ) && (
          <h4 className="text-center">No cart has been added. </h4>
        )}
      </div>}
    </HomeLayout>
  );
}

export default Cart