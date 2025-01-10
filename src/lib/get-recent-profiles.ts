import axios from "axios"

export default async function getRecentProfiles () {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_APIENDPOINT}/profile/recent`)
    return response.data.data.rows
  } catch (error) {
    return []
  }
}