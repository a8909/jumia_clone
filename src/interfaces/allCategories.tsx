import { ReactNode } from "react";

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
  isHelp?: boolean
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

export const userAccount =  [
  {
    icon: '',
    name: 'My Account'
  },
  {
    icon: '',
    name: 'Orders'
  },
  {
    icon: '',
    name: 'Inbox'
  },
  {
    icon: '',
    name: 'Wishlist'
  },
  {
    icon: '',
    name: 'Voucher'
  },
]

export const help = [
  { name: "Help Center" },
  { name: "Place an order" },
  { name: "Payment options" },
  { name: "Track an order" },
  { name: "Cancel an order" },
  { name: "Return & Refunds" },
];
  

