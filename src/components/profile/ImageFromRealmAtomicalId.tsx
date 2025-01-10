import { useContext, useEffect, useState } from "react"
import { AppContext } from "@/providers/AppContextProvider"

import getProfileFromAtomicalId from "@/lib/get-profile-from-atomical-id"
import { ImageFromUri } from "./ImageFromUri"

const IMAGE_PLACEHOLDER_URI = "/plus.png"

export const ImageFromRealmAtomicalId = ({ atomicalId = "", additionalClass = "" }: { atomicalId: string, additionalClass?: string }) => {

  const { network } = useContext(AppContext)

  const [finding, setFinding] = useState(true)
  const [imageUri, setImageUri] = useState(IMAGE_PLACEHOLDER_URI)

  useEffect(() => {
    setFinding(true)
    const fetchData = async () => {
      if (atomicalId) {
        const profileMap = await getProfileFromAtomicalId(atomicalId, network)
        if (profileMap) {
          const { image } = profileMap
          if (image) {
            setImageUri(image)
          }
        }
      }
      setFinding(false)
    }
    fetchData();
  }, [atomicalId, network])

  return (
    <div className="mx-auto">
      <ImageFromUri loading={finding} uri={imageUri} additionalClass={additionalClass} />
    </div>
  )
}