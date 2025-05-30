import React, { useEffect, useState } from 'react'
import HomeLayout from './homeLayout'
import ProductContent from '../sharedComponents/productContent'
import { singleitemProduct } from '../services/authService'
import { getProductValue, getValue } from '../services/localStorage'
import { allProduct } from '../interfaces/allCategories'
import OfficialStore from '../sharedComponents/officialStore'
import LoadingSpinner from '../sharedComponents/loadingSpinner'
import { productValue } from '../services/localStorage'
import { useDispatch, useSelector } from 'react-redux'
import { productAdd } from '../state/slice/productSlice'
import { RootState } from '../state/store'
import { dismiss } from '../state/slice/modalSlice'

const SingleProduct = () => {

    const [product, setProduct] = useState<allProduct>();
    const [productIndex, setProductIndex] = useState<number>(0);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const closeModal = useSelector((state: RootState)=> state.dismissModal.closeModal);
    let close = closeModal;

    const slug = getValue("PRDUCTSLUG");
    const getsingleProduct = async(slug: string) => {
        setIsloading(true);
        const data = await singleitemProduct(slug);
        setProduct(data);
        setIsloading(false);
    }

    const handlecartAdded = (productItems: allProduct)=> {
      const existingItems = getProductValue("PRODUCTITEMS");
      const updatedCartItems = [...existingItems, productItems];
      productValue("PRODUCTITEMS", JSON.stringify(updatedCartItems));
      dispatch(productAdd(productItems));
      setMessage(`${productItems.title} is suuccessfully added to cart!`);
    }
        
    useEffect(()=>{
        getsingleProduct(slug);
    },[])

    useEffect(()=>{
      let timer = setTimeout(()=>{setMessage("")}, 2000);
      return () => clearTimeout(timer);
    },[message])

    
  return (
    <HomeLayout onSearch={() => console.log()} filter={console.log} >
      {isLoading && <LoadingSpinner />}
      {message !== '' && <div className='text-center text-success jumia-cart-message bg-light-subtle me-auto ms-auto p-1 mb-1 fw-semibold rounded'>{message}</div>}
      <div className="jumia-products-container" onClick={()=> dispatch(dismiss(!close))}>
        <div className="jumia-incontainer d-flex justify-content-between gap-4">
          <div className="single-left">
            <ProductContent
              imageSrc={
                productIndex
                  ? product?.images[productIndex]
                  : product?.images[0]
              }
            >
              <div className="single-images d-flex gap-2 mt-2">
                {product?.images.map((eachImage, index) => (
                  <img
                    key={index}
                    src={eachImage}
                    onClick={() => setProductIndex(index)}
                    alt=""
                    style={{ width: "100px", height: "100px" }}
                  />
                ))}
              </div>
              <h5 className="single-share">SHARE THIS PRODUCT</h5>
            </ProductContent>
          </div>
          <div className="single-right">
            <OfficialStore
              productName={product?.title}
              productDescription={product?.description}
              onCartAdded={() => handlecartAdded(product!)}
              productPrice={`$${product?.price}`}
            />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default SingleProduct