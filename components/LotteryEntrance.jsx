import { useWeb3Contract, useMoralis } from 'react-moralis'
import { abi, contractAddresses } from '../constants'

const LotteryEntrance = () => {
  const { chainId } = useMoralis()
  console.log('Chain ID: ' + chainId)
  /* const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi: abi,
    contractAddress: contractAddresses,
    functionName: 'enterRaffle',
  }) */

  return <div>LotteryEntrance</div>
}

export default LotteryEntrance
