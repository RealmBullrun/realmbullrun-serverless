"use client"
import { useContext, useEffect, useState } from "react"
import { Separator } from "../ui/separator"
import DonateIcon from "./DonateIcon"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import QRCode from "react-qr-code"
import { AppContext } from "@/providers/AppContextProvider"
import { ClipboardCopyIcon } from "lucide-react"

export const Donates = ({ donates, fullrealmname }: { donates: any, fullrealmname: string }) => {

  const { tlr, showAlert } = useContext(AppContext)
  const [donateList, setDonateList] = useState<any[]>([])
  const [donateModalOpen, setDonateModalOpen] = useState(false)
  const [coinName, setCoinName] = useState("")
  const [qrCode, setQrCode] = useState("")

  useEffect(() => {
    if (donates) {
      let arr: any = []
      Object.keys(donates).map((donateKey: any) => {
        const { address } = donates[donateKey]
        arr.push({
          type: donateKey,
          address
        })
      })
      setDonateList(arr)
    }
  }, [donates])

  const onCloseDonateModal = () => setDonateModalOpen(false)

  const onDonateModal = (data: string, type: string) => {
    setQrCode(data)
    setCoinName(type)
    setDonateModalOpen(true)
  }

  return (
    <div className={`flex flex-col gap-4 `}>
      {
        donateList && donateList.map((elem: any) => {
          let type = "btc"
          if (elem && elem.type)
            type = elem.type.toString()
          let addr = "??????????"
          if (elem && elem.address)
            addr = elem.address.toString()
          const short_addr = `${addr.substring(0, 5)}...${addr.substring(addr.length - 5, addr.length)}`
          return (
            <div onClick={() => onDonateModal(addr, type)} key={`${type}${addr}`} className="flex flex-row gap-2 items-center cursor-pointer">
              <div><DonateIcon type={type} /></div>
              <div>{short_addr}</div>
            </div>
          )
        })
      }
      <Dialog open={donateModalOpen} onOpenChange={onCloseDonateModal} modal>
        <DialogContent className="w-10/12">
          <DialogHeader>
            <DialogTitle>{`Send ${coinName.toUpperCase()} to +${fullrealmname}`}</DialogTitle>
            <DialogDescription>
              <div className="flex flex-row justify-center space-x-3 w-full text-center mt-6">
                <div>
                  {`${qrCode.substring(0, 5)}.....${qrCode.substring(qrCode.length - 5, qrCode.length)}`}
                </div>

                <ClipboardCopyIcon
                  className="cursor-pointer"
                  onClick={() => {
                    if (typeof navigator !== "undefined") {
                      navigator.clipboard.writeText(qrCode)
                      showAlert('Copied to clipboard !')
                    }
                  }} />
              </div>
              <div className="h-auto max-w-[320px] w-full mx-auto">
                <QRCode
                  className="mt-4 bg-white p-4"
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={qrCode}
                  viewBox={`0 0 256 256`}
                />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}