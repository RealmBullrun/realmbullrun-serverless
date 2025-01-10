export default function isProfileNft (elem: any) {
  if (!elem || typeof elem !== "object" || !elem.data || !elem.data.mint_data)
    return false

  let { fields } = elem.data.mint_data
  if (fields.fields)
    fields = fields.fields

  let nameFound, descFound, vFound, imageFound, linksFound
  try {
    Object.keys(fields).map((keyStr: string) => {
      if (keyStr === "name")
        nameFound = true
      if (keyStr === "desc")
        descFound = true
      if (keyStr === "v")
        vFound = true
      // if (keyStr === "image")
      //   imageFound = true
      // if (keyStr === "links")
      //   linksFound = true
    })
    return nameFound && descFound && vFound
  } catch (error) {
    return false
  }
}