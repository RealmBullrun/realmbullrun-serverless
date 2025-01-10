import { useContext } from "react"

import { AppContext } from "@/providers/AppContextProvider";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ImageFromData } from "@/components/common/ImageFromData";
import { DynamicIcon } from "../icons/DynamicIcon";
import Link from "next/link";
import Image from "next/image";

export const NftPreviewCard = ({ image, number, onDetail }: { image: string, number: string, onDetail: Function }) => {

  const { tlr } = useContext(AppContext)

  return (
    <Card onClick={() => onDetail(number)} className={`relative flex flex-col items-center w-full cursor-pointer max-w-44 mx-auto hover:shadow-[0px_0px_40px_4px_rgba(117,141,179,0.31)]`}>
      <div className="bg-background rounded-lg absolute top-0 right-0 border-0 text-sm py-1 px-2 rounded-tl-lg z-30">
        <span>{number}</span>
      </div>
      <CardHeader className=" p-2" >
        <Image className={`image-hover image-pixel rounded-lg shadow-[0px_0px_40px_4px_rgba(117,141,179,0.31)] `} width={512} height={512} src={`https://raw.githubusercontent.com/realmbullrun/bull-images/main/${image}`} alt="No Image Found" />
      </CardHeader>
    </Card>
  )
}