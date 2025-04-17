import React, { FormEvent, useEffect, useRef, useState } from 'react'
import jumiaLogo from "../../src/assets/images/jumiaLogo.png";
import  "../../src/assets/style/global.scss";
import { useNavigate } from 'react-router-dom';
import { getAuthPayload } from '../services/localStorage';
import { Email } from '../assets/images/icons';

const FooterCopy = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    
    useEffect(()=>{
        const parsedPayload = getAuthPayload();
        setEmail(parsedPayload?.email);
    }, [])
  return (
    <React.Fragment>
      <div className="footer-copy-container d-flex bg-dark text-white justify-content-center pe-5 ps-5 pb-5">
        <div className="footer-copy-layout d-flex justify-content-between flex-wrap pb-5 gap-4">
          <div className="div copy-logo me-5 point" onClick={() => navigate("/dashboard")}>
            <h4 className="fs-1 fw-bold">
              Jumia
              <span>
                <img src={jumiaLogo}alt="" style={{ width: "40px", height: "40px" }}/>
              </span>
            </h4>
          </div>
          <div className="copy-inner">
            <span className="mb-1">NEW TO JUMIA ?</span>
            <p className="p-0 m-0">
              Subscribe to our newsletter to get updates on ouur latest offers!
            </p>
            <div className="copy-form mt-3">
              <form onSubmit={(e)=>e.preventDefault()}>
                <div className="footer-form position-relative d-flex gap-2">
                    <span className='text-body-secondary'><Email/></span>
                  <input className="form-control fw-semibold fs-5 text-body-secondary ps-4" type="text" onChange={(e)=>setEmail(e.target.value)} ref={inputRef} value={email}/>
                  <button type="submit" className="fs-6 rounded bg-black text-white border-light p-3">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
          <div className="copy-dowload">
            <div className="copy-text d-flex gap-2 align-items-center">
              <div className="copy-left">
                <img src={jumiaLogo} alt="" style={{ width: "40px", height: "40px" }}/>
              </div>
              <div className="copy-right">
                <h6 className="fs-6">DOWNLOAD JUMIA FREE APP</h6>
              </div>
            </div>
            <div className="copy-apps"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default FooterCopy