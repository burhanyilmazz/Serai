import Link from 'next/link'

import { Nav, Logo, Hamburger, SocialMedia } from '../';

import styles from './Header.module.scss';

export const Header = () => { 
  return (
    <header className={styles['header']}>
      <div className={styles['header-container']}>
        <div className={styles['logo']}>
          <Logo />
        </div>
        <Hamburger />
        <div className={styles['nav']}>
          <Nav />
          <div className={styles['right-nav']}>
            <Link href='/customize'>Custimize Your Home</Link>
          </div>
          <SocialMedia className={styles['social-media']} />
        </div>
      </div>
    </header>
  )
}
