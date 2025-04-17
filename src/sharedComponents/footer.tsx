import React from 'react'
import FooterCopy from '../components/footerCopy';
import { footerModel } from '../interfaces/footerModel';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div>
      <FooterCopy/>
      <div className="footer-main text-white bg-secondary d-flex justify-content-center">
        <div className="footer-copy-layout d-flex flex-wrap justify-content-between mt-3 pb-5 gap-2">
          {footerModel.map((footer, index)=> <div className='d-flex flex-column' key={index}>
            <h6>{footer.title}</h6>
            <Link className='text-white' to=''>{footer.content_one}</Link>
            <Link className='text-white' to=''>{footer.content_two}</Link>
            <Link className='text-white' to=''>{footer.content_three}</Link>
            <Link className='text-white' to=''>{footer.content_four}</Link>
            <Link className='text-white' to=''>{footer.content_five}</Link>
            <Link className='text-white' to=''>{footer.content_six}</Link>
            <Link className='text-white' to=''>{footer.content_seven}</Link>
            <Link className='text-white' to=''>{footer.content_eight}</Link>
            <Link className='text-white' to=''>{footer.content_nine}</Link>
            <Link className='text-white' to=''>{footer.content_ten}</Link>
            <Link className='text-white' to=''>{footer.content_eleven}</Link>
          </div>)}
        </div>
      </div>
    </div>
  )
}

export default Footer