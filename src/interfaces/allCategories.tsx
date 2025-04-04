import { ReactNode } from "react";
import { Account, Love, Voucher,Email,Order } from "../assets/images/icons";

export interface categoriesModel{
    slug: string;
    name: string;
    image?: string;
}

export interface allProduct{
  price: number;
  images: Array<string>;
  title: string;
  description: string;
  id: number;
}

export interface account{
  icon: ReactNode;
  name: string;
  isHelp?: boolean;
  newPath: string;
}

export const allProduct = [
  {
    icon: "", //note his should be an icon
    productName: "Appliances",
    isAwoof: false,
    awoof: null,
  },
  {
    icon: "", //note his should be an icon
    productName: "Phones & Tablets",
    isAwoof: false,
    awoof: null,
  },
  {
    icon: "", //note his should be an icon
    productName: "Health & Beauty",
    isAwoof: false,
    awoof: null,
  },
  {
    icon: "", //note his should be an icon
    productName: "Home & Office",
    isAwoof: false,
    awoof: null,
  },
  {
    icon: "", //note his should be an icon
    productName: "Electronics",
    isAwoof: false,
    awoof: null,
  },
  {
    icon: "", //note his should be an icon
    productName: "Fashion",
    isAwoof: false,
    awoof: null,
  },
  {
    icon: "", //note his should be an icon
    productName: "Supermarket",
    isAwoof: false,
    awoof: null,
  },
  {
    icon: "", //note his should be an icon
    productName: "Computing",
    isAwoof: false,
    awoof: null,
  },
  {
    icon: "", //note his should be an icon
    productName: "Baby Products",
    isAwoof: false,
    awoof: null,
  },
  {
    icon: "", //note his should be an icon
    productName: "Gaming",
    isAwoof: false,
    awoof: null,
  },
  {
    icon: "", //note his should be an icon
    productName: "Instrument",
    isAwoof: false,
    awoof: null,
  },
  {
    icon: "", //note his should be an icon
    productName: "Other categories",
    isAwoof: false,
    awoof: null,
  },
];

export const jumiaDeals = [
  {
    icon: "", //note his should be an icon
    productName: "CALL TO ORDER",
    isAwoof: false,
    awoof: null,
  },
  {
    icon: "", //note his should be an icon
    productName: "Sell on Jumia",
    isAwoof: false,
    awoof: null,
  },
  {
    icon: "", //note his should be an icon
    productName: "Best Deals",
    isAwoof: false,
    awoof: null,
  },
];

export const userAccount = [
  {
    icon: <Account />,
    name: "My Account",
    path: "https://www.jumia.com.ng/customer/account/index/",
  },
  {
    icon: <Order/>,
    name: "Orders",
    path: "https://www.jumia.com.ng/customer/order/index/",
  },
  {
    icon: <Email />,
    name: "Inbox",
    path: "https://www.jumia.com.ng/customer/account/inbox/",
  },
  {
    icon: <Love />,
    name: "Wishlist",
    path: "https://www.jumia.com.ng/customer/wishlist/index/",
  },
  {
    icon: <Voucher />,
    name: "Voucher",
    path: "https://www.jumia.com.ng/customer/coupon/index/",
  },
];

export const help = [
  { name: "Help Center", path: "https://www.jumia.com.ng/sp-help-center/" },
  {
    name: "Place an order",
    path: "https://www.jumia.com.ng/sp-help-center/?page=place+an+order",
  },
  {
    name: "Payment options",
    path: "https://www.jumia.com.ng/sp-help-center/?page=pay+for+your+order",
  },
  {
    name: "Track an order",
    path: "https://www.jumia.com.ng/sp-help-center/?page=track+your+order",
  },
  {
    name: "Cancel an order",
    path: "https://www.jumia.com.ng/sp-help-center/?page=cancel+an+order",
  },
  {
    name: "Return & Refunds",
    path: "https://www.jumia.com.ng/sp-help-center/?page=create+a+return",
  },
];
  

