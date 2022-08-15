import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/Header'
import LotteryEntrance from '../components/LotteryEntrance'

export default function Home() {
  return (
    <div
      className='
        h-screen
        bg-gradient-to-r 
      from-purple-500 
      to-pink-500
      '
    >
      <Head>
        <title>Decentralized Raffle</title>
        <meta name='description' content='Smart contract raffle' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <LotteryEntrance />
    </div>
  )
}
