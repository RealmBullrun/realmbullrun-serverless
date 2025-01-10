import { decode } from "punycode"

export default function PunyCode({ value, prefix, additionalClassName }: { value: string, prefix?: string, additionalClassName?: string }) {
  
  if (!value || !value.startsWith("xn--"))
    return (<></>)
  
  try {
    const codeValue = value.split(".")[value.split(".").length - 1].substring(4)
    const asciiValue = decode(codeValue)
    return (
      <div className={`${additionalClassName}`}>
        { prefix }{ asciiValue }
      </div>
    )
  } catch (error) {
    return (<></>)
  }
}