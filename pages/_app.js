import React from 'react';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet" />
        <style>{`
          * { font-family: 'Cairo', sans-serif; }
        `}</style>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
