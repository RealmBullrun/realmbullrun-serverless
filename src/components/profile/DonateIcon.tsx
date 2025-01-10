import { BitcoinIcon } from '@/components/icons/BitcoinIcon'
import { BsCurrencyBitcoin } from 'react-icons/bs'
import { EthereumIcon } from '../icons/EthereumIcon'
import { LitecoinIcon } from '../icons/LitecoinIcon'
import { DogecoinIcon } from '../icons/DogecoinIcon'

export default function DynamicIcon ({ type }: { type: string }) {
  if (type === "bitcoin" || type === "btc")
    return (<BitcoinIcon />)
  if (type === "ethereum" || type === "eth")
    return (<EthereumIcon />)
    if (type === "litecoin" || type === "lite")
    return (<LitecoinIcon />)
  if (type === "dogecoin" || type === "doge")
    return (<DogecoinIcon />)
  return (<BsCurrencyBitcoin />)
}
