import React from 'react'
interface cartModel{
    productImage: string,
    productTitle: string,
    productPrice: number ,
    productDelete: ()=> void,
    productCount: number,
    productAdd: ()=> void,
    productSubtract: ()=> void,
}
const SingleCart:React.FC<cartModel> = ({productImage, productTitle, productPrice, productDelete, productSubtract, productAdd, productCount}) => {
  return (
    <div className="jumia-cart-container">
      <div className="cart-inner">
        <div className="jumia-cart items d-flex align-items-center justify-content-center rounded p-3 gap-2">
          <img
            src={productImage}
            alt=""
            className="rounded"
            style={{ width: "100px", height: "100px" }}
          />
          <h5>{productTitle}</h5>
          <button onClick={productAdd}>+</button>
          <span>{productCount}</span>
          <button onClick={productSubtract}>-</button>
          <button onClick={productDelete}>Delete</button>
          <h6>{`$${productPrice}`}</h6>
        </div>
      </div>
    </div>
  );
}

export default SingleCart