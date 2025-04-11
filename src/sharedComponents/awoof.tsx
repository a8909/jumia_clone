import React from "react";
import ProductTemplate from "./productTemplate";
import { allProducts, jumiaDeals } from "../interfaces/allCategories";
import Carousel from "./carousel";

const Awoof = () => {
  return (
    <>
      <div className="jumia-product d-flex flex-column p-3 gap-3 flex-fill rounded">
        {allProducts.map((product, index) => (
          <ProductTemplate
            key={index}
            children={product.icon}
            productName={product.productName}
            isAwoof={product.isAwoof}
            awoof={product.awoof}
          />
        ))}
      </div>
      <div className="jumia-display">
        <Carousel />
      </div>
      <div className="jumia-packages d-flex flex-column justify-content-between flex-grow-1 gap-1">
        <div className="jumia-product resize d-flex flex-column justify-content-center p-3 gap-3 rounded">
          {jumiaDeals.map((deals, index)=> <ProductTemplate key={index} children={deals.icon} productName={deals.productName} isAwoof={deals.isAwoof} awoof={deals.awoof} />)}
        </div>
        <div className="jumia-pack resize rounded p-3 d-flex flex-column align-items-center justify-content-center gap-2">
          <h1 className="text-center">JUMIA FORCE</h1>
          <h4>JOIN NOW</h4>
        </div>
      </div>
    </>
  );
};

export default Awoof;
