import React, { useEffect, useState } from 'react'
import HomeLayout from './homeLayout'
import ProductContent from '../sharedComponents/productContent'
import { singleitemProduct } from '../services/authService'
import { getValue } from '../services/localStorage'
import { allProduct } from '../interfaces/allCategories'
import OfficialStore from '../sharedComponents/officialStore'

const SingleProduct = () => {

    const [product, setProduct] = useState<allProduct>();
    const [productIndex, setProductIndex] = useState<number>(0);
    const slug = getValue("PRDUCTSLUG");
    const getsingleProduct = async(slug: string) => {
        const data = await singleitemProduct(slug);
        console.log(data)
        setProduct(data);
    }
    useEffect(()=>{
        getsingleProduct(slug);
    },[])

    
  return (
    <HomeLayout onSearch={() => console.log()}>
      <div className="jumia-products-container">
        <div className="jumia-incontainer d-flex justify-content-between gap-4">
        <div className="single-left">
          <ProductContent imageSrc={productIndex ? product?.images[productIndex] : product?.images[0]}>
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
            <OfficialStore productName={product?.title} productDescription={product?.description} />
        </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default SingleProduct