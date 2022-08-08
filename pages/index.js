import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Decentralized Raffle</title>
        <meta name="description" content="Smart contract raffle" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Hi
    </div>
  )
}
