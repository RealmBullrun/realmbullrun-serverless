import axios from "axios"

export default async function getRealmNamesFromOnChainByFilter (filter: string) {

  const APIEndpoint = `${process.env.NEXT_PUBLIC_CURRENT_PROXY}/blockchain.atomicals.find_realms?params=[\"${filter}\", 0, 5, 0]`
  // [`${filter}`, 0, limit, 0]

  const response = await axios.get(APIEndpoint)

  if (response.data && response.data.success) {
    let { result }: { result: any[] } = response.data.response
    return result
  }

  return []

}