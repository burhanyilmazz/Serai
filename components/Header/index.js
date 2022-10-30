import Image from 'next/image'
import Link from 'next/link'

import { Nav } from '../';

import styles from './Header.module.scss';

export const Header = () => { 
  return (
    <header className={styles['header']}>
      <div className={styles['header-container']}>
        <div className={styles['logo']}>
          <Link href='/'>
            <Image src={'/images/logo/logo.svg'} width={'101'} height={'52'} alt={'Serai'} />
          </Link>
        </div>
        <Nav className={styles['nav']} />
        <div className={styles['right-nav']}>
          <Link href='/'>Custimize Your Home</Link>
        </div>
      </div>
    </header>
  )
}
