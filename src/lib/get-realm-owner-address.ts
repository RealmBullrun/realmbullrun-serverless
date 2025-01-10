import axios from "axios"
import { detectScriptToAddressType } from "@/app/atomical-lib/utils/address-helpers"

export default async function getRealmOwnerAddress(fullrealmname: string, network: string) {

  let APIEndpoint = `${network === "testnet" ? process.env.NEXT_PUBLIC_CURRENT_PROXY_TESTNET : process.env.NEXT_PUBLIC_CURRENT_PROXY}/blockchain.atomicals.get_realm_info?params=[\"${fullrealmname}\",0]`

  const response = await axios.get(APIEndpoint)

  if (response.data && response.data.success) {
    const { atomical_id } = response.data.response.result
    if (atomical_id) {
      APIEndpoint = `${network === "testnet" ? process.env.NEXT_PUBLIC_CURRENT_PROXY_TESTNET : process.env.NEXT_PUBLIC_CURRENT_PROXY}/blockchain.atomicals.get_location?params=[\"${atomical_id}\"]`
      const response = await axios.get(APIEndpoint)
      if (response.data && response.data.success) {
        const { location_info } = response.data.response.result
        if (location_info && location_info.length > 0) {
          const { script } = location_info[0]
          const address = detectScriptToAddressType(script)
          return address
        }
      }
    }
  }

  return "null"
}