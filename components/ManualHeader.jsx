import React, { useEffect } from 'react'

import { useMoralis } from 'react-moralis'

const Header = () => {
  const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3, isWeb3EnableLoading } =
    useMoralis()

  /* Remember if account has been connected recently */
  useEffect(() => {
    if (isWeb3Enabled) return
    if (typeof window !== 'undefined') {
      if (window.localStorage.getItem('connected')) {
        enableWeb3()
      }
    }
  }, [isWeb3Enabled])

  /* Listening to account switch and prevent autoconnect to wallet */
  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`)
      if (account == null) {
        window.localStorage.removeItem('connected')
        deactivateWeb3()
        console.log('Null account found')
      } 
    })
  }, [account])

  return (
    <div>
      {account ? (
        <div>Connected to {account}</div>
      ) : (
        <button
          onClick={async () => {
            await enableWeb3()
            if (typeof window !== 'undefined') {
              window.localStorage.setItem('connected', 'injected')
            }
          }}
          disabled={isWeb3EnableLoading}
        >
          Connect
        </button>
      )}
    </div>
  )
}

export default Header