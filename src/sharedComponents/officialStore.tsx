import React from 'react'
interface officialStore {
    productName?: string;
    productDescription?: string;
    onCartAdded: ()=> void;
}
const OfficialStore: React.FC<officialStore> = ({productName, productDescription, onCartAdded}) => {
  return (
    <>
      <h4 className='fw-bold'>{productName}</h4>
      <h6>{productDescription}</h6>
      <button className='auth-btn' onClick={onCartAdded}>Add to cart</button>
    </>
  );
}

export default OfficialStore