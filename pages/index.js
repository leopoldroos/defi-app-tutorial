import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>DeFi App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          following DeFi App <a href="https://www.youtube.com/watch?v=CgXQC4dbGUE">tutorial</a>
        </h1>

        <p className={styles.description}>
          Lets start...
          <code className={styles.code}>pages/index.js</code>
        </p>
      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
