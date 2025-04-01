import React, { ReactNode } from 'react'
interface templateProps {
  child: ReactNode;
  productName: string
}
const ProductTemplate:React.FC<templateProps> = ({child, productName}) => {
  return (
    <div className="d-flex gap-2">
      {child}
      <span>{productName}</span>
    </div>
  );
}

export default ProductTemplate