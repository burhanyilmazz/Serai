import { Layout } from '../layout'

import styles from '../assets/styles/Terms.module.scss'

export default function Terms({address, privacypolicy}) {
  return (
    <>
      <Layout address={address}>
        <section className={styles['terms']}>
          <div className={styles['terms__container']}>
            <h1>{privacypolicy.title}</h1>
            <h6>{privacypolicy.mini_content}</h6>
            <div dangerouslySetInnerHTML={{__html: privacypolicy.content}} />           
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const address = await fetch(`${process.env.API_URL}/theteam`).then(r => r.json()).then(data => data.Result.slider);
  const privacypolicy = await fetch(`${process.env.API_URL}/theteam`).then(r => r.json()).then(data => data.Result);

  return {
    props: {
      address,
      privacypolicy
    },
    revalidate: 10,
  }
}