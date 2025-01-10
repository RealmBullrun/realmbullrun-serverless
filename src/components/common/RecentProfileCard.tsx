import Link from "next/link"
import Image from "next/image"
import { ImageFromUri } from "../profile/ImageFromUri"
import { RealmCard } from "../profile/RealmCard"

export default function RecentProfileCard({ data }: { data: any }) {

  const { pfpUri, fullRealmName, atomicalId, atomicalNumber, socials, name: title } = data

  return (
    <Link href={`https://realmbullrun.com/${fullRealmName}`} target="_blank" title={`+${data.fullRealmName}`}>
      <RealmCard 
        pfpUri={pfpUri}
        atomicalId={atomicalId}
        atomical_number={atomicalNumber}
        fullRealmName={fullRealmName}
        title={title}
        links={socials}
      />
    </Link>
  )
}