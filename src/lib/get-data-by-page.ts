import metadata from './metadata'

export default async function getDataByPage(pagenum: any, filterMap: any) {

  const pagesize = 100

  let tempArray = [], resArray = []
  
  for (let i = 0; i < metadata.length; i ++) {
    if (dataMatchesFilter(metadata[i], filterMap)) {
      const { token_id, image, name, attributes } = metadata[i]
      tempArray.push({
        title: name,
        image: image,
        id: token_id
      })
      if (tempArray.length > (pagenum + 1) * pagesize)
        break
    }
  }

  for (let i = pagenum * pagesize; (i < pagesize * (pagenum + 1) && i < 10000); i++) {
    if (tempArray[i])
      resArray.push(tempArray[i])
  }

  return resArray
}

const dataMatchesFilter = (metaMap: any, filterMap: any) => {
  if (!metaMap)
    return false
  
  if (!filterMap)
    return true

  if (filterMap['name'] && metaMap['name'].indexOf(filterMap['name']) < 0)
    return false

  const filterKeys = Object.keys(filterMap)
  
  for (let i = 0; i < filterKeys.length; i ++) {
    const filterKey = filterKeys[i]
    if (filterKey !== "name") {
      const filterValue = filterMap[filterKey]
      if (filterValue === "_all")
        continue;
      for (let j = 0; j < metaMap.attributes.length; j ++) {
        const { trait_type, value } = metaMap.attributes[j]
        if (trait_type === filterKey && filterValue !== value)
          return false
      }
    }
  }

  return true
}