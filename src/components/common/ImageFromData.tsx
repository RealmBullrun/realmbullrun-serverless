import Image from "next/image";

export const ImageFromData = ({ imageData, key, additionalClass = "" }: { imageData: string, key?: string, additionalClass?: string }) => {

  const toImageSrc = (value: string) => {
    if (!value || typeof value !== "string")
      return "/placeholder-pink.png"
    if (value.startsWith('data:image'))
      return value
    let base64ImageData = Buffer.from(value, 'hex').toString('base64')
    return `data:image/png;base64,${base64ImageData}`
  }

  return (
    <div>
      <Image className={`${additionalClass} rounded-lg shadow-[0px_0px_40px_4px_rgba(117,141,179,0.31)]`} width={256} height={256} src={toImageSrc(imageData)} alt="No Image Found" />
    </div>
  )
}
