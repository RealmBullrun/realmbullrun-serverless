import axios from "axios"

export default async function getMintStatus () {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_APIENDPOINT}/profile/claimed`)
    const { result, subrealms, subrealmCount, profileSetCount } = response.data
    if (result === "success")
      return {
        subrealms,
        subrealmCount,
        profileSetCount
      }
  } catch (error) {
  }

  return {
    subrealms: [],
    subrealmCount: 0,
    profileSetCount: 0
  }
}