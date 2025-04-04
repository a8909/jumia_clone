import React, { FormEvent, useEffect, useState } from 'react'
import HomeLayout from './homeLayout'
import ProductTemplate from '../sharedComponents/productTemplate'

import { allProduct, categoriesModel } from '../interfaces/allCategories';
import { getAllCategories, getAllProducts } from '../services/authService';
import Awoof from '../sharedComponents/awoof';
import Products from '../sharedComponents/products';
import jumiaLoogo from '../../src/assets/images/jumiaLogo.png';

const DashBoard = () => {
  const [categories, setCategories] = useState<categoriesModel[]>([]);
  const [product, setProduct] = useState<allProduct[]>([]);
  const [isloading, setIsloading] = useState<boolean>(false);
  const [isFilter, setIsfiltering] = useState<boolean>(false);
  const [filtered, setfiltered] = useState<allProduct[]>([]);

  const getCategories = async() => {
    setIsloading(true);
    const data = await getAllCategories();
    setCategories(data);
    setIsloading(false);
  }
  const getProducts = async() => {
    setIsloading(true);
    const data = await getAllProducts();
    setProduct(data);
    setIsloading(false);
  }
  const handleSearch =(e: FormEvent, search: string)=>{
    e.preventDefault();
    console.log(search);
    if(search === ''){
      setfiltered(filtered);
      setIsfiltering(false);
      return ;
    }else{
       const filter = product.filter(eachProduct=> 
         eachProduct.title.toLocaleLowerCase().includes(search.toLowerCase())
      );
      setfiltered(filter);
      setIsfiltering(true);
      return filter;
    }

  }

  useEffect(()=> {
    getCategories();
    getProducts();
  }, [])
  return (
    <HomeLayout onSearch={(e, search: string) => handleSearch(e, search)}>
      {isloading && (
        <div className="jumia-logo position-relative">
          <img
            src={jumiaLoogo}
            alt=""
            style={{ width: "70px", height: "70px" }}
          />
        </div>
      )}

      <div className="jumia-product-container rounded p-3 ms-5 mt-3 d-flex justify-content-between flex-wrap gap-2">
        <div className="jumia-awoof d-flex flex-wrap gap-4 m-auto overflow-auto">
          <Awoof />
        </div>
        <div
          className={`${
            !isloading ? "overflow-x-scroll" : 'full'
          } jumia-awoof d-flex gap-2 position-relative`}
        >
          {!isloading ? (
            <div className="d-flex gap-2">
              {categories.map((category, index) => (
                <ProductTemplate
                  key={index}
                  children={category?.image}
                  productName={""}
                  isAwoof={true}
                  awoof={category.name}
                />
              ))}
            </div>
          ) : (
            <div className="d-flex justify-content-center align-items-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
        </div>
        <div className="jumia-products d-flex flex-wrap justify-content-center gap-2">
          {(isFilter ? filtered : product).map((item, index) => (
            <Products
              key={index}
              price={item.price}
              images={item.images}
              title={item.title}
              description={""}
              id={item.id}
            />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}

export default DashBoard