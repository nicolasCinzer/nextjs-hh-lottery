import React from 'react'
import { ConnectButton } from 'web3uikit'

const Header = () => {
  return (
    <div
      className='
      flex 
      flex-row 
      mb-6
      p-4 
      place-content-between 
      items-center
      shadow-md'
    >
      <h1 className='p-4 text-3xl font-thin antialiased'>Decentralized Raffle</h1>
      <ConnectButton moralisAuth={false} />
    </div>
  )
}

export default Header
