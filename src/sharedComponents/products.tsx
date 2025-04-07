import React from 'react'
import { allProduct } from '../interfaces/allCategories'

const Products: React.FC<allProduct> = ({price, images, slug, title, description, onClick}) => {
  return (
    <div className='jumia-inner-product d-flex flex-column' onClick={onClick}>
        <img src={images[0]} alt="" className='awoof pointer' />
        <span>${price}</span>
        <h5>{title}</h5>
    </div>
  )
}

export default Products