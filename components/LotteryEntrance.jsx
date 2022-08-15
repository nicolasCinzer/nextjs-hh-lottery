import { useEffect, useState } from 'react'
import { useWeb3Contract, useMoralis } from 'react-moralis'
import { abi, contractAddresses } from '../constants'
import { ethers } from 'ethers'
import { useNotification } from 'web3uikit'

const LotteryEntrance = () => {
  const dispatch = useNotification()

  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
  const chainId = parseInt(chainIdHex)
  let raffleAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null

  const [entranceFee, setEntranceFee] = useState('0')
  const [numberOfPlayers, setNumberOfPlayers] = useState(0)
  const [recentWinner, setRecentWinner] = useState('')

  /* CONTRACT FUNCTIONS */
  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: 'getEntranceFee',
    params: {},
  })

  // const { runContractFunction: getRaffleState } = useWeb3Contract({
  //   abi: abi,
  //   contractAddress: raffleAddress,
  //   functionName: 'getRaffleState',
  //   params: {},
  // })

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: 'getNumberOfPlayers',
    params: {},
  })

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: 'getRecentWinner',
    params: {},
  })

  const {
    runContractFunction: enterRaffle,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: 'enterRaffle',
    params: {},
    msgValue: entranceFee,
  })

  /* useEffect */
  const updateUI = async () => {
    let entranceFeeFromContract = (
      await getEntranceFee({
        onError: (error) => console.log(`ERROR GETTING ENTRANCE FEE: ${error}`),
      })
    ).toString()

    let numberOfPlayers = (
      await getNumberOfPlayers({
        onError: (error) => console.log(`ERROR GETTING NUMBER OF PLAYERS: ${error}`),
      })
    ).toString()

    let recentWinner = await getRecentWinner({
      onError: (error) => console.log(`ERROR GETTING RECENT WINNER: ${error}`),
    })

    setNumberOfPlayers(numberOfPlayers)
    setRecentWinner(recentWinner)
    setEntranceFee(entranceFeeFromContract)
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI()
    }
  }, [isWeb3Enabled])

  /* Handlers */
  const handleSucces = async (tx) => {
    await tx.wait(1)
    handleNewNotification()
    updateUI()
  }

  const handleError = async (tx) => {
    console.log(tx)
    dispatch({
      type: 'error',
      message: tx.message,
      title: `Oops! ERROR ${tx.code}`,
      position: 'bottomR',
    })
  }

  const handleNewNotification = () => {
    dispatch({
      type: 'success',
      message: 'You are participating in the lottery! Good job!',
      title: 'Transaction Succes!',
      position: 'bottomR',
    })
  }

  return (
    <div className='px-8 flex flex-col'>
      {raffleAddress ? (
        <>
          <div className='flex justify-center mb-6'>
            <button
              onClick={async () => {
                await enterRaffle({
                  onSuccess: handleSucces,
                  onError: handleError,
                })
              }}
              className='uppercase font-bold border-2 p-4 border-black w-1/2 hover:shadow-2xl'
              disabled={isLoading || isFetching}
            >
              Enter the Raffle
            </button>
          </div>
          <div className='flex justify-around'>
            <div>
              ENTRANCE FEE{' '}
              <div className='flex justify-center text-2xl font-thin'>
                {ethers.utils.formatUnits(entranceFee)} ETH
              </div>
            </div>
            <div>
              NUMBER OF PLAYERS <div className='flex justify-center text-2xl font-thin'>{numberOfPlayers}</div>
            </div>
          </div>
          <p className='flex justify-center text-lg mt-8 border-t-2 p-4 border-t-black/10 uppercase'>
            Recent Winner
          </p>
          <p className='flex justify-center text-3xl antialiased font-thin text-black-200 shadow-xl blur-md hover:blur-none'>
            {recentWinner}
          </p>
        </>
      ) : (
        <div>No web3 wallet detected</div>
      )}
    </div>
  )
}

export default LotteryEntrance
