import React, { Component, PropsWithChildren, useEffect } from "react";
import { Header, Footer } from "@components/rendering";

export interface LayoutProps extends PropsWithChildren {
  pageProps: any;
  children: any;
}

const Layout = ({ children, pageProps }: LayoutProps) => {
  return (
    <>
      <Header {...pageProps.header} />
      <main className="mainClass">{children}</main>
      <Footer {...pageProps.footer} />
    </>
  );
};

export default Layout;
