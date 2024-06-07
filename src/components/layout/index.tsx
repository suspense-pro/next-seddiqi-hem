import React, { PropsWithChildren, useEffect } from 'react';
import {Header, Footer} from '@components/rendering'

export interface LayoutProps {
    pageProps: any;
    children: any;
  }

const Layout = ({ children, pageProps }: LayoutProps) => {
    <>
        <Header {...pageProps.header} />
        <main className="mainClass">{children}</main>
        <Footer {...pageProps.footer} />
    </>

};

export default Layout;