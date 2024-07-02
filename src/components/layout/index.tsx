import React, { Component, PropsWithChildren, useEffect } from "react";
import { Header, Footer } from "@components/rendering";
import { WithNavigationContext } from "@contexts/withNavigationContext";

export interface LayoutProps extends PropsWithChildren {
  pageProps: any;
  children: any;
}

const Layout = ({ children, pageProps }: LayoutProps) => {
  console.log(pageProps.hierarchies.pages.find(data => data.root.key === "header"));
  
  return (
    <WithNavigationContext
      pages={null}
      categories={null}
    >
      <>
        <Header {...pageProps.header} />
        <main className="mainClass">{children}</main>
        <Footer {...pageProps.footer} />
      </>
    </WithNavigationContext>
  );
};

export default Layout;
