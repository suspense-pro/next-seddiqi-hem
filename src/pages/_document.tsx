import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="TIMELESS LEGACY: WHAT STARTED AS ONE MAN'S PASSION OVER 60 YEARS AGO IS TODAY A FAMILY-BUSINESS THAT BRINGS LUXURY AND HONESTY TO THE HEARTS OF WATCH COLLECTORS ALL OVER THE WORLD."
          />
        </Head>
        <body className="seddiqi-theme">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
