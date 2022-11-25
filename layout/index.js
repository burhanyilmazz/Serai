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
        <title>Serai One</title>
        <meta name="description" content="Serai One" />
        <link rel="icon" href="/images/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </Head>

      <Header />
      <main>
        {props.children}
      </main>
      <Footer address={address} />
    </>
  )
}