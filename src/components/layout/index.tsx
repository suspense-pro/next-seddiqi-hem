import React, { Component, PropsWithChildren, useEffect } from "react";
import { Header, Footer } from "@components/rendering";
import { WithNavigationContext } from "@contexts/withNavigationContext";

export interface LayoutProps extends PropsWithChildren {
  pageProps: any;
  children: any;
}

const Layout = ({ children, pageProps }: LayoutProps) => {
  console.log(pageProps.hierarchies?.pages?.find(data => data.root.key === "header")); //this is how we will distinguish header and footer for each component's props
  
  console.log("pageProps----", pageProps)
  return (
    <WithNavigationContext
      pages={null}
      categories={null}
    >
      <>
        <Header {...pageProps.header} />
        <main className="mainClass">{children}</main>
        <Footer {...pageProps.footer} footerData={pageProps.footerData} />
      </>
    </WithNavigationContext>
  );
};

export default Layout;
