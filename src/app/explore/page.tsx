import getSubrealmsFromBackend from "@/lib/get-subrealms-from-backend";
import VIPCaurosel from "@/components/common/VIPCarousel";
import ScrollableExplorer from "@/components/common/ScrollableExplorer";
import getMintStatus from "@/lib/get-mint-status";

async function getData() {
  const vipSubrealms = await getSubrealmsFromBackend({
    filter: `${process.env.NEXT_PUBLIC_TOP_LEVEL_REALM}.`,
    offset: 0,
    limit: 99,
    club: -1
  })

  return {
    vipSubrealms,
  }
}

export default async function Explore({ params }: { params: any }) {

  const { vipSubrealms } = await getData()
  const { subrealmCount, profileSetCount } = await getMintStatus()

  return (
    <>
      <title>Explore Profiles</title>
      <meta property="og:title" content="Explore RealmBullrun" />
      <meta property="og:type" content="website" />
      <meta property="og:description" content="Explore on-chain profiles, the premier exclusive atomicals club 🐮⚛️ 10K Bull-runners making BTC great again." />
      <meta property="og:url" content={`https://realmbullrun.com`} />
      <meta property="og:image" content={`https://raw.githubusercontent.com/realmbullrun/bull-images/main/1.png`} />
      <meta property="og:site_name" content="RealmBullrun.com" />
      
      <meta name="twitter:card" content="summary" /> 
      <meta name="twitter:title" content="Explore RealmBullrun" />
      <meta name="twitter:description" content="Explore on-chain profiles, the premier exclusive atomicals club 🐮⚛️ 10K Bull-runners making BTC great again." />
      <meta name="twitter:image" content={`https://raw.githubusercontent.com/realmbullrun/bull-images/main/1.png`} />
      <meta name="twitter:creator" content="@realmbullrun" /> 

      <div className="w-full">
        <VIPCaurosel data={vipSubrealms} />
        <div className="hidden">10,000 Subrealms {`( ${subrealmCount} Claimed )`}</div>
        <ScrollableExplorer />
      </div>
    </>

  )
}