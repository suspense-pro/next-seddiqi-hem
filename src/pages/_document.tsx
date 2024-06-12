import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="The premiere coffee delivery service."
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
