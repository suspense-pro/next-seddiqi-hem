// types.ts
export interface LatestProduct {
  brand: string;
  product: string;
}

export interface Category {
  name: string;
  expand: boolean;
}

export interface Section {
  id: number;
  type: string;
  categories?: Category[];
  special_categories?: Category[];
  the_latest?: LatestProduct[];
}

export interface HeaderData {
  header: string[];
  sections: Section[];
}

export const headerDummyData: HeaderData = {
  header: [
    "Watches",
    "Jewellery",
    "Accessories",
    "Brands",
    "Services",
    "Explore",
  ],
  sections: [
    {
      id: 1,
      type: "Watches",
      categories: [
        { name: "Men's Watches", expand: false },
        { name: "Women's Watches", expand: false },
        { name: "Smart Watches", expand: false },
        { name: "Luxury Watches", expand: false },
        { name: "Sport Watches", expand: false },
      ],
      special_categories: [
        { name: "New In", expand: false },
        { name: "Best Sellers", expand: false },
        { name: "Limited Edition", expand: false },
        { name: "Recommended", expand: false },
      ],
      the_latest: [
        {
          brand: "Chopard",
          product: "Happy Hearts",
        },
        {
          brand: "Van Cleef Arpels",
          product: "Fleurette Earrings",
        },
      ],
    },
    {
      id: 2,
      type: "Jewelry",
      categories: [
        { name: "Rings", expand: false },
        { name: "Engagement Rings", expand: false },
        { name: "Necklace", expand: false },
        { name: "Bracelets", expand: false },
        { name: "Accessories", expand: false },
        { name: "Earrings", expand: false },
      ],
      special_categories: [
        { name: "New In", expand: false },
        { name: "Best Sellers", expand: false },
        { name: "Limited Edition", expand: false },
        { name: "Recommended", expand: false },
      ],
      the_latest: [
        {
          brand: "Chopard",
          product: "Happy Hearts",
        },
        {
          brand: "Van Cleef Arpels",
          product: "Fleurette Earrings",
        },
      ],
    },
    {
      id: 3,
      type: "Accessories",
      categories: [
        { name: "Watches Accessories", expand: false },
        { name: "Seddigi Accessories", expand: false },
        { name: "Jewellery Accessories", expand: false },
      ],
      special_categories: [],
      the_latest: [
        {
          brand: "Chopard",
          product: "Happy Hearts",
        },
        {
          brand: "Van Cleef Arpels",
          product: "Fleurette Earrings",
        },
      ],
    },
    { id: 4, type: "Brands" },
    {
      id: 5,
      type: "Services",
      categories: [
        { name: "Cleaning", expand: false },
        { name: "Free Services", expand: false },
        { name: "All Services", expand: false },
      ],
      special_categories: [],
      the_latest: [
        {
          brand: "Chopard",
          product: "Happy Hearts",
        },
        {
          brand: "Van Cleef Arpels",
          product: "Fleurette Earrings",
        },
      ],
    },
    {
      id: 6,
      type: "Explore",
      categories: [
        { name: "WHAT'S NEW", expand: true },
        { name: "STORIES", expand: true },
        { name: "SEDDIQI FAMILY", expand: true },
        { name: "DUBAI WATCH WEEK", expand: false },
        { name: "SEDDIQI WORLD", expand: false },
      ],
      special_categories: [
        { name: "New Products", expand: false },
        { name: "Seddiqi Brand Launches", expand: false },
        { name: "Seddiqi Partnerships", expand: false },
        { name: "Latest News", expand: false },
      ],
      the_latest: [],
    },
  ],
};
