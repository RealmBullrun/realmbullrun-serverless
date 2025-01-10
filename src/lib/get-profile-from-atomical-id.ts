import axios from "axios"
import getStateHistoryFromAtomicalId from "./get-state-history-from-atomical-id"
import getProfileFromDelegate from "./get-profile-from-delegate"

export default async function getProfileFromAtomicalId (atomicalId: string, network: string) {

  if (!atomicalId)
    return null

  const profileMap: any = {}
  const stateHistory = await getStateHistoryFromAtomicalId(atomicalId, network)

  if (!stateHistory)
    return null

  for (let i = 0; i < stateHistory.length; i++) {
    const { data } = stateHistory[i];
    if (data) {
      let { d }: { d: string } = data
      if (d) {
        if (d.startsWith("atom:btc"))
          d = d.split(":")[3]
        const updatedData = await getProfileFromDelegate(d, network)
        if (updatedData) {
          let { fields } = updatedData
          if (fields.fields)
            fields = fields.fields
          if (fields) {
            const { name, desc, image, links, wallets, collections } = fields
            if (name) {
              profileMap['name'] = name
            }
            if (desc) {
              profileMap['desc'] = desc
            }
            if (image) {
              profileMap['image'] = image
            }
            if (links) {
              profileMap['links'] = links
              // const linkKeys = Object.keys(links)
              // if (linkKeys) {
              //   linkKeys.map((linkNum: string) => {
              //     const { group, items } = links[linkNum]
              //     if (group && group === "social") {

              //     }
              //   })
              // }
            }
            if (wallets) {
              profileMap['wallets'] = wallets
            }
            if (collections) {
              profileMap['collections'] = collections
            }
          }
        }
      }
    }
  }

  return profileMap
}