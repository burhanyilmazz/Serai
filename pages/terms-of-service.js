import { Layout } from '../layout'

import styles from '../assets/styles/Terms.module.scss'

export default function Terms({address, termsofservice}) {
  return (
    <>
      <Layout address={address}>
        <section className={styles['terms']}>
          <div className={styles['terms__container']}>
            <h1>{termsofservice.title}</h1>
            <h6>{termsofservice.mini_content}</h6>
            <div dangerouslySetInnerHTML={{__html: termsofservice.content}} /> 
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const address = await fetch(`${process.env.API_URL}/theteam`).then(r => r.json()).then(data => data.Result.slider);
  const termsofservice = await fetch(`${process.env.API_URL}/termsofservice`).then(r => r.json()).then(data => data.Result);

  return {
    props: {
      address,
      termsofservice
    },
    revalidate: 10,
  }
}