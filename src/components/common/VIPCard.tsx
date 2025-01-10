import Link from "next/link"
import Image from "next/image"

export default function VIPCard({ data, additionalClass = "" }: { data: any, additionalClass?: string }) {

  const { image } = data

  return (
    <Link href={data.href} target="_blank" title={`+${data.fullRealmName}`}>
      {
        data.fullRealmName === "bullrun.modordinal" ? (
          <Image className={`rounded-md mx-auto ${additionalClass}`} width={144} height={144} src="/modordinal.webp" alt="No Image Found" />
        ) : 
        !image ? (
          <Image className={`rounded-md mx-auto ${additionalClass}`} width={144} height={144} src="/placeholder-pink.png" alt="No Image Found" />
        ) : image.startsWith("atom:btc:id") ? (
          <Image className={`rounded-md mx-auto ${additionalClass}`} width={144} height={144} src={`${process.env.NEXT_PUBLIC_BACKEND_APIENDPOINT}/image?uri=${image}`} alt="No Image Found" />
        ) : image.startsWith("atom:btc:dat") ? (
          <Image className={`rounded-md mx-auto ${additionalClass}`} width={144} height={144} src={`${process.env.NEXT_PUBLIC_CURRENT_URN_PROXY}/${image}`} alt="No Image Found" />
        ) : image.startsWith("ord:btc:id") ? (
          <Image className={`rounded-md mx-auto ${additionalClass}`} width={144} height={144} src={`https://ordinals.com/content/${image.split(":id:")[1]}`} alt="No Image Found" />
          // <iframe className="rounded-md mx-auto overflow-x-hidden overflow-y-hidden" src={`https://ordinals.com/preview/${image.split(":id:")[1]}`} />
        ) : (
          <Image className={`rounded-md mx-auto ${additionalClass}`} width={144} height={144} src="/placeholder-pink.png" alt="No Image Found" />
        )
      }
    </Link>
  )
}