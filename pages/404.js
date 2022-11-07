import Image from 'next/image'
import { Layout } from '../layout'

import styles from '../assets/styles/NotFound.module.scss'
import { Button } from '../components'

export default function NotFound() {
  return (
    <>
      <Layout>
        <section className={styles['notfound']}>
          <div className={styles['notfound__container']}>
            <div className={styles['content']}>
              <h1>404</h1>
              <h6>This page is outside of the universe</h6>
              <p>The page you are trying to access doesn`t exist or has been moved. Try going back to our homepage.</p>
              <Button text={'Go to Homepage'} locale href={'/'}/>
            </div>
            <div className={styles['image']}>
              <Image src='/images/404.png' width={899} height={598} alt={''} />
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
