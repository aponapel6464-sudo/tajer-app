import React from 'react';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
```

4. انزل لأسفل واضغط على الزر الأخضر **Commit changes**.

---

بمجرد الضغط على Commit changes، سيختفي الخطأ الأحمر فوراً وتظهر علامة الصح الخضراء (`✓`) وتعمل الألوان والتصاميم كاملة ومباشرة على رابط موقعك Vercel! 🚀
