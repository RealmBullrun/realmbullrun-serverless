"use client"
import { useCallback, useEffect, useRef, useState, useContext } from "react"
import { RealmCard } from "@/components/profile/RealmCard";
import isIntegerString from "@/lib/is-integer";
import { Input } from "../ui/input";
import getGlobalRealmsFromBackend from "@/lib/get-global-realms-from-backend";
import { Button } from "../ui/button";
import { AppContext } from "@/providers/AppContextProvider";
import { LoadingSpinner } from "../icons/Spinner";

export default function ScrollableExplorerGlobal () {

  const divRef = useRef<any>()
  const { showAlert } = useContext(AppContext)
  const [realms, setRealms] = useState<any[]>([])
  const [searchValue, setSearchValue] = useState("")
  const [currentOffset, setCurrentOffset] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setCurrentOffset(0)
    setRealms([])
    const fetch = async () => await getRealms()
    fetch()  
  }, [searchValue])

  useEffect(() => {
    const fetch = async () => await getRealms()
    fetch()  
  }, [currentOffset])

  const getRealms = async () => {
    setIsLoading(true)
    const data: any[] = await getGlobalRealmsFromBackend({
      filter: searchValue,
      offset: currentOffset,
      limit: 50,
    })
    if (currentOffset > 0)
      setRealms([...realms, ...data])
    else
      setRealms(data)

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
        <Input value={searchValue} onChange={(event: any) => setSearchValue(event.target.value)} placeholder="Search Global Realm Profiles on Bitcoin Atomicals..." />
      </div>
      <div className="mt-8 mx-4 lg:mx-auto text-center space-x-2 lg:max-w-2xl">
        {
          (isLoading) ? (
            <div className="mx-auto mt-16 flex flex-row gap-4 justify-center max-w-2xl"> <LoadingSpinner /> Loading Realm Profiles...</div>
          ): (!realms || realms.length === 0) ? (
            <div className="mx-auto mt-16 max-w-2xl">
              No Realms Found...
            </div>
          ) : (<></>)
        }
      </div>
      <div ref={divRef} className="mt-4 p-4 grid new-feed-cols justify-stretch justify-items-stretch gap-[.45rem] max-w-screen-2xl mx-auto">
        {
          realms && realms.map((elem: any) => {
            return (
              <RealmCard key={elem.atomicalId} title={elem.name} links={elem.socials} pfpUri={elem.pfpUri} fullRealmName={elem.fullRealmName} atomicalId={elem.atomicalId} atomical_number={elem.atomicalNumber} />
            )
          })
        }
      </div>
    </>
  )
}