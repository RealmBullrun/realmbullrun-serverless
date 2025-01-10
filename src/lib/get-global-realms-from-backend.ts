import axios from "axios"

export default async function getGlobalRealmsFromBackend( { filter = "", offset = 0, limit = 100 }: { filter?: string, offset?: number, limit?: number }) {

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_APIENDPOINT}/profile/global?filter=${filter}&offset=${offset}&limit=${limit}`)
    return response.data.data.rows    
  } catch (error) {
    return []
  }
}