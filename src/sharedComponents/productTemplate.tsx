import React, { ReactNode } from 'react'
interface templateProps {
  children?: string ;
  productName: string;
  isAwoof: boolean;
  awoof: string | null
}
const ProductTemplate:React.FC<templateProps> = ({children, productName, isAwoof, awoof}) => {
  
  return (
    <div className={`${isAwoof ? "d-flex flex-column" : "d-flex"} gap-2`}>
      { isAwoof ? <img className='awoof pointer' src={children} /> : children}
      {isAwoof ? <h5>{awoof}</h5> : <span>{productName}</span>}
    </div>
  );
}

export default ProductTemplate