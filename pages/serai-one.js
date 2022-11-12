import { useState } from 'react';
import Image from 'next/image'
import { Navigation, A11y, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Layout } from '../layout'
import { Button, Hero, Detail } from '../components';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from '../assets/styles/SeraiOne.module.scss'
import classNames from 'classnames';

export default function SeraiOne({seraione}) {
  const [isShowDetail, setIsShowDetail] = useState(false);

  return (
    <>
      <Layout>
        <Hero 
          title={seraione.title}
          text={seraione.content}
          img={seraione.headerImage}
          mobile={seraione.headerMobile}
        />

        <section className={styles['plans']}>
          <div className={styles['plans__content']}>
            <h2>{seraione.section2_title}</h2>
            <div dangerouslySetInnerHTML={{__html: seraione.section2_content}} />
            <Button text={'Technical Specifications'} button onClick={() => setIsShowDetail(true)} />
          </div>
          <div className={styles['plans__image']}>
            <Image src={seraione.section2_image} width={1077} height={403} alt={seraione.section2_title} />
          </div>
        </section>

        <section className={styles['image']}>
          <Image src={seraione.section3_image} width={1920} height={980} alt='Serai One' />
        </section>

        <section className={styles['kroki']}>
          <div className={styles['item']}>
            <div className={styles['kroki__content']}>
              <h2>{seraione.section4_left_title}</h2>
              <div dangerouslySetInnerHTML={{__html: seraione.section4_left_content}} />
            </div>
            <div className={styles['kroki__image']}>
              <Image src={seraione.section4_left_image} width={670} height={501} alt={seraione.section4_left_title} />
            </div>
          </div>

          <div className={styles['item']}>
            <div className={styles['kroki__content']}>
              <h2>{seraione.section4_right_title}</h2>
              <div dangerouslySetInnerHTML={{__html: seraione.section4_right_content}} />
            </div>
            <div className={styles['kroki__image']}>
              <Image src={seraione.section4_right_image} width={670} height={501} alt={seraione.section4_right_title} />
            </div>
          </div>
        </section>

        <section className={styles['image']}>
          <Image src={seraione.section5_image} width={1920} height={980} alt='Serai One' />
        </section>

        <section className={styles['slider']}>
          <div className={styles['slider__container']}>
            <h2>{seraione.section6_title}</h2>
            <div dangerouslySetInnerHTML={{__html: seraione.section6_content}} />
          </div>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            slidesPerView={'auto'}
            spaceBetween={7}
            centeredSlides
            navigation
            loop
            className={classNames(styles['slider__carousel'], 'slider__carousel')}
            breakpoints={{
                1024: {
                  spaceBetween: 24
                }
              }
            }
          >
            { seraione.slider.map((item, index) => <SwiperSlide key={index}><Image src={item.image} width={1086} height={502} alt='Serai One' /></SwiperSlide>)}
          </Swiper>
        </section>

        <Detail 
          isShow={isShowDetail} 
          title={'Technical Specifications'} 
          content={seraione?.section2_technical_specs} 
          onClickClose={() => setIsShowDetail(false)} 
        />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const seraione = await fetch(`${process.env.API_URL}/seraione`).then(r => r.json()).then(data => data.Result);

  return {
    props: {
      seraione
    }
  }
}