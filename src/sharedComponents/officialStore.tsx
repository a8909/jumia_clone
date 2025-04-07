import React from 'react'
interface officialStore {
    productName?: string;
    productDescription?: string;
}
const OfficialStore: React.FC<officialStore> = ({productName, productDescription}) => {
  return (
    <>
      <h4 className='fw-bold'>{productName}</h4>
      <h6>{productDescription}</h6>
      <button className='auth-btn'>Add to cart</button>
    </>
  );
}

export default OfficialStore