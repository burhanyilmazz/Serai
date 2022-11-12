import Image from 'next/image'

import { Layout } from '../layout'
import { Hero } from '../components';

import styles from '../assets/styles/OurStory.module.scss'

export default function OurStory({ourstory, address}) {
  return (
    <>
      <Layout address={address}>
        <Hero 
          title={ourstory.title}
          text={ourstory.content}
          img={ourstory.headerImage}
          mobile={ourstory.headerMobile}
          bottom
        />

        <section className={styles['story']}>
          <div className={styles['story__content']}>
            <h2>{ourstory.section2_title}</h2>
            <div dangerouslySetInnerHTML={{__html: ourstory.section2_content}} />          
          </div>
          <div className={styles['story__images']}>
            <Image src={ourstory.section2_image} width={1362} height={1034} alt='Yerleşim Planı' />
          </div>
          <div className={styles['story__content']} dangerouslySetInnerHTML={{__html: ourstory.section2_content2}} />
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const ourstory = await fetch(`${process.env.API_URL}/ourstory`).then(r => r.json()).then(data => data.Result);
  const address = await fetch(`${process.env.API_URL}/theteam`).then(r => r.json()).then(data => data.Result.slider);

  return {
    props: {
      ourstory,
      address
    },
    revalidate: 10,
  }
}