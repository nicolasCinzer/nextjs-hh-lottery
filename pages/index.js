import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Decentralized Raffle</title>
        <meta name="description" content="Smart contract raffle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      Hi
    </div>
  )
}
