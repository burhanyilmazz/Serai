import Image from 'next/image'
import Link from 'next/link'
import classNames from 'classnames';

import { Nav, SocialMedia } from '../';

import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles['footer']}>
      <div className={classNames('container-fluid', styles['container'])}>
        <div>
          <Link href='/'>
            <Image src={'/images/logo/logo-2.svg'} width={'116'} height={'60'} alt={'Serai'} />
          </Link>
        </div>
        <div className={styles['footer__nav']}>
          <Nav />
        </div>

        <div className={styles['footer__address']}>
          <h5>SERAI HQ</h5>
          <p>Serai AG <br />
          Dufourstrasse 49 8008 Zürich<br />
          +41 44 688 01 68</p>

          <h5>SERAI ISTANBUL REPRESENTATION</h5>
          <p>Torun Center, D-Blok, K:10 D:43<br />
          Sisli Istanbul<br />
          +90 212 922 15 23</p>
        </div>
        <div className={styles['footer__social-media']}>
          <SocialMedia />
        </div>
        <div className={styles['footer__copyright']}>
          Copyright &copy; 2022 Serai
        </div>
        <div className={styles['footer__terms']}>
          <Link href='/'>Terms of Service</Link>
          <Link href='/'>Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}