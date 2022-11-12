import Image from 'next/image'
import Link from 'next/link'
import classNames from 'classnames';

import { Nav, SocialMedia } from '../';

import styles from './Footer.module.scss';

export const Footer = ({address}) => {
  return (
    <footer className={styles['footer']}>
      <div className={classNames('container-fluid', styles['container'])}>
        <div className={styles['footer__logo']}>
          <Link href='/'>
            <picture>
              <source media="(max-width: 1024px)" srcSet="/images/logo/logo-text.svg" />
              <Image src={'/images/logo/logo-2.svg'} width={'116'} height={'60'} alt={'Serai'} />
            </picture>
          </Link>
        </div>
        <div className={styles['footer__nav']}>
          <Nav />
        </div>

        <div className={styles['footer__address']}>
          {
            address.map((item, index) => {
              return (
                <div key={index}>
                  <span>{item.title}</span>
                  <p>{item.address}<br /> {item.tel}</p>
                </div>
              )
            })
          }
        </div>
        <div className={styles['footer__social-media']}>
          <SocialMedia title />
        </div>
        <div className={styles['footer__copyright']}>
          Copyright &copy; 2022 Serai
        </div>
        <div className={styles['footer__terms']}>
          <Link href='/terms-of-service'>Terms of Service</Link>
          <Link href='/privacy-policy'>Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}