import React, { useEffect, useState } from "react";
import { carouselImages } from "../interfaces/allCategories";

const Carousel = () => {
    let [slideIndex, setslideIndex] = useState<number>(0);
    
    useEffect(()=>{
        const interval = setInterval(() => {
          setslideIndex((prevIndex) => (prevIndex + 1) % carouselImages.length); 
        }, 3000); 
        return () => clearInterval(interval);
    },[])
  return (
    <React.Fragment>
      <div className="carousel">
        <div className="carousel-inner d-flex gap-2">
          {carouselImages.map((carousel, index) => (
            <div key={index} className="carousel-items">
              <img
                src={carousel}
                className={`${slideIndex ? "d-block" : 'd-none'}`}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Carousel;
