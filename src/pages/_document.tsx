import Document, { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="TIMELESS LEGACY: WHAT STARTED AS ONE MAN'S PASSION OVER 60 YEARS AGO IS TODAY A FAMILY-BUSINESS THAT BRINGS LUXURY AND HONESTY TO THE HEARTS OF WATCH COLLECTORS ALL OVER THE WORLD."
          />

          {
            process.env.NEXT_ENABLE_GTM === "true" && (
              // <!-- Google Tag Manager -->
              <Script
                id="gtm-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                  __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${process.env.NEXT_GTM_ID}');`,
                }}
              ></Script>
            )
            //End Google Tag Manager
          }
        </Head>
        <body className="seddiqi-theme">
          {process.env.NEXT_ENABLE_GTM === "true" && (
            //<!-- Google Tag Manager (noscript) -->
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_GTM_ID}"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              }}
            ></noscript>
            //End Google Tag Manager (noscript)
          )}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
