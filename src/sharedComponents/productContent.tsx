import React, { ReactNode } from 'react'
interface eachContent{
    imageSrc ?:  string;
    children: ReactNode
}
const ProductContent: React.FC<eachContent> = ({imageSrc, children}) => {
  return (
    <div className='jumia-content'>
            <div className="jumia-inleft">
                <img src={imageSrc} alt="" style={{width: '500px', height: '500px'}} />
                {children}
            </div>
    </div>
  )
}

export default ProductContent