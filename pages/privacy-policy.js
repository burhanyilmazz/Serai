import { Layout } from '../layout'

import styles from '../assets/styles/Terms.module.scss'

export default function Terms({address}) {
  return (
    <>
      <Layout address={address}>
        <section className={styles['terms']}>
          <div className={styles['terms__container']}>
            <h1>Privacy Policy</h1>
            <h6>Our Advisory Board boasts academic excellence, professional achievement, and a passion for technology.</h6>

            <p>Duis rhoncus vehicula tempus. In nibh nisi, aliquam sed ex non, vulputate congue ipsum. Etiam nisl turpis, tempor at aliquet in, pellentesque et arcu. Nulla facilisi. Integer ornare eleifend ex. Aenean quis aliquet erat. Maecenas vestibulum orci at quam venenatis scelerisque.</p>
            <p>Pellentesque cursus hendrerit orci, quis viverra diam posuere commodo. Maecenas ac ex tincidunt, cursus enim non, accumsan arcu. Donec quis eleifend dolor. Praesent sollicitudin tellus non mollis malesuada. Duis aliquet ipsum purus, ac commodo lectus viverra a. In hac habitasse platea dictumst. Mauris pellentesque est nec nisi facilisis, at posuere elit ornare. Pellentesque non tortor quis justo pretium blandit id ac quam. Quisque tellus risus, facilisis id arcu at, iaculis convallis elit. Nullam at aliquam dolor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam finibus diam maximus scelerisque vulputate. Nulla a varius risus.</p>
            <p>Proin condimentum consequat condimentum. Mauris placerat eleifend interdum. Fusce malesuada, enim pulvinar porttitor tincidunt, quam risus tempus ex, ullamcorper molestie massa ligula ac ligula. Mauris fringilla faucibus neque et vestibulum. Cras in sapien non metus vestibulum gravida. Quisque eu efficitur ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Integer nec dignissim urna, a pulvinar ligula. Maecenas ornare blandit consequat. Maecenas vel tincidunt dolor, maximus imperdiet diam. Vivamus quis varius sapien. Quisque lobortis venenatis metus, ut rhoncus ipsum hendrerit in. Vestibulum sagittis elementum dui vel luctus. Quisque egestas sapien in orci faucibus dictum. Sed porta blandit lectus.</p>
          </div>
        </section>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  const address = await fetch(`${process.env.API_URL}/theteam`).then(r => r.json()).then(data => data.Result.slider);

  return {
    props: {
      address
    }
  }
}