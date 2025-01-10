import axios from "axios"

export default async function getSubrealmsFromOnChain (atomicalId: string) {

  const APIEndpoint = `${process.env.NEXT_PUBLIC_CURRENT_PROXY}/blockchain.atomicals.find_subrealms?params=[\"${atomicalId}\"]`

  const response = await axios.get(APIEndpoint)

  if (response.data && response.data.success) {
    let { result }: { result: any[] } = response.data.response
    return result
  }

  return []

}