import Link from 'next/link'

import { Nav, Logo } from '../';

import styles from './Header.module.scss';

export const Header = () => { 
  return (
    <header className={styles['header']}>
      <div className={styles['header-container']}>
        <div className={styles['logo']}>
          <Logo />
        </div>
        <Nav className={styles['nav']} />
        <div className={styles['right-nav']}>
          <Link href='/customize'>Custimize Your Home</Link>
        </div>
      </div>
    </header>
  )
}
