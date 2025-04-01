import React from 'react'
import HomeLayout from './homeLayout'
import ProductTemplate from '../sharedComponents/productTemplate'

const DashBoard = () => {
  return (
    <HomeLayout>
      <div className="jumia-product-container">
        <ProductTemplate child productName="Appliances" />
        <ProductTemplate child productName="Phones & Tablets" />
        <ProductTemplate child productName="Health & Beauty" />
        <ProductTemplate child productName="Home & Office" />
        <ProductTemplate child productName="Electronics" />
        <ProductTemplate child productName="Fashion" />
        <ProductTemplate child productName="Supermarket" />
        <ProductTemplate child productName="Computing" />
        <ProductTemplate child productName="Baby Products" />
        <ProductTemplate child productName="Gaming" />
        <ProductTemplate child productName="Instrument" />
        <ProductTemplate child productName="Other categories" />
      </div>
    </HomeLayout>
  );
}

export default DashBoard