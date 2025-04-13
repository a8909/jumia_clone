import React from 'react'
interface officialStore {
  productName?: string;
  productDescription?: string;
  onCartAdded: () => void;
  productPrice?: string
}
const OfficialStore: React.FC<officialStore> = ({productName, productDescription, onCartAdded, productPrice}) => {
  return (
    <>
      <h4 className='fw-bold'>{productName}</h4>
      <h6>{productDescription}</h6>
      <div className="sigle-price d-flex align-items-center gap-2">
        <button className='auth-btn p-2 rounded fw-semibold' onClick={onCartAdded}>Add to cart</button>
      <h4>{productPrice}</h4>
      </div>
      
    </>
  );
}

export default OfficialStore