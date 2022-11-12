/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from 'react';
import Image from 'next/image'
import classNames from 'classnames';

import { Layout } from '../layout'
import styles from '../assets/styles/Home.module.scss'
import { Button, Detail, ScrollIcon } from '../components';

import fetch from 'isomorphic-unfetch'

export default function Home({sliders, detailedinfo}) {
  const [isShowDetail, setIsShowDetail] = useState(false)

  useEffect(() => {
    document.querySelector('html').classList.add('snap')
  }, [])
  
  return (
    <>
      <Layout>
        {
          sliders.map((item, index) => {
            return (
              <section key={index}>
                <div className={styles['image']}>
                  <picture>
                    <source media="(max-width: 1024px)" srcSet={item.mobile_image} />
                    <Image src={item.image} width={1920} height={980} alt={item.title} priority={index === 0} />
                  </picture>
                </div>
                <div className={styles['content']}>
                  <div className={classNames('container', styles['flex-end'])}>
                    <div className={styles['desc']}>
                      <div>
                        <h1>{item.title}</h1>
                        <p>{item.content}</p>
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
            )
          })
        }
        <Detail 
          isShow={isShowDetail} 
          title={detailedinfo?.title} 
          content={detailedinfo?.content} 
          onClickClose={() => setIsShowDetail(false)} 
        />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const sliders = await fetch(`${process.env.API_URL}/sliders`).then(r => r.json()).then(data => data.Result);
  const detailedinfo = await fetch(`${process.env.API_URL}/detailedinfo`).then(r => r.json()).then(data => data.Result);

  return {
    props: {
      sliders,
      detailedinfo
    }
  }
}
