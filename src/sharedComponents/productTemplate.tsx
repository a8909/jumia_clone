import React, { ReactNode } from 'react'
import  {categoriesModel}  from '../interfaces/allCategories';
interface templateProps {
  children: string ;
  productName: string;
  isAwoof: boolean;
  awoof: string | null
}
const ProductTemplate:React.FC<templateProps> = ({children, productName, isAwoof, awoof}) => {
  // console.log(children);
  return (
    <div className={`${isAwoof ? "d-flex flex-column" : "d-flex"} gap-2`}>
      { isAwoof ? <img src={children} style={{width: '250px', height: '250px'}} /> : children}
      {isAwoof ? <h5>{awoof}</h5> : <span>{productName}</span>}
    </div>
  );
}

export default ProductTemplate