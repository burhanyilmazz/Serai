import { Layout } from '../layout'
import { Address, ContactForm, Hero, TeamCard } from '../components';

import styles from '../assets/styles/TheTeam.module.scss'

export default function TheTeam({theteam}) {

  return (
    <>
      <Layout address={theteam.slider}>
        <Hero 
          title={theteam.title}
          text={theteam.content}
          img={theteam.headerImage}
          mobile={theteam.headerMobile}
        />

        <section className={styles['team']}>
          <div className='container-fluid'>
            <div className={styles['team__list']}>
              <div className={styles['team__list--top']}>
                { theteam?.pinned_members?.map((item, index) => <TeamCard key={index} data={item} horizontal />)}
              </div>

              <div className={styles['team__list--bottom']}>
                { theteam?.team_members?.map((item, index) => <TeamCard key={index} data={item} />) }
              </div>
            </div>
          </div>
        </section>

        <section className={styles['contact']}>
          <div className='container-fluid'>
            <div className={styles['contact__grid']}>
              <Address data={theteam.slider} className={styles['address']} />
              <ContactForm className={styles['contact-form']}/>
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const theteam = await fetch(`${process.env.API_URL}/theteam`).then(r => r.json()).then(data => data.Result);

  return {
    props: {
      theteam
    }
  }
}