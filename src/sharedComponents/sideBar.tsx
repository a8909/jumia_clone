import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthPayload } from "../../src/services/localStorage";
import { PersonIcon } from "../assets/images/icons";
import { CartIcon } from "../assets/images/icons";
import { QuestionIcon } from "../assets/images/icons";
import { DropdownIcon } from "../assets/images/icons";

const SideBar = () => {
  const [name, setName] = useState("");
  const [height, setHeight] = useState("auto");
  const [lastScrollY, setLastscrollY] = useState<number>(0);

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    if (lastScrollY > currentScroll) {
      setHeight("auto");
    } else {
      setHeight("0");
    }
    setLastscrollY(currentScroll);
  };

  useEffect(() => {
    const parsedPayload = getAuthPayload();
    console.log(parsedPayload);
    setName(parsedPayload?.username);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);
  return (
    <div className="jumia-big">
      <div className="jumia-container">
        <div
          className={`${
            height === "0" ? "invisible" : "visible"
          } jumia-inner d-flex justify-content-around align-items-center`}
          style={{ height: height, transition: "height 0.3s ease-out" }}
        >
          <div className="jumia-icon ">
            {/* <img src="" alt="" /> */}
            <Link to="/">Sell on Jumia</Link>
          </div>
          <div className="jumia-pay d-flex gap-2">
            <h3>JUMIA</h3>
            {/* <img src="" alt="" /> */}
            {/* <img src="" alt="" /> */}
            <h3>PAY</h3>
          </div>
        </div>
        <div className="jumia-header d-flex justify-content-center">
          <div className="jumia-header-inner p-3">
            <h1>JUMIA</h1>
            <div className="jumia-search d-flex gap-2">
              <input
                className="form-control jumia-input p-3"
                type="text"
                placeholder="Search Products, brands and categories"
              />
              <button className="jumia-btn rounded">Search</button>
            </div>
            <div className="jumia-person d-flex align-items-center gap-1">
              <PersonIcon />
              <h4>Hi, {name}</h4>
              <DropdownIcon />
            </div>
            <div className="jumia-help d-flex align-items-center gap-1">
              <QuestionIcon />
              <h4>Help</h4>
              <DropdownIcon />
            </div>
            <div className="jumia-cart d-flex align-items-center gap-1">
              <CartIcon />
              <h4>Cart</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
