/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from 'react';
import Image from 'next/image'
import classNames from 'classnames';

import { Layout } from '../layout'
import styles from '../assets/styles/Home.module.scss'
import { Button, Detail, ScrollIcon } from '../components';

export default function Home() {
  const [isShowDetail, setIsShowDetail] = useState(false)

  useEffect(() => {
    document.querySelector('html').classList.add('snap')
  }, [])

  return (
    <>
      <Layout>
        <section>
          <div className={styles['image']}>
            <picture>
              <source media="(max-width: 768px)" srcSet="/images/home/slide-3.jpg" />
              <Image src='/images/home/slide-1.jpg' width={1920} height={980} alt={''} />
            </picture>
          </div>
          <div className={styles['content']}>
            <div className={classNames('container', styles['flex-end'])}>
              <div className={styles['desc']}>
                <h1>Free Form Boundaries</h1>
                <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</p>
                <div className={styles['buttons']}>
                  <Button text={'Custimize'} locale />
                  <Button text={'Details'} button secondary onClick={() => setIsShowDetail(true)} />
                </div>
              </div>
            </div>
            <ScrollIcon className={styles['mouse']} />
          </div>
        </section>

        <section>
          <div className={styles['image']}>
            <picture>
              <source media="(max-width: 768px)" srcSet="/images/home/slide-1.jpg" />
              <Image src='/images/home/slide-2.jpg' width={1920} height={980} alt={''} />
            </picture>
          </div>
          <div className={styles['content']}>
            <div className='container'>
              <div className={styles['desc']}>
                <h1>Free Form Boundaries</h1>
                <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</p>
                <div className={styles['buttons']}>
                  <Button text={'Custimize'} locale />
                  <Button text={'Details'} button secondary onClick={() => setIsShowDetail(true)} />
                </div>
              </div>
            </div>
            <ScrollIcon className={styles['mouse']} />
          </div>
        </section>
        
        <section>
          <div className={styles['image']}>
            <picture>
              <source media="(max-width: 768px)" srcSet="/images/home/slide-2.jpg" />
              <Image src='/images/home/slide-3.jpg' width={1920} height={980} alt={''} />
            </picture>
          </div>
          <div className={styles['content']}>
            <div className='container'>
              <div className={styles['desc']}>
                <h1>Free Form Boundaries</h1>
                <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</p>
                <div className={styles['buttons']}>
                  <Button text={'Custimize'} locale />
                  <Button text={'Details'} button secondary onClick={() => setIsShowDetail(true)} />
                </div>
              </div>
            </div>
            <ScrollIcon className={styles['mouse']} />
          </div>
        </section>

        <Detail isShow={isShowDetail} onClickClose={() => setIsShowDetail(false)} />
      </Layout>
    </>
  )
}
