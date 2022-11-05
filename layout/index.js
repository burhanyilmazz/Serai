import { useEffect } from 'react';
import Head from 'next/head'
import { Header, Footer } from '../components';

export const Layout = (props) => { 
  useEffect(() => {
    document.querySelector('html').classList.remove('snap')
  }, [])
  return (
    <>
      <Head>
        <title>Serai</title>
        <meta name="description" content="Serai" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        {props.children}
      </main>
      <Footer />
    </>
  )
}