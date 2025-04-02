import React from 'react'
import { allProduct } from '../interfaces/allCategories'

const Products: React.FC<allProduct> = ({price, images, title, description}) => {
  return (
    <div className='jumia-inner-product d-flex flex-column'>
        <img src={images[0]} alt="" style={{width: '250px', height: '250px'}} />
        <span>${price}</span>
        <h5>{title}</h5>
    </div>
  )
}

export default Products