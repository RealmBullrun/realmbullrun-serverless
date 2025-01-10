import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "../ui/input"

export default function AddOrdinal ({ onSet = () => {} }: { onSet?: Function }) {

  const [imageUri, setImageUri] = useState("")
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [ordinalRef, setOrdinalRef] = useState("")

  useEffect(() => {
    setImageUri(`https://api.hiro.so/ordinals/v1/inscriptions/${ordinalRef}/content`)
  }, [ordinalRef])

  return (
    <div>
      <Button onClick={() => setDialogOpen(true)}>Add Ordinal</Button>
      <Dialog open={isDialogOpen} onOpenChange={() => setDialogOpen(false)} modal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Type in your Ordinal number or ID to set it as your PFP</DialogTitle>
            <DialogDescription>
              {/* <Image loader={() => imageUri} src={imageUri} height={320} width={320} alt="Input your Ordinal Number/ID" className="h-80 w-80 image-pixel my-4" /> */}
              <iframe src={imageUri} />
              <Input 
                placeholder="Type in your Ordinal number or ID to set it as your PFP"
                value={ordinalRef}
                onChange={(e) => setOrdinalRef(e.target.value)}
              />
              <Button onClick={() => {
                setDialogOpen(false)
                onSet(ordinalRef)
              }}>Set as PFP</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}