"use client"
import { Button } from "@/components/ui/button"
import { WalletContext } from "@/providers/WalletContextProvider"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import Autoplay from "embla-carousel-autoplay"
import getAtomicalsFromAddress from "@/lib/get-atomicals-from-address"
import { AppContext } from "@/providers/AppContextProvider"
import getDataByPage from "@/lib/get-data-by-page"
import { NftPreviewCard } from "@/components/profile/NftPreviewCard"
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
// import metadata from './metadata'
import metadata from '@/lib/metadata'
import LegendaryBullData from './legendary_bulls'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import getItemJson from "@/lib/get-item-json"
import { mintDMItem, signMessage, WalletOpCode } from "@/lib/wallet-utils"
import { LoadingSpinner } from "@/components/icons/Spinner"
import getMintStatus from "@/lib/get-mint-status";

export default function Collection() {

  const { tlr, showError, showAlert } = useContext(AppContext)
  const [status, setStatus] = useState("loading")
  const [subrealmList, setSubrealmList] = useState<any[]>([])
  const [traitsInfo, setTraitsMap] = useState<any>()
  const [filterMap, setFilterMap] = useState<any>()
  const [filterInput, setFilterInput] = useState("")
  const divRef = useRef<any>()
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<any>([])
  const [searchStr, setSearchStr] = useState("")
  const [isDetailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>()
  const [claimedSubrealms, setClaimedSubrealms] = useState<number[]>([])
  const [claimedSubrealmCount, setClaimedSubrealmCount] = useState(0)
  const [isFilterDrawerOpen, setFilterDrawerOpen] = useState(false)

  const originalMessage = "In order to prove you are the owner of the subrealm and whitelisted, you should sign this message. No sats are being charged, no transactions are broadcast."
  const { walletData, setWalletData } = useContext(WalletContext)

  useEffect(() => {
    const init = async () => {
      const { subrealmCount, subrealms } = await getMintStatus()
      setClaimedSubrealmCount(parseInt(subrealmCount))
      setClaimedSubrealms(subrealms)
    }
    init()

    let traitsMap: any = {}
    if (metadata) {
      metadata.map((item: any) => {
        const { attributes } = item
        attributes.map(({ trait_type, value }: { trait_type: string, value: string }) => {
          if (!traitsMap[trait_type])
            traitsMap[trait_type] = []
          if (traitsMap[trait_type].indexOf(value) < 0)
            traitsMap[trait_type].push(value)
        })
      })
    }
    setTraitsMap(traitsMap)
  }, [])

  useEffect(() => {
    const firstFetch = async () => {
      let subrealms: any[] = []
      const atomicals = await getAtomicalsFromAddress(walletData.primary_addr)
      if (atomicals) {
        const ids = Object.keys(atomicals)
        ids.map((id: string) => {
          const { type, subtype, subrealm, request_subrealm_status, full_realm_name } = atomicals[id]
          if (
            type === "NFT"
            && subtype === "subrealm"
            && request_subrealm_status.status === "verified"
            && full_realm_name.startsWith(tlr)
            && parseInt(subrealm).toString() === subrealm.toString()
          )
            subrealms.push({
              subrealm,
              full_realm_name,
              atomicalId: id
            })
        })
        setSubrealmList(subrealms)
      }

      if (!atomicals || subrealms.length < 1)
        setStatus('no-atomicals')
      else
        setStatus('found')
    }

    const firstPageFetch = async () => {
      setIsLoading(true)
      const initialData = await getDataByPage(0, filterMap)
      setData(initialData)
      setIsLoading(false)
    }

    firstPageFetch()
    if (walletData.connected) {
      firstFetch()
    }
  }, [walletData.primary_addr])

  useEffect(() => {
    if (!walletData.connected)
      setStatus("no-wallet")
    else
      setStatus("loading")
  }, [walletData.connected])

  const onScroll = useCallback(async () => {
    if (window.innerHeight + window.scrollY >= divRef?.current?.offsetHeight && !isLoading) {
      await loadMoreData();
    }
  }, [isLoading, page])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  const loadMoreData = async () => {
    setIsLoading(true)
    const moreData = await getDataByPage(page + 1, filterMap)
    setData((currentData: any[]) => [...currentData, ...moreData])
    setPage(page + 1)
    setIsLoading(false)
  }

  const checkIfAvailable = (subId: any) => {
    if (!subId)
      return false
    const sub = parseInt(subId.toString())
    return claimedSubrealms.indexOf(sub) < 0
  }

  const connectWizz = async () => {
    if (typeof window !== 'undefined' && window.wizz) {
      const result: string[] = await window.wizz.requestAccounts();
      if (result.length > 0) {
        setWalletData({
          ...walletData,
          type: "wizz",
          connected: true,
          primary_addr: result[0],
        });
      }
    }
  }

  const connectUnisat = async () => {
    if (typeof window !== 'undefined' && window.unisat) {
      const result: string[] = await window.unisat.requestAccounts();
      if (result.length > 0) {
        setWalletData({
          ...walletData,
          type: "unisat",
          connected: true,
          primary_addr: result[0],
        });
      }
    }
  }

  const startDownload = async (tokenId: string) => {
    if (!tokenId) return;

    try {
      const { success, content, msg } = await getItemJson(tokenId);
      if (!success) {
        showAlert(msg);
        return;
      }
      const jsonBlob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });

      const url = URL.createObjectURL(jsonBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bullrun-${tokenId}.json`;

      // Append the link to the document and trigger the download
      document.body.appendChild(link);
      link.click();

      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      showAlert("An error occurred while downloading the item.");
    }
  };


  /* const startDownload = async (tokenId: string) => {
    if (!tokenId)
      return

    if (!walletData.connected) {
      showAlert("You should connect your wallet to mint.")
      if (!walletData.connected) {
        showAlert("Connect your wallet to continue.")
        if (typeof window !== 'undefined' && window.wizz) {
          connectWizz()
        }
        else if (typeof window !== 'undefined' && window.unisat) {
          connectUnisat()
        }
      }
      return
    }

    if (subrealmList?.filter((elem: any) => elem.subrealm === tokenId).length === 0) {
      showAlert(`You should mint subrealm +${process.env.NEXT_PUBLIC_TOP_LEVEL_REALM}.${tokenId} first to be whitelisted...`)
      return
    }

    let address = ""

    const { opcode, result: signature } = await signMessage(originalMessage)
    if (opcode === WalletOpCode.SUCCESS) {
      address = walletData.primary_addr
      const { success, content, msg } = await getItemJson(tokenId, address, signature)
      if (!success) {
        showAlert(msg)
        return
      }
      const jsonBlob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });

      const url = URL.createObjectURL(jsonBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `bullrun-${tokenId}.json`;

      // Step 4: Append the link to the document and trigger the download
      document.body.appendChild(link);
      link.click();

      // Step 5: Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    else {
      showAlert("Signature failed...")
    }
  } */

  const startMint = async (tokenId: string) => {
    if (!tokenId) return;

    // Removed wallet connection and subrealm ownership checks
    try {
      const { success, content, msg } = await getItemJson(tokenId);
      if (!success) {
        showAlert(msg);
        return;
      }
      const mintResult = await mintDMItem(content);
      if (mintResult.opcode !== WalletOpCode.SUCCESS) {
        showAlert(mintResult.message);
      }
    } catch (error) {
      showAlert("An error occurred while minting the item.");
    }
  };

  /*  const startMint = async (tokenId: string) => {
     if (!tokenId)
       return
 
     if (!walletData.connected) {
       showAlert("You should connect your wallet to mint.")
       if (!walletData.connected) {
         showAlert("Connect your wallet to continue.")
         if (typeof window !== 'undefined' && window.wizz) {
           connectWizz()
         }
         else if (typeof window !== 'undefined' && window.unisat) {
           connectUnisat()
         }
       }
       return
     }
 
     if (subrealmList?.filter((elem: any) => elem.subrealm === tokenId).length === 0) {
       showAlert(`You should mint subrealm +${process.env.NEXT_PUBLIC_TOP_LEVEL_REALM}.${tokenId} first to be whitelisted...`)
       return
     }
 
     let address = ""
 
     const { opcode, result: signature } = await signMessage(originalMessage)
     if (opcode === WalletOpCode.SUCCESS) {
       address = walletData.primary_addr
       const { success, content, msg } = await getItemJson(tokenId, address, signature)
       if (!success) {
         showAlert(msg)
         return
       }
       const mintResult = await mintDMItem(content)
       if (mintResult.opcode !== WalletOpCode.SUCCESS) {
         showAlert(mintResult.message)
       }
     }
     else {
       showAlert("Signature failed...")
     }
 
   } */

  let whitelistDOM = (
    <Card className="w-full z-10 mt-4">
      <CardContent>
        <div className="mt-4">
          You are whitelisted !
        </div>
        <div className="mt-4">
          Click the button below to mint your artwork.
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {
            subrealmList?.map((elem: any) => (
              <div key={elem.atomicalId} className="flex flex-col gap-2 items-center">
                <Image className="image-pixel rounded-lg shadow-[0px_0px_40px_4px_rgba(117,141,179,0.31)] w-36" width={512} height={512}
                  src={`${process.env.NEXT_PUBLIC_BACKEND_APIENDPOINT}/preview/${elem.subrealm}.png`} alt="No Image Found" />
                <Button className="text-wrap mb-0 py-2 h-auto" key={elem.atomicalId} onClick={() => startMint(elem.subrealm)}>Mint Artwork {elem.subrealm}</Button>
                <Button className="text-wrap mb-4 py-2 h-auto" key={elem.atomicalId} onClick={() => startDownload(elem.subrealm)}>Download JSON</Button>
              </div>
            ))
          }
        </div>
      </CardContent>
    </Card>
  )

  if (status === "loading")
    whitelistDOM = (
      <div className="mx-auto text-center mt-4 z-10 flex flex-row gap-4">
        <LoadingSpinner />
        Loading your subrealms...
      </div>
    )

  if (status === "no-wallet")
    whitelistDOM = (
      <div className="lg:mx-auto lg:w-6/12 mt-4 mx-8 text-center z-10">
        Connect your wallet to check WL.
      </div>
    )

  if (status === "no-atomicals")
    whitelistDOM = (
      <div className="lg:mx-auto lg:w-6/12 mt-4 mx-8 text-center z-10">
        No +{tlr} subrealms in this wallet... Mint your subrealm first.
      </div>
    )

  return (
    <>
      <div
        className="flex items-center flex-col w-full mx-auto"
        ref={divRef}>

        <Carousel
          plugins={[
            Autoplay({
              delay: 3000
            })
          ]}

          className="w-11/12"
        >
          <CarouselContent className="">
            {
              LegendaryBullData.map((dummyItem: any, index: any) => (
                <CarouselItem className="flex justify-center gap-2 lg:basis-1/3" key={index}>
                  <Card className="relative flex flex-row p-0">
                    <CardHeader className="p-2 relative">
                      <Image className="object-cover w-64 h-64 rounded-lg shadow-lg" width={512} height={512} src={`${process.env.NEXT_PUBLIC_BACKEND_APIENDPOINT}/preview/${dummyItem.image}`} alt="No Image Found" />
                      <div style={{ marginTop: '0px' }} className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 transition-opacity duration-300 hover:opacity-100 bg-[#282b30a1] bg-opacity-50 rounded-lg">
                        <div className="flex h-full justify-between flex-col text-center text-white p-6">
                          <h3 className="text-lg font-bold">{dummyItem.name}</h3>
                          <p className="text-sm">{dummyItem.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </CarouselItem>
              ))
            }
          </CarouselContent>
        </Carousel>

        {whitelistDOM}

        <div className="flex flex-row p-4 w-11/12 gap-4">
          <Input placeholder="search #" value={filterInput} onChange={(e) => {
            setFilterInput(e.target.value)
            let newFilterMap: any = { ...filterMap }
            newFilterMap['name'] = e.target.value
            const fetchNew = async (newMergedFilterMap: any) => {
              await setFilterMap(newMergedFilterMap)
              setIsLoading(true)
              const initialData = await getDataByPage(0, newMergedFilterMap)
              setData(initialData)
              setIsLoading(false)
            }
            fetchNew(newFilterMap)
          }}
          />
          <Drawer onOpenChange={setFilterDrawerOpen} open={isFilterDrawerOpen}>
            <DrawerTrigger>Filters</DrawerTrigger>
            <DrawerContent>
              <DrawerTitle className="p-4">Traits filter</DrawerTitle>
              <DrawerHeader className="grid grid-cols-2 justify-items-center">
                {
                  traitsInfo && Object.keys(traitsInfo).map((trait: string) => (
                    <div key={`div_${trait}`} className="flex flex-col gap-2 items-start">
                      <div>
                        {trait.toUpperCase()}
                      </div>
                      <Select
                        value={filterMap ? filterMap[trait] : "_all"}
                        onValueChange={(val: any) => {
                          let newFilterMap: any = { ...filterMap }
                          newFilterMap[trait] = val
                          const fetchNew = async (newMergedFilterMap: any) => {
                            await setFilterMap(newMergedFilterMap)
                            setIsLoading(true)
                            const initialData = await getDataByPage(0, newMergedFilterMap)
                            setData(initialData)
                            setIsLoading(false)
                          }
                          fetchNew(newFilterMap)
                        }}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="ALL" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem key={`${trait}_all`} value="_all">ALL</SelectItem>
                          {
                            traitsInfo[trait].map((value: string) => (
                              <SelectItem key={`${trait}_${value}`} value={`${value}`}>{value.toUpperCase()}</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    </div>
                  ))
                }
              </DrawerHeader>

            </DrawerContent>
          </Drawer>
        </div>

        <div className="mt-4 p-4 grid new-feed-cols justify-stretch justify-items-stretch gap-4 w-full">
          {
            data && data.filter((elem: any) => elem.title.indexOf(searchStr) > -1).map((elem: any) => (
              <NftPreviewCard
                key={elem.id}
                image={`${elem.id}.png`}
                number={elem.id}
                onDetail={(id: any) => {
                  setSelectedItem(metadata[id])
                  setDetailDialogOpen(true)
                }}
              />
            ))
          }
        </div>

        <Dialog open={isDetailDialogOpen} onOpenChange={() => setDetailDialogOpen(false)} modal>
          <DialogContent className="p-3 min-w-[80%] overflow-y-scroll max-h-[80%]" >
            <DialogHeader className="flex items-center gap-4 lg:flex-row">
              <div className="flex flex-col items-center gap-2 min-w-64 h-full">
                <DialogTitle>{selectedItem?.name}</DialogTitle>
                <Image className="image-pixel rounded-lg shadow-[0px_0px_40px_4px_rgba(117,141,179,0.31)] w-64 h-64" width={512} height={512} src={`${process.env.NEXT_PUBLIC_BACKEND_APIENDPOINT}/preview/${selectedItem?.token_id}.png`} alt="No Image Found" />
              </div>
              <DialogDescription className="w-full grid grid-cols-2 justify-items-center items-center gap-4 pt-4">
                {selectedItem?.attributes.map((elem: any) => (
                  <div key={elem.token_id} className="p-2 border bg-card w-full h-full flex flex-col">
                    <span className="block text-sm  text-secondary">{elem.trait_type}:</span>
                    <span className="block text-lg">{elem.value}</span>
                  </div>
                ))}
                <div className="w-full flex flex-row h-full gap-4">
                  {
                    <Button
                      className={`border bg-secondary rounded-none h-auto w-full`}
                      variant={'ghost'}
                      onClick={() => startMint(selectedItem?.token_id)}
                    >Mint</Button>
                  }
                  {/* <Button
                    className={`border bg-secondary rounded-none h-auto w-6/12`}
                    variant={'ghost'}
                    onClick={() => startMint(selectedItem?.token_id)}
                  >Mint</Button> */}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

      </div>
    </>
  )

}