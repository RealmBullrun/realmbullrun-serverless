import axios from "axios"

export default async function getStateHistoryFromAtomicalId (atomicalId: string, network: string) {

  const APIEndpoint = `${network === "testnet" ? process.env.NEXT_PUBLIC_CURRENT_PROXY_TESTNET : process.env.NEXT_PUBLIC_CURRENT_PROXY}/blockchain.atomicals.get_state_history?params=[\"${atomicalId}\"]`

  const response = await axios.get(APIEndpoint)

  if (response.data && response.data.success) {
    let { history }: { history: any[] } = response.data.response.result.state
    history.sort((a: any, b: any) => a.height - b.height)
    return history
  }

  return []

}