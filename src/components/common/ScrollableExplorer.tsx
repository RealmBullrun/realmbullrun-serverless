"use client"
import { useCallback, useEffect, useRef, useState, useContext } from "react"
import { RealmCard } from "@/components/profile/RealmCard";
import isIntegerString from "@/lib/is-integer";
import { Input } from "../ui/input";
import getSubrealmsFromBackend from "@/lib/get-subrealms-from-backend";
import { Button } from "../ui/button";
import { AppContext } from "@/providers/AppContextProvider";
import { LoadingSpinner } from "../icons/Spinner";

export default function ScrollableExplorer() {

  const divRef = useRef<any>()
  const { tlr, showError, showAlert } = useContext(AppContext)
  const [clubSubrealms, setClubSubrealms] = useState<any[]>([])
  const [searchValue, setSearchValue] = useState("")
  const [currentOffset, setCurrentOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setCurrentOffset(0)
    setClubSubrealms([])
    const fetch = async () => await getClubSubrealms()
    fetch()
  }, [searchValue])

  useEffect(() => {
    const fetch = async () => await getClubSubrealms()
    fetch()
  }, [currentOffset])

  const getClubSubrealms = async () => {
    setIsLoading(true)
    const data: any[] = await getSubrealmsFromBackend({
      filter: searchValue,
      offset: currentOffset,
      limit: 50,
      club: 1
    })
    if (currentOffset > 0)
      setClubSubrealms([...clubSubrealms, ...data])
    else
      setClubSubrealms(data)

    setIsLoading(false)
  }

  const onScroll = useCallback(async () => {
    if (window.innerHeight + window.scrollY >= divRef?.current?.offsetHeight && !isLoading) {
      setCurrentOffset(currentOffset + 1)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return (
    <>
      <div className="mt-8 mx-4 lg:mx-auto text-center space-x-2 lg:max-w-2xl">
        <Input value={searchValue} onChange={(event: any) => setSearchValue(event.target.value)} placeholder="Search +Bullrun club subrealms..." />
      </div>
      <div className="mt-8 mx-4 lg:mx-auto text-center space-x-2 lg:max-w-2xl">
        {
          (isLoading) ? (
            <div className="mx-auto mt-16 flex flex-row gap-4 justify-center max-w-2xl"> <LoadingSpinner /> Loading Subrealms...</div>
          ) : (!clubSubrealms || clubSubrealms.length === 0) ? (
            <div className="mx-auto mt-16 max-w-2xl">
              No Club Subrealms Found...

              <Button className={`mt-8 ${searchValue === "" ? "hidden" : ""}`} onClick={() => {
                if (typeof window !== "undefined") {
                  if (typeof window.wizz === "undefined") {
                    showAlert("In order to mint your subrealms, you should first install Wizz Web3 wallet at https://wizzwallet.io")
                    return
                  }
                  window.wizz.requestMint({
                    type: 'mint_subrealm',
                    realm: process.env.NEXT_PUBLIC_TOP_LEVEL_REALM,
                    subrealm: searchValue,
                    satsIn: 546
                  }).catch((error: any) => {
                    showAlert("You should be connected to do this.")
                  })
                }
              }}>
                Mint +{process.env.NEXT_PUBLIC_TOP_LEVEL_REALM}.{searchValue}
              </Button>
            </div>
          ) : (<></>)
        }
      </div>
      <div ref={divRef} className="mt-4 p-4 grid new-feed-cols justify-stretch justify-items-stretch gap-[.45rem] ">
        {
          clubSubrealms && clubSubrealms.map((elem: any) => {
            const splits = elem.fullRealmName.split(".")
            if (splits.length > 1 && isIntegerString(splits[splits.length - 1])) {
              const sub = splits[splits.length - 1]
              return (
                <RealmCard key={elem.atomicalId} title={elem.name} links={elem.socials} pfpUri={elem.pfpUri} fullRealmName={elem.fullRealmName} atomicalId={elem.atomicalId} atomical_number={elem.atomicalNumber} />
              )
            }
          })
        }
      </div>
    </>
  )
}