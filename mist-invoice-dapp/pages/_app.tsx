import '../src/index.css'
import '../src/App.css'
import Head from 'next/head'

export default function MyApp({ Component, pageProps}) {
  return (
    <>
      <Head>
        <title>React App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Component {...pageProps} />
    </>
  )
}
