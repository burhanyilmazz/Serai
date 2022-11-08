import { useState } from 'react';
import Link from 'next/link'

import { Nav, Logo, Hamburger, SocialMedia } from '../';

import styles from './Header.module.scss';
import classNames from 'classnames';

export const Header = () => { 
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className={styles['header']}>
      <div className={styles['header-container']}>
        <div className={styles['logo']}>
          <Logo />
        </div>
        <Hamburger onClick={(event) => setIsOpen(event)}/>
        <div className={classNames(styles['nav'], {[styles['nav--open']]: isOpen})}>
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
