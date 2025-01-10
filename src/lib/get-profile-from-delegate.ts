import axios from "axios"

export default async function getProfileFromDelegate(delegate: string, network = "main") {

  if (!delegate)
    return null
  
  const APIEndpoint = `${network === "testnet" ? process.env.NEXT_PUBLIC_CURRENT_PROXY_TESTNET : process.env.NEXT_PUBLIC_CURRENT_PROXY}/blockchain.atomicals.get?params=[\"${delegate}\"]`

  const response = await axios.get(APIEndpoint)

  if (response.data && response.data.success) {
    const { mint_data } = response.data.response.result
    return mint_data
  }

  return null
}