import React, { Component, PropsWithChildren, useEffect } from "react";
import { Header, Footer } from "@components/rendering";
import { WithNavigationContext } from "@contexts/withNavigationContext";
import { HeaderProvider } from "@contexts/headerContext";

export interface LayoutProps extends PropsWithChildren {
  pageProps: any;
  children: any;
}

const Layout = ({ children, pageProps }: LayoutProps) => {
  let headerData = pageProps?.hierarchies?.pages?.find(
    (data) => data?.root?.key === "headerNavigation"
  );
  const footerData = pageProps.hierarchies?.pages?.find(
    (data) => data.root.key === "footerNavigation"
  );

  const cardsData = pageProps?.cardsData;

  return (
    <HeaderProvider headerData={{ ...headerData, cardsData }}>
      <Header />
      <main className="mainClass">{children}</main>
      <Footer footerData={footerData} />
    </HeaderProvider>
  );
};

export default Layout;
