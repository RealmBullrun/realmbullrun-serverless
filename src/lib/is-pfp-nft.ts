export default function isPfpNft (elem: any) {
  if (!elem || typeof elem !== "object" || !elem.data || !elem.data.mint_data)
    return false

  const { fields } = elem.data.mint_data
  if (!fields)
    return false

  let found = false
  try {
    Object.keys(fields).map((keyStr: string) => {
      if (keyStr !== "args") {
        if (keyStr.endsWith("jpg") || keyStr.endsWith("png") || keyStr.endsWith("webp") || keyStr.endsWith("jpeg") || keyStr.endsWith("ico")) {
          found = true
        }
      }
    })
    return found
  } catch (error) {
    return false
  }
}