/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from 'react';
import Image from 'next/image'
import classNames from 'classnames';

import { Layout } from '../layout'
import styles from '../assets/styles/Home.module.scss'
import { Button, Detail, ScrollIcon } from '../components';

export default function Home({sliders, detailedinfo, address}) {
  const [isShowDetail, setIsShowDetail] = useState(false)

  useEffect(() => {
    document.querySelector('html').classList.add('snap');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    window.addEventListener("scroll", () => {
      const reveals = document.querySelectorAll("section");

      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        //const elementVisible = 150;

        if (elementTop < windowHeight) {
          if (i !== 0) reveals[i].classList.add(styles["active"]);
        } 
      }
    });
  }, [])
  
  return (
    <>
      <Layout address={address}>
        {
          sliders.map((item, index) => {
            return (
              <section key={index}>
                <div className={styles['image']}>
                  <picture>
                    <source media="(max-width: 1024px)" srcSet={item.mobile_image} />
                    <Image src={item.image} width={1920} height={980} alt={item.title} priority={index === 0 ? true : false} />
                  </picture>
                </div>
                <div className={styles['content']}>
                  <div className={classNames(styles['container'], {[styles['flex-end']]: index === 0})}>
                    <div className={styles['desc']}>
                      <div>
                        <h1>{item.title}</h1>
                        <p>{item.content}</p>
                      </div>
                      <div className={styles['buttons']}>
                        <Button text={'Customize'} locale href='/customize' />
                        <Button text={'Details'} button secondary onClick={() => setIsShowDetail(true)} />
                      </div>
                    </div>
                  </div>
                  {index === 0 && <ScrollIcon className={styles['mouse']} /> }
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
  const address = await fetch(`${process.env.API_URL}/theteam`).then(r => r.json()).then(data => data.Result.slider);

  return {
    props: {
      sliders,
      detailedinfo,
      address
    },
    revalidate: 10,
  }
}
