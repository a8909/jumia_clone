import React, { useEffect, useState } from 'react'
import { getProductValue, productValue } from '../services/localStorage'
import { allProduct } from '../interfaces/allCategories'
import SingleCart from './singleCart'
import HomeLayout from './homeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { productAdd, productDelete, productSubtract, setProduct } from '../state/slice/productSlice'
import { dismiss } from '../state/slice/modalSlice'
import { RootState } from '../state/store'
import LoadingSpinner from '../sharedComponents/loadingSpinner'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const [updatedCart, setUpdatedCart] = useState<allProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState('');
    const [existedCartCount, setExistedCartCount] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const dispatch = useDispatch();
    const closeModal = useSelector((state: RootState) => state.dismissModal.closeModal);
    const product = useSelector((state: RootState) => state.productReducer.product);
    let close = closeModal;
    const navigate = useNavigate();

    const handleAdd = (index: number)=>{
      const singleCart = updatedCart[index];
      setExistedCartCount(oldCount => oldCount + 1);
      dispatch(productAdd(singleCart));
      productValue("PRODUCTITEMS", JSON.stringify(product));
    }

    const handleDelete = (cartId: number) => {
        dispatch(productDelete(cartId));
        productValue("PRODUCTITEMS", JSON.stringify(product));
    }
    const handleSubtract = (index: number)=>{
       const singleCart = updatedCart[index];
       setExistedCartCount((oldCount) => oldCount - 1);
       const cartIndex = product.indexOf(singleCart);
       dispatch(productSubtract(cartIndex));
       productValue("PRODUCTITEMS", JSON.stringify(product));
    }

    const handleCheckOut = () => {
      setMessage('Order successfully placed!');
      navigate('/dashboard');
    }

    const getCartList = (): allProduct[] =>{
      setIsLoading(true);
      let cartProduct = product;
      if(cartProduct.length === 0) {
        cartProduct = getProductValue("PRODUCTITEMS");
        const newCart: allProduct[] = [];
        if (cartProduct) {
          cartProduct.forEach((cart) => {
            const existedCart = newCart.findIndex(
              (cartItem) => cartItem.id === cart.id
            );
            if (existedCart !== -1) {
              // if no duplicate record found
              setExistedCartCount((oldCount) => oldCount + 1);
            } else {
              newCart.push({ ...cart });
              setExistedCartCount(1);
            }
          });
          setUpdatedCart(newCart);
        }
      }
      setIsLoading(false);
      return cartProduct
    }

    const getTotalCartPrice = (): number => {
      let totalListPrice = 0;
      for(let i = 0; i < product.length; i++){
        totalListPrice += product[i].price * existedCartCount;
      }
      return totalListPrice;
    }
    
    useEffect(()=>{
        dispatch(setProduct(getCartList()));
        setTotalPrice(getTotalCartPrice())
    }, [])

    useEffect(()=>{
      getCartList();
      setTotalPrice(getTotalCartPrice());
      let timer = setTimeout(()=>{
        setMessage('');
      }, 2000);
      return ()=>clearTimeout(timer);
    },[product, message])

  return (
    <HomeLayout onSearch={console.log} filter={console.log}>
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div onClick={() => dispatch(dismiss(!close))}>
          {message !== "" && (
            <div className="text-center text-success jumia-cart-message bg-light-subtle me-auto ms-auto p-1 mb-1 fw-semibold rounded">
              {message}
            </div>
          )}
          {updatedCart.length &&
            updatedCart.map((storedCart, index) => (
              <SingleCart
                key={index}
                productImage={storedCart.images[0]}
                productTitle={storedCart.title}
                productAdd={() => handleAdd(index)}
                productCount={existedCartCount}
                productSubtract={() => handleSubtract(index)}
                productDelete={() => handleDelete(storedCart.id)}
                productPrice={storedCart.price}
              />
            ))}
          {!updatedCart.length && (
            <h4 className="text-center">No cart has been added. </h4>
          )}
          <div className="d-flex justify-content-between p-3 align-items-center">
            <h4>Total price</h4>
            <h5>{`$${totalPrice}`}</h5>
          </div>
          <div className="jumia-checkout d-flex align-items-center justify-content-center p-3">
            <button
              className="text-white bg-success p-2 rounded"
              onClick={handleCheckOut}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </HomeLayout>
  );
}

export default Cart