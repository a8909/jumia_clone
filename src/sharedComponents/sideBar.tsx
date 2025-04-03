import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthPayload } from "../../src/services/localStorage";
import { PersonIcon } from "../assets/images/icons";
import { CartIcon } from "../assets/images/icons";
import { QuestionIcon } from "../assets/images/icons";
import { DropdownIcon } from "../assets/images/icons";
import jumiaLoogo from "../../src/assets/images/jumiaLogo.png";
import { help, userAccount } from "../interfaces/allCategories";
import DropModal from "./dropModal";

interface clickEvent {
  onClick: (e: FormEvent, search: string) => void;
}
const SideBar: React.FC<clickEvent> = ({ onClick }) => {
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [height, setHeight] = useState("auto");
  const [lastScrollY, setLastscrollY] = useState<number>(0);
  const navigate = useNavigate();
  const [currentTab, setcurrentTab] = useState<boolean>(false);
  const [showModal, setshowModal] = useState<boolean>(false);
 

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

  const oncartClicked= ()=>{
    navigate("https://www.jumia.com.ng/cart");
  }

  const handleClick = ()=> setshowModal(!showModal);

  const handleAccount= ()=>{
    handleClick();
    setcurrentTab(true)
  }
  const handleHelp= ()=>{
    handleClick();
    setcurrentTab(false);

  }
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
            <div
              className="jumia-person cursor d-flex align-items-center gap-1"
              onClick={handleAccount}
            >
              <PersonIcon />
              <h4>Hi, {name}</h4>
              <DropdownIcon />
              {(showModal && currentTab) && (
                <div>
                  {userAccount.map((account, index) => (
                    <DropModal
                      key={index}
                      icon={account.icon}
                      name={account.name}
                    />
                  ))}
                </div>
              )}
            </div>
            <div className="jumia-help cursor d-flex align-items-center gap-1" onClick={handleHelp} >
              <QuestionIcon />
              <h4>Help</h4>
              <DropdownIcon />
              {(showModal && !currentTab ) && (
                <div>
                  {help.map((option, index)=><DropModal key={index} icon={undefined} name={option.name} isHelp={true} /> )}
                </div>
              )}
            </div>
            <div
              className="jumia-cart cursor d-flex align-items-center gap-1"
              onClick={oncartClicked}
            >
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
