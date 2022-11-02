import { useState, useEffect } from 'react';
import Image from 'next/image'
import classNames from 'classnames';

import styles from '../assets/styles/Customize.module.scss'
import { Logo, Detail, CustomTitle, CustomListButton, CustomListRadio } from '../components';

export default function Customize() {
  const [isShowDetail, setIsShowDetail] = useState(false)
  const exterior = [
    {
      id: 1,
      title: 'Reynisfjara (Black)',
      image: '/images/custom/thumb-1.jpg',
      selected: true,
      price: 0,
      tooltip: {
        title: 'Lapland',
        description: 'Ahşap meşe parke. Açık rengi ile ferah atmosfer sağlar. Suya ve lekelenmelere karşı dirençlidir. UV dayanımı yüksek son kalite parke darbelere karşı dayanıklıdır.'
      }
    },
    {
      id: 2,
      title: 'Reynisfjara (Natural Wood)',
      image: '/images/custom/thumb-1.jpg',
      price: 800,
      description: '+ 200 $',
      tooltip: {
        title: 'Lapland',
        description: 'Ahşap meşe parke. Açık rengi ile ferah atmosfer sağlar. Suya ve lekelenmelere karşı dirençlidir. UV dayanımı yüksek son kalite parke darbelere karşı dayanıklıdır.'
      }
    }
  ]

  const interior = [
    {
      id: 1,
      title: 'Reynisfjara (Black)',
      image: '/images/custom/thumb-1.jpg',
      tooltip: {
        title: 'Lapland',
        description: 'Ahşap meşe parke. Açık rengi ile ferah atmosfer sağlar. Suya ve lekelenmelere karşı dirençlidir. UV dayanımı yüksek son kalite parke darbelere karşı dayanıklıdır.'
      },
      walls: {
        id: 11,
        price: 0,
        selected: true
      },
      floors: {
        id: 12,
        price: 0,
        selected: true
      }
    },
    {
      id: 2,
      title: 'Rubjerg (Yellow)',
      image: '/images/custom/thumb-1.jpg',
      price: 800,
      description: '+ 200 $',
      tooltip: {
        title: 'Lapland',
        description: 'Ahşap meşe parke. Açık rengi ile ferah atmosfer sağlar. Suya ve lekelenmelere karşı dirençlidir. UV dayanımı yüksek son kalite parke darbelere karşı dayanıklıdır.'
      },
      walls: {
        id: 21,
        price: 200,
      },
      floors: {
        id: 22,
        price: 200,
      }
    },
    {
      id: 3,
      title: 'Lapland (White)',
      image: '/images/custom/thumb-1.jpg',
      price: 800,
      description: '+ 200 $',
      tooltip: {
        title: 'Lapland',
        description: 'Ahşap meşe parke. Açık rengi ile ferah atmosfer sağlar. Suya ve lekelenmelere karşı dirençlidir. UV dayanımı yüksek son kalite parke darbelere karşı dayanıklıdır.'
      },
      walls: {
        id: 31,
        price: 200,
      },
      floors: {
        id: 32,
        price: 200,
      }
    }
  ]

  const appliances = [
    {
      id: 1,
      title: 'None',
      description: 'Free',
      selected: true,
      price: 0,
    },
    {
      id: 2,
      title: 'Ready for dinner',
      price: 200,
      description: '+ 200 $',
      tooltip: {
        title: 'Lapland',
        description: 'Ahşap meşe parke. Açık rengi ile ferah atmosfer sağlar. Suya ve lekelenmelere karşı dirençlidir. UV dayanımı yüksek son kalite parke darbelere karşı dayanıklıdır.'
      }
    },
  ]

  const mind = [
    {
      id: 1,
      title: 'Residence (No Iot, no AI)',
      selected: true,
      price: 0
    },
    {
      id: 2,
      title: 'Assistant (IoT, no AI)',
      price: 200,
      description: '+ 200 $',
    },
    {
      id: 3,
      title: 'Doppelganger (IoT & AI)',
      price: 200,
      description: '+ 200 $',
      soon_status: true
    },
  ]

  return (
    <>
      <section className={styles['customize']}>
        <div className={styles['customize__logo']}><Logo /></div>

        <div className={styles['content']}>
          <Image src='/images/custom/img-1.jpg' width={1388} height={980} alt={''} />
        </div>

        <sidebar className={styles['custom']}>
          <>
            <div className={styles['head']}>
              <h1>Serai One</h1>
              <p>Est. Delivery: Oct - Dec 2022</p>
              <span onClick={() => setIsShowDetail(true)}>Learn about materials</span>
            </div>

            <div className={styles['body']}>
              <div className={styles['group']}>
                <CustomTitle 
                  page={'1/6'}
                  title={'Exterior'}
                  desc={'Ut vel purus aliquam erat id nulla scelerisque, vitae viverra arcu ultricies.'}
                  onClick={() => console.log('hello')}
                />
                <CustomListButton data={exterior} onClick={(item) => console.log(item)} />
              </div>

              <div className={styles['group']}>
                <CustomTitle 
                  page={'2/6'}
                  title={'Interior'}
                  desc={'Ut vel purus aliquam erat id nulla scelerisque, vitae viverra arcu ultricies.'}
                  onClick={() => console.log('hello')}
                />
                <CustomListRadio data={interior} onClick={(item) => console.log(item)} />

                <div className={styles['group__child']}>
                  <CustomTitle 
                    page={'3/6'}
                    subtitle={'Appliances'}
                  />
                  <CustomListButton data={appliances} onClick={(item) => console.log(item)} />
                </div>

                <div className={styles['group__child']}>
                  <CustomTitle 
                    page={'4/6'}
                    subtitle={'Mind'}
                  />
                  <CustomListButton data={mind} onClick={(item) => console.log(item)} />
                </div>
              </div>
            </div>

            <div className={styles['foot']}>
              <div className={styles['foot__title']}>Total Price:</div>
              <div className={styles['foot__total']}>$82.000</div>
            </div>
          </>
        </sidebar>
      </section>

      <Detail isShow={isShowDetail} onClickClose={() => setIsShowDetail(false)} />
    </>
  )
}
