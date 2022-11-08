import Image from 'next/image'
import { Navigation, A11y, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Layout } from '../layout'
import { Button, Hero } from '../components';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



import styles from '../assets/styles/SeraiOne.module.scss'
import classNames from 'classnames';

export default function SeraiOne() {
  return (
    <>
      <Layout>
        <Hero 
          title={'Serai One'}
          text={'Ut vel purus ornare, lacinia nibh sit amet, interdum nisl. Ut aliquam erat id nulla scelerisque, vitae viverra arcu ultricies.'}
          img={'/images/serai/hero.jpg'}
          mobile={'/images/serai/hero-mobile.jpg'}
        />

        <section className={styles['plans']}>
          <div className={styles['plans__content']}>
            <h2>Yerleşim Planı</h2>
            <p>Ut vel purus ornare, lacinia nibh sit amet, interdum nisl. Ut aliquam erat id nulla scelerisque, vitae viverra arcu ultricies.</p>
            <Button text={'Technical Specifications'} locale />
          </div>
          <div className={styles['plans__image']}>
            <Image src={'/images/serai/plan.png'} width={1077} height={403} alt='Yerleşim Planı' />
          </div>
        </section>

        <section className={styles['image']}>
          <picture>
            <source media="(max-width: 768px)" srcSet={'/images/serai/img-1.jpg'} />
            <Image src={'/images/serai/img-1.jpg'} width={1920} height={980} alt='Serai One' />
          </picture>
        </section>

        <section className={styles['kroki']}>
          <div className={styles['item']}>
            <div className={styles['kroki__content']}>
              <h2>Donec feugiat odio gravida diam vestibulum semper.</h2>
              <p>Ut vel purus ornare, lacinia nibh sit amet, interdum nisl. Ut aliquam erat id nulla scelerisque, vitae viverra arcu ultricies.</p>
            </div>
            <div className={styles['kroki__image']}>
              <Image src={'/images/serai/kroki-1.png'} width={670} height={501} alt='kroki 1' />
            </div>
          </div>

          <div className={styles['item']}>
            <div className={styles['kroki__content']}>
              <h2>Maecenas in turpis a odio accumsan vestibulum.</h2>
              <p>Ut vel purus ornare, lacinia nibh sit amet, interdum nisl. Ut aliquam erat id nulla scelerisque, vitae viverra arcu ultricies.</p>
            </div>
            <div className={styles['kroki__image']}>
              <Image src={'/images/serai/kroki-2.png'} width={670} height={501} alt='kroki 2' />
            </div>
          </div>
        </section>

        <section className={styles['image']}>
          <picture>
            <source media="(max-width: 768px)" srcSet={'/images/serai/img-2.jpg'} />
            <Image src={'/images/serai/img-2.jpg'} width={1920} height={980} alt='Serai One' />
          </picture>
        </section>

        <section className={styles['slider']}>
          <div className={styles['slider__container']}>
            <h2>Fusce a congue sollicitudin a eu nisl.</h2>
            <p>Ut vel purus ornare, lacinia nibh sit amet, interdum nisl. Ut aliquam erat id nulla scelerisque, vitae viverra arcu ultricies.</p>
          </div>
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            slidesPerView={'auto'}
            spaceBetween={24}
            centeredSlides
            navigation
            loop
            className={classNames(styles['slider__carousel'], 'slider__carousel')}
          >
            <SwiperSlide><Image src={'/images/serai/slider-1.jpg'} width={1086} height={502} alt='Slide' /></SwiperSlide>
            <SwiperSlide><Image src={'/images/serai/slider-1.jpg'} width={1086} height={502} alt='Slide' /></SwiperSlide>
            <SwiperSlide><Image src={'/images/serai/slider-1.jpg'} width={1086} height={502} alt='Slide' /></SwiperSlide>
            <SwiperSlide><Image src={'/images/serai/slider-1.jpg'} width={1086} height={502} alt='Slide' /></SwiperSlide>
          </Swiper>
        </section>
      </Layout>
    </>
  )
}
