import React, { Component, PropsWithChildren, useEffect } from "react";
import { Header, Footer } from "@components/rendering";
import { WithNavigationContext } from "@contexts/withNavigationContext";
import { HeaderProvider } from "@contexts/headerContext";
import { SearchProvider } from "@contexts/searchContext";

export interface LayoutProps extends PropsWithChildren {
  pageProps: any;
  children: any;
}

const Layout = ({ children, pageProps }: LayoutProps) => {
  // console.log("pageProps", pageProps?.hierarchies?.pages);

  let headerData = pageProps?.hierarchies?.pages?.find(
    (data) => data?.root?.key === "headerNavigation"
  );
  const footerData = pageProps.hierarchies?.pages?.find(
    (data) => data?.root?.key === "footerNavigation"
  );

  return (
    <SearchProvider>
    <HeaderProvider headerData={{ ...headerData }}>
      <Header />
      <main className="mainClass">{children}</main>
      <Footer footerData={footerData} />
    </HeaderProvider>
    </SearchProvider>
  );
};

export default Layout;
