import React from 'react'
interface cartModel{
    productImage: string,
    productTitle: string,
    productPrice: string | number,
    productDelete: ()=> void,
    productAdd: ()=> void,
    productSubtract: ()=> void,
}
const SingleCart:React.FC<cartModel> = ({productImage, productTitle, productPrice, productDelete, productSubtract, productAdd}) => {
  return (
    <div className='jumia-cart-container'>
        <div className="cart-inner">
            <div className="cart-items d-flex">
                <img src={productImage} alt="" />
                <h5>{productTitle}</h5>
                <button onClick={productAdd}>+</button>
                <button onClick={productSubtract}>-</button>
                <button onClick={productDelete}>Delete</button>
                <h6>{productPrice}</h6>
            </div>
        </div>
    </div>
  )
}

export default SingleCart