import "../assets/styles/main.scss";

import { useEffect, useRef } from "react";
import { Head } from '@components/module';

import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const Noop = ({ children }: any) => <>{children}</>;

export default function MyApp({ Component, pageProps }) {

  const Layout = (Component as any).Layout || Noop;

  return (
    <>
      <Head />
      <Layout pageProps={pageProps}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
