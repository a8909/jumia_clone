import React, { useEffect, useState } from 'react'
import HomeLayout from './homeLayout'
import ProductContent from '../sharedComponents/productContent'
import { singleitemProduct } from '../services/authService'
import { getProductValue, getValue } from '../services/localStorage'
import { allProduct } from '../interfaces/allCategories'
import OfficialStore from '../sharedComponents/officialStore'
import LoadingSpinner from '../sharedComponents/loadingSpinner'
import { productValue } from '../services/localStorage'

const SingleProduct = () => {

    const [product, setProduct] = useState<allProduct>();
    const [productIndex, setProductIndex] = useState<number>(0);
    const [onModalClose, setOnModalClose] = useState<boolean>(false);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<allProduct[]>([]);
    const slug = getValue("PRDUCTSLUG");
    const getsingleProduct = async(slug: string) => {
        setIsloading(true);
        const data = await singleitemProduct(slug);
        setProduct(data);
        setIsloading(false);
    }

    const handlecartAdded = (productItems: allProduct)=> {
        const existingItems = getProductValue("PRODUCTITEMS");
        const updatedCartItems = [...existingItems, productItems ];
        productValue('PRODUCTITEMS', JSON.stringify(updatedCartItems));
        setCartItems(updatedCartItems);
    }
        

    const handleCloseModal =()=> setOnModalClose(false);
    useEffect(()=>{
        getsingleProduct(slug);
    },[])

    
  return (
    <HomeLayout onSearch={() => console.log()} closeModalEvent={onModalClose}>
      {isLoading && <LoadingSpinner />}
      <div className="jumia-products-container" onClick={handleCloseModal}>
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
            />
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default SingleProduct