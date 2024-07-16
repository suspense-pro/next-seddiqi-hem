import { FormEvent } from "react";
import React, { useState } from 'react';
import { SideDrawer } from "@components/module";
import Layout from "@components/layout";
import ContentBlock from "@components/module/contentBlock";
import compact from "lodash/compact";
import { GetServerSidePropsContext } from "next";
import fetchStandardPageData from "@utils/cms/page/fetchStandardPageData";

import { getCustomer } from "@utils/sfcc-connector/dataService";
import LoginForm from "@components/LoginForm";
import RegistrationForm from "@components/RegistrationForm";
import PriceRangeFilter from "@components/module/priceRangeFilter";
import { getHierarchyChildren } from "@utils/cms/amplience";
import Accordion from "@components/module/accordion";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const data = await fetchStandardPageData(
    {
      content: {
        page: { key: "homepage" },
      },
    },
    context
  );

  return {
    props: {
      ...data
    },
  };
}

const accordionItem = {
  id: "priceRange",
  title: "Price",
};

export default function Home({ contents }) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [subMenu, setSubMenu] = useState<string | null>(null);

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);
  return (
    <div className="main-content">
     <button onClick={toggleDrawer}>Open Drawer</button>
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
       <Accordion 
        item={accordionItem} 
        setSubMenu={setSubMenu} 
        subMenu={subMenu} 
        showArrow={true}
      >
        <PriceRangeFilter />
      </Accordion>
      </SideDrawer>
      {compact(contents).map((content) => (
        <ContentBlock content={content} key={content?._meta.deliveryId} />
      ))}
    </div>
  );
}

Home.Layout = Layout;
