import Image from 'next/image'

import { Layout } from '../layout'
import { Hero } from '../components';

import styles from '../assets/styles/OurStory.module.scss'

export default function OurStory() {
  return (
    <>
      <Layout>
        <Hero 
          title={'Our Story'}
          text={'Serai, insancıl ve sürdürülebilir bir yaklaşımla, mimari tasarım ve yapay zekanın birleştirilebilecek yeni yollarını keşfeder. '}
          img={'/images/story/hero.jpg'}
          mobile={'/images/story/hero-mobile.jpg'}
          bottom
        />

        <section className={styles['story']}>
          <div className={styles['story__content']}>
            <h2>Maecenas in turpis a odio accumsan vestibulum.</h2>
            <p>Derin akademik araştırmalarının ve deneyimli uygulama geçmişinin sentezinde malzemenin, yapım yöntemlerinin ve teknolojinin sınırlarını zorlar. Teknolojiyi zamanın ruhu ile iletişim kurma aracı olarak gören Serai, sunduğu kompakt ve esnek mimari çözümler ile kullanıcıyı ev konforunda hissettirmeye tutkuludur. Serai için ev öğrenen, gelişen ve yanıt veren yapay zeka donanımları sayesinde artık <b>canlı bir organizmadır.</b></p>
          </div>
          <div className={styles['story__images']}>
            <Image src={'/images/story/img.png'} width={1362} height={1034} alt='Yerleşim Planı' />
          </div>
          <div className={styles['story__content']}>
            <p>Mimarların yüzyıllar boyu devam eden <b>küçük yaşam alanlarının</b> sınırlarını keşfetme arzusu, bugün günlük yaşam rutinlerine entegre edilmiş yapay zeka teknolojileriyle desteklenen Serai iç mekanında form bulur. Serai geleceğin yaşam alanlarının gerekliliklerini sorgularken, gelenekten beslenir. Aslen Farsça (saray; avlu; konut) kökenli olan Serai, aynı anda kervana, avluya ve saraya atıfta bulunur. Öyleki, güneş ışığının tazeleyici etkisini evin kalbine alan merkezi planı sayesinde, malzeme dokularındaki yalınlık ve estetik kendini öne çıkarır. </p>
            <p>Mekânı  m2’ler üzerinden tanımlamayı geride bırakan Serai, var olduğu hacime 3. boyutta işlevler katmayı başarır. Kendisi de mobil olan ev, aynı prensibi esnek ve hareketli mobilyalar ile kullanıcılarına sunarak onları evin içerisinde yeni bir yolculuğa daha çıkarır. Cömert ve akılcı depolama alanları ile sağlanan ferah iç atmosfer, geniş pencereleri sayesinde kendini doğadan koparmaz fakat gerekli mahremiyeti sunar.</p>
          </div>
        </section>
      </Layout>
    </>
  )
}
