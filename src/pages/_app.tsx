import "../assets/styles/main.scss";
import "../assets/styles/globals.css";
import type { AppProps } from "next/app";
import { PropsWithChildren } from "react";
import { Head } from "@components/module";
import React from "react";
import LanguageProvider from "@contexts/languageContext";

import Router from "next/router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import ErrorPage from "next/error";
import WithVisualization from "@contexts/withVisualizationContext";
import { HeaderProvider } from "@contexts/headerContext";
import { WithAppContext } from "@contexts/appContext";
import { WithCmsContext } from "@contexts/cmsContext";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

interface NoopProps extends PropsWithChildren {}

const Noop = ({ children }: NoopProps) => <>{children}</>;

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop;

  if ((pageProps as any).statusCode) {
    return <ErrorPage statusCode={(pageProps as any).statusCode} />;
  }

  return (
    <>
      <LanguageProvider>
        <Head />
        <WithAppContext value={(pageProps as any).context?.appContext}>
          <WithVisualization>
            <WithCmsContext value={(pageProps as any).context?.cmsContext}>
              <Layout pageProps={pageProps}>
                <Component {...pageProps} />
              </Layout>
            </WithCmsContext>
          </WithVisualization>
        </WithAppContext>
      </LanguageProvider>
    </>
  );
}
