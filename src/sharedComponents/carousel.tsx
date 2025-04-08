import React, { useEffect, useState } from "react";
import { carouselImages } from "../interfaces/allCategories";

const imageLength = carouselImages.length - 1;
const Carousel = () => {
    let [slideIndex, setslideIndex] = useState<number>(0);
    
    useEffect(()=>{
        const interval = setInterval(() => {
          setslideIndex(slideIndex === imageLength ? 0 : slideIndex + 1);
        }, 3000); 
        return () => clearInterval(interval);
    },[slideIndex])
  return (
    <React.Fragment>
      <div className="carousel">
        <div className="carousel-inner d-flex gap-2">
          {carouselImages.map((carousel, index) => (
            <div key={index} className= {`${index === slideIndex ? 'd-block fade-in': 'd-none'} carousel-items`}>
              <img className= "carousel-image"
                src={carousel}
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



