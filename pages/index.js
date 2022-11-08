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
              <source media="(max-width: 1024px)" srcSet="/images/home/image_01.jpg" />
              <Image src='/images/home/slide-1.jpg' width={1920} height={980} alt={'Free Form Boundaries'} priority />
            </picture>
          </div>
          <div className={styles['content']}>
            <div className={classNames('container', styles['flex-end'])}>
              <div className={styles['desc']}>
                <div>
                  <h1>Free Form Boundaries</h1>
                  <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</p>
                </div>
                <div className={styles['buttons']}>
                  <Button text={'Custimize'} locale href='/customize' />
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
              <source media="(max-width: 1024px)" srcSet="/images/home/image_02.jpg" />
              <Image src='/images/home/slide-2.jpg' width={1920} height={980} alt={'Spacious Yet Compact'} />
            </picture>
          </div>
          <div className={styles['content']}>
            <div className='container'>
              <div className={styles['desc']}>
                <div>
                  <h1>Spacious Yet Compact</h1>
                  <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</p>
                </div>
                <div className={styles['buttons']}>
                  <Button text={'Custimize'} locale href='/customize' />
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
              <source media="(max-width: 1024px)" srcSet="/images/home/image_03.jpg" />
              <Image src='/images/home/slide-3.jpg' width={1920} height={980} alt={'Home is Where Your Serai is'} />
            </picture>
          </div>
          <div className={styles['content']}>
            <div className='container'>
              <div className={styles['desc']}>
                <div>
                  <h1>Home is Where Your Serai is</h1>
                  <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</p>
                </div>
                <div className={styles['buttons']}>
                  <Button text={'Custimize'} locale href='/customize' />
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
