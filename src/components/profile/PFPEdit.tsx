import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { ImageFromUri } from "./ImageFromUri"

export default function PFPEdit({ value, onEdit }: { value: any, onEdit: Function }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [toAddId, setToAddId] = useState("189550")
  const [type, setType] = useState("atom:btc:id")

  useEffect(() => {
    onEdit(`${type}:${toAddId}`)
  }, [])

  useEffect(() => {
    const idx = value.lastIndexOf(":")
    if (idx > 0) {
      setType(value.substring(0, idx))
      setToAddId(value.substring(idx + 1, value.length))
    }

  }, [value])

  return (
    <div className="p-2 bg-background">
      <div className=" flex flex-col gap-x-10 gap-y-2 mx-auto items-center" onClick={() => setIsDialogOpen(true)}>
        <ImageFromUri uri={`${type}:${toAddId}`} additionalClass="cursor-pointer image-pixel" />
        <div className="cursor-pointer">Click here to set your own PFP.</div>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)} modal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add a Profile NFT.</DialogTitle>
            <DialogDescription>
              <ImageFromUri uri={`${type}:${toAddId}`} additionalClass="my-4 image-pixel" />
              <Select
                value={type}
                onValueChange={(val: any) => {
                  setType(val)
                  setToAddId("")
                }}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={"Select your image type"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={"atom:btc:id"}>Atomical NFT</SelectItem>
                  <SelectItem value={"atom:btc:dat"}>On-chain stored Atomical</SelectItem>
                  <SelectItem value={"ord:btc:id"}>Ordinal Inscription</SelectItem>
                </SelectContent>
              </Select>
              <Input
                value={toAddId}
                // placeholder={`${type}:xxx`}
                placeholder={`Input ${type === "atom:btc:id" ? "Atomical ID or Number" : type === "atom:btc:dat" ? "On-chain ID" : "Ordinal Number or ID"} here`}
                className="my-4"
                onChange={(event: any) => {
                  setToAddId(event.target.value)
                }}
              />
              <Button onClick={() => {
                onEdit(`${type}:${toAddId}`)
                setIsDialogOpen(false)
              }}>Save</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}