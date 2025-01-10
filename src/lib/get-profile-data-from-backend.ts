import axios from "axios"

export default async function getProfileDataFromBackend (realmname: string, network: string) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_APIENDPOINT}/profile/${realmname}`)
    return response.data    
  } catch (error) {
    return {}
  }
}