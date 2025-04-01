import React, { useEffect, useState } from 'react'
import HomeLayout from './homeLayout'
import ProductTemplate from '../sharedComponents/productTemplate'

import { categoriesModel } from '../interfaces/allCategories';
import { getAllCategories } from '../services/authService';
import Awoof from '../sharedComponents/awoof';

const DashBoard = () => {
  const [categories, setCategories] = useState<categoriesModel[]>([]);
  const [isloading, setIsloading] = useState<boolean>(false);
  const getCategories = async() => {
    setIsloading(true);
    const data = await getAllCategories();
    setCategories(data);
    setIsloading(false);
  }
  useEffect(()=> {
    getCategories();
  }, [])
  return (
    <HomeLayout>
      <div className="jumia-product-container rounded p-3 ms-5 mt-3 d-flex justify-content-between flex-wrap gap-2">
        <div className="jumia-awoof d-flex justify-content-center gap-4 m-auto"><Awoof /></div>
        <div
          className={`${!isloading ? 'overflow-x-scroll':  null} jumia-awoof d-flex gap-2 position-relative`}
        >
          {!isloading ? (
            <div className="d-flex gap-2">
              {categories.map((category, index) => (
                <ProductTemplate
                  key={index}
                  children={category.image}
                  productName={""}
                  isAwoof={true}
                  awoof={category.name}
                />
              ))}
            </div>
          ) : (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
          )}
        </div>
      </div>
    </HomeLayout>
  );
}

export default DashBoard