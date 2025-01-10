import ClickToChoosePFP from "./ClickToChoosePFP"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import ImageFromDataClickable from "../common/ImageFromDataClickable"
import NameEdit from "./NameEdit"
import DescriptionEdit from "./DescriptionEdit"
import LinksEdit from "./LinksEdit"
import DonatesEdit from "./DonatesEdit"
import { useContext, useEffect, useState } from "react"
import getAtomicalInfoFromId from "@/lib/get-atomical-info-from-id"
import { AppContext } from "@/providers/AppContextProvider"

export default function Profile ({
  atomical_id,
  pfpNftList
}: {
  atomical_id: string,
  pfpNftList: any[]
}) {

  const { network } = useContext(AppContext)
  const [selectedPFPId, setSelectedPFPId] = useState<string>("")
  const [selectedPFPData, setSelectedPFPData] = useState<any>()
  const [isPFPSheetOpen, setIsPFPSheetOpen] = useState(false)
  const [profileName, setProfileName] = useState("Click to edit your name")
  const [profileDescription, setProfileDescription] = useState("Click to write your bio or description.")
  const [links, setLinks] = useState<any>([])
  const [donates, setDonates] = useState<any>([])

  useEffect(() => {
    const fetchData = async (id: string) => {
      const res = await getAtomicalInfoFromId(id, network)
      if (res && (res.confirmed || res.confirmed === "true") && res.mint_data && res.mint_data.fields) {
        const { name, desc, image, links: linksObject, collections: collectionsObject, wallets: walletsObject } = res.mint_data.fields
        if (name)
          setProfileName(name)
        if (desc)
          setProfileDescription(desc)
        if (image)
          setSelectedPFPData(image)
        // if (linksObject)
        //   setLinks(linksObject)
        // if (walletsObject)
        //   setDonates(walletsObject)
      }
    }
    fetchData(atomical_id)
  }, [atomical_id])

  return (
    <div className="text-center justify-center lg:w-6/12 lg:mx-auto mx-8">
      <ClickToChoosePFP atomicalId={selectedPFPId} data={selectedPFPData} onClick={() => setIsPFPSheetOpen(true)} />
      <Sheet open={isPFPSheetOpen} onOpenChange={() => setIsPFPSheetOpen(false)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Choose one of your NFT as your avatar.</SheetTitle>
            <SheetDescription>
              <ScrollArea className="h-[calc(100vh-120px)]">
                <div className="flex flex-col gap-4">
                  {
                    pfpNftList.map((elem: any) => (
                      <ImageFromDataClickable 
                        onClick={(data: any) => {
                          setSelectedPFPId(elem.atomical_id)
                          setSelectedPFPData(data)
                          setIsPFPSheetOpen(false)
                        }} 
                        data={elem.data} 
                        key={elem.atomical_id} 
                      />
                    ))
                  }
                </div>
              </ScrollArea>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <div className="flex flex-col gap-4 mt-6">
        <NameEdit value={profileName} onEdit={(data: any) => setProfileName(data || "Click to edit your name")} />
        <DescriptionEdit value={profileDescription} onEdit={(data: any) => setProfileDescription(data || "Click to write your bio or description.")} />
        <LinksEdit value={links} onEdit={(data: any) => setLinks(data)} />
        <DonatesEdit value={donates} onEdit={(data: any) => setDonates(data)} />
      </div>
    </div>
  )
}