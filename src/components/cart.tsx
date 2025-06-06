import React, { FormEvent, useEffect, useState } from 'react'
import { getProductValue, productValue } from '../services/localStorage'
import { allProduct } from '../interfaces/allCategories'
import SingleCart from './singleCart'
import HomeLayout from './homeLayout'
import { useDispatch, useSelector } from 'react-redux'
import { productAdd, productDelete, setProduct } from '../state/slice/productSlice'
import { dismiss } from '../state/slice/modalSlice'
import { RootState } from '../state/store'
import LoadingSpinner from '../sharedComponents/loadingSpinner'
import { useNavigate } from 'react-router-dom'
import { filterProduct } from '../state/slice/filterSlice'

const Cart = () => {
    const [updatedCart, setUpdatedCart] = useState<allProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState('');
    const [searchCharacter, setSearchCharacter] = useState('');
    const [existedCartCount, setExistedCartCount] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const dispatch = useDispatch();
    const closeModal = useSelector((state: RootState) => state.dismissModal.closeModal);
    const product = useSelector((state: RootState) => state.productReducer.product);
    const isFiltering = useSelector(
      (state: RootState) => state.filterSlice.isFiltered
    );
    const filterSearch = useSelector((state: RootState) => state.filterSlice.productToSearch);
    let close = closeModal;
    let filterState = isFiltering;
    const navigate = useNavigate();
    let productFromSlice = product;

    const getStoredProduct = () => productFromSlice;

    const handleProductState = (index: number, key: string)=>{
      const singleCart = updatedCart[index];
      key === "INCREAMENT"
        ? setExistedCartCount((oldCount) => oldCount + 1)
        : setExistedCartCount((oldCount) => oldCount - 1);
        dispatch(productAdd(singleCart));
        productValue("PRODUCTITEMS", JSON.stringify(getStoredProduct()));
    }

    const handleDelete = (cartId: number) => {
        dispatch(productDelete(cartId));
        setUpdatedCart(getStoredProduct())
        productValue("PRODUCTITEMS", JSON.stringify(getStoredProduct()));
    }

    const handleCheckOut = () => {
      setMessage('Order successfully placed!');
      navigate('/dashboard');
    }

    const getCartList = (storedProduct : allProduct[]) =>{
      setIsLoading(true);
      let cartProduct =  storedProduct ;
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
          dispatch(setProduct(newCart))
        }
      }
      setIsLoading(false);
    }

    const getTotalCartPrice = (): number => {
      let totalListPrice = 0;
      for (let i = 0; i < product.length; i++) {
        totalListPrice += product[i].price * existedCartCount;
      }
      return totalListPrice;
    };

    const handleSearch = (e: FormEvent, search : string) => {
      e.preventDefault();
      setSearchCharacter(search);
      const payLoad ={query: search, productToSearch: updatedCart, isFiltered:filterState };
      dispatch(filterProduct(payLoad))
    }

    const handleFilter = (searchString: string) => {
       setSearchCharacter(searchString);
      const payLoad = {query: searchString, productToSearch: updatedCart, isFiltered:filterState };
      dispatch(filterProduct(payLoad))
    }
    
    useEffect(()=>{
      const init : allProduct[] = [];
        getCartList(init);
        setTotalPrice(getTotalCartPrice());
    }, [])

    useEffect(()=>{
      getCartList(product);
      setTotalPrice(getTotalCartPrice());
      let timer = setTimeout(()=>{
        setMessage('');
      }, 2000);
      return ()=>clearTimeout(timer);
    },[product,message])

  return (
    <HomeLayout
      onSearch={(e, search: string) => handleSearch(e, search)}
      filter={(searchString: string) => handleFilter(searchString)}
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div onClick={() => dispatch(dismiss(!close))}>
          {message !== "" && (
            <div className="text-center text-success jumia-cart-message bg-light-subtle me-auto ms-auto p-1 mb-1 fw-semibold rounded">
              {message}
            </div>
          )}
          {updatedCart.length &&
            (isFiltering ? filterSearch : updatedCart).map(
              (storedCart, index) => (
                <SingleCart
                  key={index}
                  productImage={storedCart.images[0]}
                  productTitle={storedCart.title}
                  productAdd={() => handleProductState(index, "INCREAMENT")}
                  productCount={(existedCartCount)}
                  productSubtract={() => handleProductState(index, "DECREAMENT")}
                  productDelete={() => handleDelete(storedCart.id)}
                  productPrice={storedCart.price}
                />
              )
            )}
          {!updatedCart.length && (
            <h4 className="text-center">No cart has been added. </h4>
          )}
          <div
            className={`${
              filterSearch.filter((f) =>
                f.title.toLowerCase().includes(searchCharacter.toLowerCase())
              ).length > 0 || totalPrice
                ? "d-block"
                : "d-none"
            }`}
          >
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
        </div>
      )}
    </HomeLayout>
  );
}

export default Cart