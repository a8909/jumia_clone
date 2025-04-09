import React from 'react';

import jumiaLoogo from "../../src/assets/images/jumiaLogo.png";

const LoadingSpinner = () => {
  return (
    <div className="jumia-logo position-relative">
      <img src={jumiaLoogo} alt="" style={{ width: "70px", height: "70px" }} />
    </div>
  );
}

export default LoadingSpinner