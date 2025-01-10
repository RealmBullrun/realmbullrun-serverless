import axios from "axios"

export default async function getAtomicalInfoFromId (atomicalId: string = "", network: string) {

  if (!atomicalId)
    return null

  const APIEndpoint = `${network === "testnet" ? process.env.NEXT_PUBLIC_CURRENT_PROXY_TESTNET : process.env.NEXT_PUBLIC_CURRENT_PROXY}/blockchain.atomicals.get?params=[\"${atomicalId}\"]`

  const response = await axios.get(APIEndpoint)

  if (response.data && response.data.success) {
    const atomicalData = response.data.response.result
    return atomicalData
  }

  return null

}