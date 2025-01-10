export const getProfileJson = ({
  pfpUri,
  profileName,
  profileDescription,
  links,
  donates,
  collections
}: {
  pfpUri: any,
  profileName: any,
  profileDescription: any,
  links: any,
  donates: any,
  collections: any
}) => {
  
  let profile: any = {
    "v": "1.2",
  }

  let linkItems: any = {}
  for (const i in links) {
    const { name, type, url } = links[i]
    if (name && name !== "undefined") {
      linkItems[i] = {
        type,
        name: name.startsWith("@") ? name : `@${name}`,
        url
      }
    }
  }
  let linksObject: any = {}
  if (linkItems && Object.keys(linkItems).length > 0)
    linksObject = {
      "0": {
        "group": "social",
        "items": linkItems
      }
    }

  let addressItems: any = {}
  for (const i in donates) {
    const { address, type } = donates[i]
    if (type && type !== "undefined")
      addressItems[type] = { address }
  }

  let collectionsObject: any = {}
  for (const i in collections) {
    const { desc, image, name, previews, slug } = collections[i]
    let previewsObject: any = {}
    for (const j in previews) {
      const { type, uri } = previews[j]
      if (type && uri && type !== "undefined" && uri !== "undefined") {
        previewsObject[j] = {
          img: `${type}:${uri}`,
          name: `${slug}-${j}`,
          type: "previewbox"
        }
      }
    }
    if (slug && slug !== "undefined") {
      collectionsObject[slug] = {
        name,
        image,
        desc,
        preview: previewsObject
      }
    }
  }

  if (profileName)
    profile = { ...profile, name: profileName }

  if (pfpUri)
    profile = { ...profile, image: pfpUri }

  if (profileDescription)
    profile = { ...profile, desc: profileDescription }

  if (addressItems && Object.keys(addressItems).length > 0)
    profile = { ...profile, wallets: addressItems }

  if (linksObject && Object.keys(linksObject).length > 0)
    profile = { ...profile, links: linksObject }

  if (collections && Object.keys(collections).length > 0)
    profile = { ...profile, collections: collectionsObject }

  return profile
}