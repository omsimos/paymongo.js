import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />

        <title>paymongo.js</title>
        <meta
          name="description"
          content="An end-to-end typesafe library for PayMongo."
        />
        <meta property="og:title" content="paymongo.js" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://github.com/omsimos/paymongo.js"
        />
        <meta property="og:image" content="/api/og" />
        <meta
          property="og:description"
          content="An end-to-end typesafe library for PayMongo."
        />
        <meta property="og:site_name" content="paymongo.js" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:domain" content="github.com" />
        <meta
          name="twitter:url"
          content="https://github.com/omsimos/paymongo.js"
        />
        <meta name="twitter:creator" content="@princecaarlo" />
        <meta name="twitter:title" content="paymongo.js" />
        <meta
          name="twitter:description"
          content="An end-to-end typesafe library for PayMongo."
        />
        <meta name="twitter:image" content="/api/og" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
