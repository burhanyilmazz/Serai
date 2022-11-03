/* eslint-disable jsx-a11y/alt-text */
import PropTypes from 'prop-types';
import { Navigation, A11y, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './Carousel.module.scss';
import classNames from 'classnames';

export const Carousel = (props) => {
  const { data, className } = props;
  
  return (
    <div className={styles['carousel']}>
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop
        className={classNames('carousel__slider', className)}
      >
        {
          data?.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <Image src={item.image} width={1388} height={980} alt={'slide'} />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </div>
  )
}

Carousel.propTypes = {
	data: PropTypes.array,
  className: PropTypes.string
};