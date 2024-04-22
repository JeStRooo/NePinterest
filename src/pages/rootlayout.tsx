// eslint-disable-next-line @next/next/no-document-import-in-page
import { Html, Head, Main, NextScript } from 'next/document'

import { Inter } from 'next/dist/compiled/@next/font/dist/google'

const inter = Inter({ subsets: ['latin'] })

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className={inter.className}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
