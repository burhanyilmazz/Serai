import Head from 'next/head'
import { Header, Footer } from '../components';

export const Layout = (props) => { 
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