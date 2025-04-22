import React, { FormEvent, useEffect, useState } from 'react'
import HomeLayout from './homeLayout'
import ProductTemplate from '../sharedComponents/productTemplate'

import { allProduct, categoriesModel } from '../interfaces/allCategories';
import {
  getAllCategories,
  getAllProducts,
  singleitemProduct,
} from "../services/authService";
import Awoof from '../sharedComponents/awoof';
import Products from '../sharedComponents/products';
import { useNavigate } from 'react-router-dom';
import { setValue } from '../services/localStorage';
import LoadingSpinner from '../sharedComponents/loadingSpinner';
import { RootState } from '../state/store';
import { useSelector, useDispatch } from 'react-redux';
import { dismiss } from '../state/slice/modalSlice';
import { filterProduct } from '../state/slice/filterSlice';

const DashBoard = () => {
  const [categories, setCategories] = useState<categoriesModel[]>([]);
  const [product, setProduct] = useState<allProduct[]>([]);
  const [isloading, setIsloading] = useState<boolean>(false);
  const navigate = useNavigate();
  const closeModal = useSelector((state: RootState)=> state.dismissModal.closeModal);
  const filterSearch = useSelector((state: RootState)=> state.filterSlice.productToSearch);
  const filtering = useSelector((state: RootState)=> state.filterSlice.isFiltered);
  const dispatch = useDispatch();
  let close = closeModal;
  let productToFilter: allProduct[] = filterSearch;
  let filterState : boolean = filtering;
  

  const getCategories = async() => {
    setIsloading(true);
    const data = await getAllCategories();
    setCategories(data);
    setIsloading(false);
  }
  const getProducts = async() => {
    setIsloading(true);
    productToFilter = await getAllProducts();
    setProduct(productToFilter);
    setIsloading(false);
  }
  const handleSearch =(e: FormEvent, search: string)=>{
    e.preventDefault();
    const payLoad ={query: search, productToSearch: product, isFiltered:filterState };
    dispatch(filterProduct(payLoad))
  }

  const handleFilter = (search : string)=>{
    const payLoad ={query: search, productToSearch: product, isFiltered:filterState };
    dispatch(filterProduct(payLoad));
  }

  const onproductClick = async(productSlug: string) => {
    const data = await singleitemProduct(productSlug);
    const { slug } = data;
    setValue('PRDUCTSLUG', slug);
    navigate(`/dashboard/slug/${slug}`);
  }

  useEffect(()=> {
    getCategories();
    getProducts();
  }, [])

  return (
    <HomeLayout
      filter={(search: string) => handleFilter(search)}
      onSearch={(e, search: string) => handleSearch(e, search)}
    >
      {isloading && <LoadingSpinner />}
      <div
        className="jumia-product-container rounded p-3 ms-5 mt-3 d-flex justify-content-between flex-column flex-wrap gap-2"
        onClick={() => dispatch(dismiss(!close))}
      >
        <div className="jumia-awoof d-flex flex-wrap gap-4 m-auto overflow-auto">
          <Awoof />
        </div>
        <div
          className={`${
            !isloading ? "overflow-x-scroll" : "full"
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
          {(filterState ? filterSearch : product).map((item, index) => (
            <Products
              key={index}
              price={item.price}
              images={item.images}
              title={item.title}
              slug={item.slug}
              description={item.description}
              id={item.id}
              onClick={() => onproductClick(item.slug)}
            />
          ))}
        </div>
      </div>
    </HomeLayout>
  );
}

export default DashBoard