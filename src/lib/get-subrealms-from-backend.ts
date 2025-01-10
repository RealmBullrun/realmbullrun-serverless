import axios from "axios"

export default async function getSubrealmsFromBackend( { filter = "", offset = 0, limit = 100, club = 0 }: { filter?: string, offset?: number, limit?: number, club?: number}) {

  // dummy for test
  // let arr: any = []
  // for (let i = 0; i < 1000; i ++) {
  //   const d = {
  //     id: 'a704fe8f-b710-4352-be06-542f1ace11b2_' + i,
  //     atomicalId: '47b71cc5c9d6157a632e46184c3d99a4fee897b7417e299bcc367971e1771c5ei0_' + i,
  //     atomicalNumber: '192707' + i,
  //     delegates: [],
  //     fullRealmName: 'bullrun.' + i,
  //     ownerAddress: null,
  //     name: '---',
  //     desc: '----------',
  //     pfpUri: null,
  //     socials: {},
  //     wallets: {},
  //     collections: {},
  //     createdAt: '2024-05-24T09:42:37.023Z',
  //     updatedAt: '2024-05-24T09:42:37.023Z'
  //   }
  //   if ( i >= offset * limit && i < (offset + 1) * limit)
  //     arr.push(d)
  // }
  // if (club === 1) {
  //   return arr
  // }
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_APIENDPOINT}/profile?filter=${filter}&offset=${offset}&limit=${limit}&club=${club}`)
    return response.data.data.rows    
  } catch (error) {
    return []
  }
}