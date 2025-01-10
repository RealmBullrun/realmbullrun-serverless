"use client"
import Link from "next/link"
import { DynamicIcon } from "../icons/DynamicIcon"
import { useEffect, useState } from "react"
import { Button } from "../ui/button";

const typeToColorMap: { [key: string]: string } = {
  official: "#000000",
  twitter: "#1DA1F2",
  x: "#1DA1F2",
  facebook: "#4267B2",
  linkedin: "#0077B5",
  youtube: "#FF0000",
  github: "#333333",
  telegram: "#0088CC",
  discord: "#7289DA",
  instagram: "#E4405F",
  person: "#000000"
};

export const Links = ({ linksObject }: { linksObject: any }) => {

  const [linkList, setLinkList] = useState<any[]>([])

  useEffect(() => {
    let arr: any = []
    if (linksObject) {
      Object.keys(linksObject).map((linkKey: any) => {
        const value = linksObject[linkKey]
        if (value) {
          const { items } = value
          if (items) {
            Object.keys(items).map((itemKey: any) => {
              const { url, name, type } = items[itemKey]
              if (url && name && type)
                arr.push({
                  name,
                  url,
                  type
                })
            })
          }
        }
      })
      setLinkList(arr)
    }
  }, [linksObject])

  return (
    <div className="flex lg:flex-row flex-wrap flex-col gap-4">
      {
        linkList && linkList.map((elem: any) => (
          <Link href={elem.url} target="_blank" key={`${elem.type}${elem.url}${elem.type}`}>
            <Button style={{ backgroundColor: typeToColorMap[elem.type] || '#000' }} className="flex flex-row items-center gap-2 p-2 rounded text-white hover:scale-95">
              <DynamicIcon type={elem.type} color="white" />{elem.name}
            </Button>
          </Link>
        ))
      }
    </div>
  )
}