import { Layout } from '../layout'
import { Address, ContactForm, Hero, TeamCard } from '../components';

import styles from '../assets/styles/TheTeam.module.scss'

export default function TheTeam() {
  const teams = [
    {
      name: 'Eda Yavaş',
      title: 'Head Architect',
      description: 'İstanbul Teknik Üniversitesi Mimarlık bölümü mezunudur. Yeni nesil yaşam alanlarını tasarlamak için teknoloji ve mimarinin sınırlarını keşfeden Eda, "The Habitats Of Neonomads" isimli yüksek lisans tezi ile MEF Üniversitesi Mimari Tasarım Bölümü’nden M.Sc. ünvanını almıştır. ',
      image: '/images/teams/img-1.jpg',
      mobile: '/images/teams/img-1-m.jpg',
    },
    {
      name: 'Beyza Ayaz',
      title: 'Junior Architect',
      description: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
      image: '/images/teams/img-2.jpg',
      mobile: '/images/teams/img-2-m.jpg',
    },
    {
      name: 'Pınar Yaktıyol',
      title: 'Advisory Board Member',
      description: 'It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ',
      image: '/images/teams/img-3.jpg',
    },
    {
      name: 'Jonatton Doe',
      title: 'Advisory Board Member',
      description: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: '/images/teams/img-4.jpg',
    },
    {
      name: 'Selim Kimer',
      title: 'Advisory Board Member',
      description: 'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
      image: '/images/teams/img-5.jpg',
    }
  ]

  const contact = [
    {
      id: 1,
      title: "Switzerland HQ",
      address: "Horneggstrasse 9 CH-8008, Switzerland",
      phone: "+41 44 688 01 68",
      email: "info@seraispaces.com",
      coordinate: {lat: 47.3524789, lng: 8.5567775}
    },
    {
      id: 2,
      title: "Turkey Liaison Office",
      address: "Torun Center, D-Blok K:10 D:43 Sisli Istanbul Turkey",
      phone: "+90 212 922 15 23",
      coordinate: {lat: 41.0652702, lng: 28.9964436}
    }
  ]

  return (
    <>
      <Layout>
        <Hero 
          title={'The Team'}
          text={'Our Advisory Board boasts academic excellence, professional achievement, and a passion for technology.'}
          img={'/images/teams/hero.jpg'}
          mobile={'/images/home/slide-2.jpg'}
        />

        <section className={styles['team']}>
          <div className='container-fluid'>
            <div className={styles['team__list']}>
              <div className={styles['team__list--top']}>
                { 
                  teams.map((item, index) => {
                    if (index < 2) {
                      return <TeamCard key={index} data={item} horizontal />
                    }
                  })
                }
              </div>

              <div className={styles['team__list--bottom']}>
                { 
                  teams.map((item, index) => {
                    if (index > 1) {
                      return <TeamCard key={index} data={item} />
                    }
                  })
                }
              </div>
            </div>
          </div>
        </section>

        <section className={styles['contact']}>
          <div className='container-fluid'>
            <div className={styles['contact__grid']}>
              <Address data={contact} className={styles['address']} />
              <ContactForm  className={styles['contact-form']}/>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}
