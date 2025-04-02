import React, { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuthPayload } from "../../src/services/localStorage";
import { PersonIcon } from "../assets/images/icons";
import { CartIcon } from "../assets/images/icons";
import { QuestionIcon } from "../assets/images/icons";
import { DropdownIcon } from "../assets/images/icons";
import jumiaLoogo from "../../src/assets/images/jumiaLogo.png";

interface clickEvent {
  onClick: (e: FormEvent, search: string) => void;
}
const SideBar: React.FC<clickEvent> = ({ onClick }) => {
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
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
          <div className="jumia-icon d-flex gap-1 align-items-center ">
            <img
              src={jumiaLoogo}
              alt=""
              style={{ width: "30px", height: "30px" }}
            />
            <Link to="/">Sell on Jumia</Link>
          </div>
          <div className="jumia-pay d-flex align-items-center gap-2">
            <h3>JUMIA</h3>
            <img
              src={jumiaLoogo}
              alt=""
              style={{ width: "20px", height: "20px" }}
            />
            {/* <img src="" alt="" /> */}
            <h3>PAY</h3>
          </div>
        </div>
        <div className="jumia-header d-flex justify-content-center">
          <div className="jumia-header-inner p-3 ">
            <h1>
              JUMIA{" "}
              <img
                src={jumiaLoogo}
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
            </h1>

            <div className="jumia-search d-flex gap-2">
              <input
                className="form-control jumia-input p-3"
                id="search-input"
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Products, brands and categories"
              />
              <button
                className="jumia-btn rounded"
                onClick={(e) => onClick(e, search)}
              >
                Search
              </button>
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
