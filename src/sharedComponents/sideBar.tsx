import React, { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuthPayload,
  getProductValue,
  removeAuth,
} from "../../src/services/localStorage";
import {
  PersonIcon,
  CartIcon,
  QuestionIcon,
  DropdownIcon,
} from "../assets/images/icons";
import jumiaLoogo from "../../src/assets/images/jumiaLogo.png";
import { allProduct, help, userAccount } from "../interfaces/allCategories";
import DropModal from "./dropModal";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../state/store";
import { setProduct } from "../state/slice/productSlice";
import { clearInterval, setInterval } from "timers";
import { autoLogOut } from "../services/authService";

interface clickEvent {
  onClick: (e: FormEvent, search: string) => void;
  filter: (search: string) => void;
}
const SideBar: React.FC<clickEvent> = ({ onClick, filter }) => {
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [height, setHeight] = useState("auto");
  const [lastScrollY, setLastscrollY] = useState<number>(0);
  let navigate = useNavigate();
  const [currentTab, setcurrentTab] = useState<boolean>(false);
  const [showModal, setshowModal] = useState<boolean>(false);
  const [productCount, setProductCount] = useState<number>(0);
  const [productItems, setProductItems] = useState<allProduct[]>([]);
  const product = useSelector(
    (state: RootState) => state.productReducer.product
  );
  const isModalClose = useSelector(
    (state: RootState) => state.dismissModal.closeModal
  );
 
  const dispatch = useDispatch();

  const handleScroll = () => {
    const currentScroll = window.scrollY;
    if (lastScrollY > currentScroll) {
      setHeight("auto");
    } else {
      setHeight("0");
    }
    setLastscrollY(currentScroll);
  };

  const checkStorageState = (): allProduct[] => {
    let productList = product;
    if (productList.length === 0) {
      productList = getProductValue("PRODUCTITEMS");
    }
    return productList;
  };

  useEffect(() => {
    if (!productItems.length) {
      dispatch(setProduct(checkStorageState()));
    }
     const parsedPayload = getAuthPayload();
     setName(parsedPayload?.username);
    
  }, []);

  useEffect(() => {
    const getCart = () => {
      setProductItems(checkStorageState());
      setProductCount(checkStorageState().length);
    };
    getCart();
    if(isModalClose){
      setshowModal(!isModalClose);
    }else{
      setshowModal(isModalClose);
    }
    return () => {};
  }, [product, isModalClose]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const oncartClicked = () => navigate("/cart");

  const handleClick = () => setshowModal(!showModal);

  const checkcurrentTab = (iscurrenttabActive: boolean) => {
    handleClick();
    setcurrentTab(iscurrenttabActive);
  };

  const onLogout = () => {
    removeAuth();
    navigate("/");
  };

  const home = () => navigate("/dashboard");

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
            <h1 className="text-nowrap point" onClick={home}>
              JUMIA <img src={jumiaLoogo} alt="" style={{ width: "40px", height: "40px" }} />
            </h1>

            <div className="jumia-search d-flex gap-2">
              <input
                className="form-control jumia-input p-3"
                id="search-input"
                type="text"
                onInput={()=>filter(search)}
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
            <div className="jumia-account-container d-flex gap-2">
              <div
                className="jumia-person cursor d-flex align-items-center gap-1 position-relative"
                onClick={() => checkcurrentTab(true)}
              >
                <PersonIcon />
                <h6 className="text-nowrap">Hi, {name}</h6>
                <DropdownIcon />
                {showModal && currentTab && (
                  <div className="jumia-account">
                    {userAccount.map((account, index) => (
                      <DropModal
                        key={index}
                        icon={account.icon}
                        name={account.name}
                        newPath={account.path}
                      />
                    ))}
                    <h6 className="hr pointer" onClick={onLogout}>
                      Logout
                    </h6>
                  </div>
                )}
              </div>
              <div
                className="jumia-help cursor d-flex align-items-center gap-1 position-relative"
                onClick={() => checkcurrentTab(false)}
              >
                <QuestionIcon />
                <h6>Help</h6>
                <DropdownIcon />
                {showModal && !currentTab && (
                  <div className="jumia-account">
                    {help.map((option, index) => (
                      <DropModal
                        key={index}
                        icon={undefined}
                        name={option.name}
                        isHelp={true}
                        newPath={option.path}
                      />
                    ))}
                    <button className="hr">Live Chat</button>
                  </div>
                )}
              </div>
              <div
                className="jumia-cart cursor d-flex align-items-center gap-1 position-relative"
                onClick={oncartClicked}
              >
                <CartIcon />
                <h6 className="me-4">Cart</h6>
                {productCount > 0 && (
                  <span className="position-absolute rounded-circle bg-success text-white d-flex ustify-content-center align-items-center ps-2 pe-2 end-0 bottom-50">
                    {productCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;


