"use client"
import Image from "next/image"
import Link from "next/link"

export const ImageFromUri = ({ uri, key, loading = false, additionalClass = "" }: { uri: string, key?: string, loading?: boolean, additionalClass?: string, isStorage?: boolean }) => {

  const getExternalLink = (uri: string) => {
    if (uri.startsWith("atom:btc:id"))
      return `https://atomicalmarket.com/atomical/${uri.substring(12)}`
    if (uri.startsWith("atom:btc:dat"))
      return `https://atomicalmarket.com/atomical/${uri.substring(12)}`
    if (uri.startsWith("ord:btc:id"))
      return `https://ordiscan.com/atomical/${uri.substring(12)}`
    return "#"
  }

  const fallback = (event: any) => {
    event.target.src = '/placeholder-pink.png'
    event.target.srcset = '/placeholder-pink.png'
  }

  if (!uri || uri === "atom:btc:id:" || uri === "atom:btc:dat:" || uri === "ord:btc:id:")
    return (
      <Image onError={fallback} className={`${additionalClass} rounded-lg w-40 h-40 image-pixel`} width={144} height={144} src="/placeholder-pink.png" alt="No Image Found" />
    )

  return (
    // <Link href={`https://realmbullrun.com/`} target="_blank">
    <>
      {
        uri.startsWith("atom:btc:id") ? (
          <Image onError={fallback} className={`${additionalClass} rounded-lg w-40 h-40 image-pixel cursor-pointer`} width={144} height={144} src={`${process.env.NEXT_PUBLIC_BACKEND_APIENDPOINT}/image?uri=${uri}`} alt="No Image Found" />
        ) : uri.startsWith("atom:btc:dat") ? (
          <Image onError={fallback} className={`${additionalClass} rounded-lg w-40 h-40 image-pixel cursor-pointer`} width={144} height={144} src={`${process.env.NEXT_PUBLIC_CURRENT_URN_PROXY}/${uri}`} alt="No Image Found" />
        ) : uri.startsWith("ord:btc:id") ? (
          // <iframe className="rounded-lg w-40 h-40 overflow-x-hidden overflow-y-hidden" src={`https://ordinals.com/preview/${uri.split(":id:")[1]}`} />
          <img onError={fallback} className={`${additionalClass} rounded-lg w-40 h-40 image-pixel cursor-pointer`} src={`https://ordinals.com/content/${uri.split(":id:")[1]}`} alt="No Image Found" />
        ) : (
          <Image onError={fallback} className={`${additionalClass} rounded-lg w-40 h-40 image-pixel cursor-pointer`} width={144} height={144} src="/placeholder-pink.png" alt="No Image Found" />
        )
      }
    </>
    // </Link>
  )
}