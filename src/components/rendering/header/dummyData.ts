// types.ts
export interface LatestsubTitle {
  image?: string;
  title?: string;
  subTitle?: string;
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
  the_latest?: LatestsubTitle[];
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
    "titles",
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
          image: "/images/png/watchImage_01.png",
          title: "Rolex",
          subTitle: "GMT‑Master II",
        },
        {
          title: "breitling",
          subTitle: "Navitimer automatic GMT 41",
          image: "/images/png/watchImage_03.png",
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
          title: "Chopard",
          subTitle: "Happy Hearts",
          image: "/images/png/jewellery_01.png",
        },
        {
          title: "Van Cleef Arpels",
          subTitle: "Fleurette Earrings",
          image: "/images/png/jewellery_02.png",
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
          title: "Rapport",
          subTitle: "Vantage three watch roll",
          image: "/images/png/acessories_01.png",
        },
        {
          title: "Chopard",
          subTitle: "Happy hearts tote bag",
          image: "/images/png/acessories_02.png",
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
          title: "Sediqqi Servicing",
          subTitle: "How to take care of your watch?",
          image: "/images/jpg/services_01.jpg",
        },
        {
          title: "Sediqqi Servicing",
          subTitle: "Swiss trained watchmakers",
          image: "/images/png/services_02.png",
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
        { name: "New subTitles", expand: false },
        { name: "Seddiqi title Launches", expand: false },
        { name: "Seddiqi Partnerships", expand: false },
        { name: "Latest News", expand: false },
      ],
      the_latest: [
        {
          title: "Seddiqi Jewellery Show: Where Nature and Luxury Intertwine",
          subTitle: "The world of watchmaking came to Geneva.",
          image: "/images/jpg/story_01.jpg",
        },
        {
          title: "Wish-list Watches for Workplace Big Hitters",
          subTitle: "Elevate your office attire with these watches.",
          image: "/images/png/story_02.png",
        },
        {
          title: "Wish-Show her that you love her",
          subTitle: "Elevate your office attire with these watches.",
          image: "/images/png/story_03.png",
        },
      ],
    },
  ],
};
