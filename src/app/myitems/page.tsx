"use client"
import { LoadingSpinner } from "@/components/icons/Spinner"
import ProfileContent from "@/components/profile/ProfileContent"
import getAtomicalsFromAddress from "@/lib/get-atomicals-from-address"
import isPfpNft from "@/lib/is-pfp-nft"
import isProfileNft from "@/lib/is-profile-nft"
import { AppContext } from "@/providers/AppContextProvider"
import { WalletContext } from "@/providers/WalletContextProvider"
import { useContext, useEffect, useState } from "react"

export default function MyItems() {

  const { network, showAlert, showError, tlr, mnemonic } = useContext(AppContext)
  const { walletData } = useContext(WalletContext)

  const [loading, setLoading] = useState(true)
  const [realmList, setRealmList] = useState<any>([])
  const [subrealmList, setSubrealmList] = useState<any>([])
  const [profileNftList, setProfileNftList] = useState<any>([])

  useEffect(() => {
    setLoading(true)
    const fetchFirst = async () => await getAtomicals()
    fetchFirst()
  }, [walletData, network])

  const getAtomicals = async () => {
    if (walletData.connected) {
      const atomicalsObject = await getAtomicalsFromAddress(walletData.primary_addr, network)
      if (!atomicalsObject)
        return
      const keys = Object.keys(atomicalsObject)
      let atomicals: any[] = []
      keys.map((key: string) => atomicals.push(atomicalsObject[key]))

      let pfps: any[] = [], realms: any[] = [], subrealms: any[] = [], profiles: any[] = []
      atomicals.map((elem: any) => {
        const { type, subtype, confirmed, request_dmitem_status, request_subrealm_status, request_realm_status } = elem
        if (type === "NFT") {

          if (subtype === "realm") {
            if (request_realm_status.status === "verified")
              realms.push(elem)
          }

          else if (subtype === "subrealm") {
            if (request_subrealm_status.status === "verified")
              subrealms.push(elem)
          }

          else if (!subtype) {    // this is not collection, just solo nft
            if (confirmed || confirmed === "true") {
              if (isProfileNft(elem))
                profiles.push(elem)
              if (isPfpNft(elem)) {
                pfps.push(elem)
              }
            }
          }
        }
      })

      console.log(realms)
      console.log(subrealms)
      console.log(profiles)
      setRealmList(realms)
      setSubrealmList(subrealms)
      setProfileNftList(profiles)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="text-center justify-center lg:w-full lg:mx-auto flex flex-row gap-4 w-full mx-auto">
        <LoadingSpinner />
        Please wait...
      </div>
    )
  }

  if (!walletData.connected && !loading)
    return (
      <div className="max-w-screen-2xl mx-auto">You should be connected...</div>
    )

  return (
    <div className="p-12 space-y-10 max-w-screen-2xl mx-auto">
      <div className="text-2xl font-bold">
        My items
      </div>

      <div className="space-y-6">
        <div className="text-xl font-semibold">TLRs</div>
        {
          realmList && realmList.map((elem: any, index: number) => (
            <div key={index} className="mt-4 p-4 border rounded-lg shadow-sm hover:border-card">
              <div className="font-medium">Realm Name: <span className="font-bold">+{elem.full_realm_name}</span></div>
              <div className="font-medium">Atomicals ID: <span className="font-bold">{`${elem.atomical_id.slice(0, 8)}...${elem.atomical_id.slice(-2)}`}</span></div>
              <div className="font-medium">Atomicals Number: <span className="font-bold">{elem.atomical_number}</span></div>
            </div>
          ))
        }
      </div>

      <div className="space-y-6">
        <div className="text-xl font-semibold">Subrealms</div>
        {
          subrealmList && subrealmList.map((elem: any, index: number) => (
            <div key={index} className="mt-4 p-4 border rounded-lg shadow-sm hover:border-card">
              <div className="font-medium">Realm Name: <span className="font-bold">+{elem.full_realm_name}</span></div>
              <div className="font-medium">Atomicals ID: <span className="font-bold">{`${elem.atomical_id.slice(0, 8)}...${elem.atomical_id.slice(-2)}`}</span></div>
              <div className="font-medium">Atomicals Number: <span className="font-bold">{elem.atomical_number}</span></div>
            </div>
          ))
        }
      </div>

      <div className="space-y-6">
        <div className="text-xl font-semibold">Profile NFTs</div>
        {
          profileNftList && profileNftList.map((elem: any, index: number) => (
            <div key={index} className="mt-4 p-4 border rounded-lg shadow-sm hover:border-card">
              <div className="font-medium">Atomicals ID: <span className="font-bold">{`${elem.atomical_id.slice(0, 8)}...${elem.atomical_id.slice(-2)}`}</span></div>
              <div className="font-medium">Atomicals Number: <span className="font-bold">{elem.atomical_number}</span></div>
              <div className="font-medium mb-2">Content: </div>
              <ProfileContent
                data={elem.data?.mint_data?.fields}
              />
            </div>
          ))
        }
      </div>
    </div>

  )
}

