import { useEffect } from 'react';
import Head from 'next/head'
import { Header, Footer } from '../components';

export const Layout = (props) => { 
  const { address } = props;
  
  useEffect(() => {
    document.querySelector('html').classList.remove('snap');
    document.querySelector('html').classList.remove('disable-scroll')
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  return (
    <>
      <Head>
        <title>Serai</title>
        <meta name="description" content="Serai" />
        <link rel="icon" href="/images/favicon.svg" />
      </Head>

      <Header />
      <main>
        {props.children}
      </main>
      <Footer address={address} />
    </>
  )
}