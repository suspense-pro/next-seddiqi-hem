import { ContentClient, ContentClientConfigV2 } from "dc-delivery-sdk-js";

import Container from "@components/module/container";
import ContentPage from "@components/module/contentPage";
import Image from "@components/module/image";
import Slot from "@components/module/slot";
import CategoryList from "@components/module/categoryList";
import {
  CollectionsTabList,
  DefaultContentBlock,
  HeroBanner,
  ThreeItemCarousel,
  TwoColumnArticleBlock,
  TwoColumnFullScreenImage,
  TwoColumnImageCopy,
  QuoteBlock,
  ImageQuoteBlock,
  BrandBanner,
  BoutiqueBanner,
  ArticleListCarousel,
  HighlightedProductCarousel,
  FeaturedProductCarousel,
  ExploreBrand,
  ContentAndImageTwoColumn,
} from "@components/rendering";
import { ArticleCard, DisplayCard, StoryCard } from "@components/module";
import ImageGalleryCarousel from "@components/rendering/imageGalleryCarousel";
import BrandListing from "./../../components/module/brandListing/index";
import Spacing from "@components/rendering/spacing";
import {
  RolexHeroBanner,
  RolexNavbar,
  RolexImageBanner,
  ThreeGrid,
  ThreeCompactImageText,
  ItemSlider,
  TwoColumnImageText,
  ThreeTallImageText,
  RolexProductLister,
} from "@components/rendering/rolex";
import RolexTextBlock from "@components/rendering/rolex/rolexTextBlock";
import ViewAllBrandsCategory from "@components/module/brands/viewAllBrandsCategory";
import NeedMoreHelp from "@components/rendering/needMoreHelp";
import ExclusiveInfoCards from "@components/module/bookAnAppointment/exclusiveInfoCards";
import ContentAndSingleImageColumn from "@components/rendering/contentAndSingleImageColumn";

export const defaultClientConfig: ContentClientConfigV2 = {
  hubName: process.env.DYNAMIC_CONTENT_HUB_NAME || "platinumpanda",
  secureMediaHost: process.env.DYNAMIC_CONTENT_SECURE_MEDIA_HOST || "",
};

const schemaUrl = "https://seddiqi.amplience.com";
const contentUrl = schemaUrl + "/content";
const slotsUrl = schemaUrl + "/slots";
const pageUrl = schemaUrl + "/page";
const moduleUrl = schemaUrl + "/module";
const componentUrl = schemaUrl + "/component";
const renderingUrl = schemaUrl + "/rendering";

export const RolexComponentMapping: any = {
  [`${pageUrl}/landing`]: ContentPage,
  [`${contentUrl}/container`]: Container,
  [`${contentUrl}/image`]: Image,
  [`${contentUrl}/content`]: ContentPage,
  [`${slotsUrl}/container`]: Slot,
  [`${moduleUrl}/article-card`]: ArticleCard,
  [`${moduleUrl}/display-card`]: DisplayCard,
  [`${moduleUrl}/story-card`]: StoryCard,
  [`${componentUrl}/rolex/navbar`]: RolexNavbar,
  [`${componentUrl}/rolex/text-block`]: RolexTextBlock,
  [`${componentUrl}/rolex/hero-banner`]: RolexHeroBanner,
  [`${componentUrl}/rolex/image-banner`]: RolexImageBanner,
  [`${componentUrl}/spacing`]: Spacing,
  [`${componentUrl}/rolex/three-grid`]: ThreeGrid,
  [`${componentUrl}/rolex/three-compact-image-text`]: ThreeCompactImageText,
  [`${componentUrl}/rolex/item-slider`]: ItemSlider,
  [`${componentUrl}/rolex/two-column-image-text-v2`]: TwoColumnImageText,
  [`${componentUrl}/rolex/three-tall-image-text`]: ThreeTallImageText,
  [`${componentUrl}/rolex/product-lister-v2`]: RolexProductLister,
};

export const ComponentMapping: any = {
  [`${pageUrl}/landing`]: ContentPage,
  [`${contentUrl}/container`]: Container,
  [`${contentUrl}/image`]: Image,
  [`${contentUrl}/content`]: ContentPage,
  [`${contentUrl}/hero_banner`]: HeroBanner,
  [`${renderingUrl}/banner`]: HeroBanner,
  [`${slotsUrl}/container`]: Slot,
  [`${moduleUrl}/article-card`]: ArticleCard,
  [`${moduleUrl}/display-card`]: DisplayCard,
  [`${moduleUrl}/story-card`]: StoryCard,
  [`${componentUrl}/two-column-image-copy`]: TwoColumnImageCopy,
  [`${componentUrl}/two-column-article-block`]: TwoColumnArticleBlock,
  [`${componentUrl}/hero-banner`]: HeroBanner,
  [`${componentUrl}/category-list`]: ThreeItemCarousel,
  [`${componentUrl}/two-column-fullscreen-image`]: TwoColumnFullScreenImage,
  [`${componentUrl}/content-block`]: DefaultContentBlock,
  [`${componentUrl}/quote-block`]: QuoteBlock,
  [`${componentUrl}/image-quote-block`]: ImageQuoteBlock,
  [`${componentUrl}/collections-tab-list`]: CollectionsTabList,
  [`${componentUrl}/article-list-carousel`]: ArticleListCarousel,
  [`${componentUrl}/brand-banner`]: BrandBanner,
  [`${componentUrl}/highlighted-product-carousel`]: HighlightedProductCarousel,
  [`${componentUrl}/botique-banner`]: BoutiqueBanner,
  [`${componentUrl}/product-carousel`]: FeaturedProductCarousel,
  [`${componentUrl}/image-gallery-carousel`]: ImageGalleryCarousel,
  [`${componentUrl}/explore-brand`]: ExploreBrand,
  [`${componentUrl}/brand-category-list`]: CategoryList,
  [`${contentUrl}/find-a-boutique-listing`]: ContentPage,
  [`${componentUrl}/brand-listing`]: BrandListing,
  [`${componentUrl}/view-all-brands`]: ViewAllBrandsCategory,
  [`${componentUrl}/content-and-image-two-column`]: ContentAndImageTwoColumn,
  [`${componentUrl}/spacing`]: Spacing,
  [`${componentUrl}/need-help`]: NeedMoreHelp,
  [`${componentUrl}/exclusive-info-list`]: ExclusiveInfoCards,
  [`${componentUrl}/content-and-single-image-column`]: ContentAndSingleImageColumn,
};

const defaultConfig = {
  url: schemaUrl,
  cms: {
    hubName: "platinumpanda",
    imageHub: "willow",
  },
};

let configObj: any | undefined = undefined;

export function getConfig(): any {
  if (!configObj) {
    configObj = defaultClientConfig;
  }

  return configObj as any;
}

export function getHubName() {
  return getConfig()?.cms?.hubName ?? "unknown";
}
