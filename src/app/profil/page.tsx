"use client"
import { AppContext } from "@/providers/AppContextProvider"
import { WalletContext } from "@/providers/WalletContextProvider"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useContext, useEffect, useRef, useState } from "react"
import { Atomicals, ElectrumApi, detectAddressTypeToScripthash } from "../atomical-lib"
import { createKeyPair } from "../atomical-lib/utils/create-key-pair";
import { CommandInterface } from "../atomical-lib/commands/command.interface"
import { SetProfileCommand } from "../atomical-lib/commands/set-profile-command"
import getAtomicalsFromAddress from "@/lib/get-atomicals-from-address"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toggle } from "@/components/ui/toggle"
import { isMobileDevice } from "@/lib/detect-mobile";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import isProfileNft from "@/lib/is-profile-nft";
import isPfpNft from "@/lib/is-pfp-nft";
import NameEdit from "@/components/profile/NameEdit";
import DescriptionEdit from "@/components/profile/DescriptionEdit";
import LinksEdit from "@/components/profile/LinksEdit";
import DonatesEdit from "@/components/profile/DonatesEdit";
import PFPEdit from "@/components/profile/PFPEdit";
import CollectionsEdit from "@/components/profile/CollectionsEdit";
import { getProfileJson } from "@/lib/get-profile-json-from-input-data";
import { MintProfileNftCommand } from "../atomical-lib/commands/mint-interactive-profile-nft-command";
import Image from "next/image";
import { CardContent } from "@/components/ui/card";
import { sendBitcoin, signPsbt, pushPsbt, WalletOpCode } from "@/lib/wallet-utils";
import { LoadingSpinner } from "@/components/icons/Spinner";
import getProfileFromDelegate from "@/lib/get-profile-from-delegate";
import CreateArticle from "@/components/article/CreateArticle";
import DragAndDropEditor from "@/components/article/DragAndDropEditor";

const Profiles = () => {
  const { network, showAlert, showError, tlr, mnemonic } = useContext(AppContext)
  const { walletData, setWalletData } = useContext(WalletContext)
  const [isMobile, setIsMobile] = useState(false)

  const [satsbyteDialogOpen, setSatsbyteDialogOpen] = useState(false)
  const [fastestFee, setFastestFee] = useState(0)
  const [halfHourFee, setHalfHourFee] = useState(0)
  const [hourFee, setHourFee] = useState(0)
  const [minimumFee, setMinimumFee] = useState(0)
  const [customFee, setCustomFee] = useState(30)
  const [selectedFeeType, setSelectedFeeType] = useState("fast")
  const [nextFunctionForSatsbyte, setNextFunctionForSatsbyte] = useState("mint")
  const customFeeInput = useRef<HTMLInputElement>(null)

  const [subrealmList, setSubrealmList] = useState<any>([])
  const [realmList, setRealmList] = useState<any>([])
  const [delegateInput, setDelegateInput] = useState("")
  const [profileNftList, setProfileNftList] = useState<any>()
  const [currentProfileId, setCurrentProfileId] = useState()
  const [editingProfileId, setEditingProfileId] = useState("")
  const [currentTab, setCurrentTab] = useState("mint")
  const [currentSubrealmId, setCurrentSubrealmId] = useState("")
  const [loading, setLoading] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [status, setStatus] = useState("")
  const [isSetDialogOpen, setSetDialogOpen] = useState(false)

  const [profileJson, setProfileJson] = useState<any>()
  const [profileName, setProfileName] = useState("Click to edit your name")
  const [profileDescription, setProfileDescription] = useState("Click to write your bio or description.")
  const [links, setLinks] = useState<any>([])
  const [donates, setDonates] = useState<any>([])
  const [collections, setCollections] = useState<any>([])
  const [pfpUri, setPfpUri] = useState("")

  const [editingProfileJson, setEditingProfileJson] = useState<any>()
  const [editingProfileName, setEditingProfileName] = useState("Click to edit your name")
  const [editingProfileDescription, setEditingProfileDescription] = useState("Click to write your bio or description.")
  const [editingLinks, setEditingLinks] = useState<any>([])
  const [editingDonates, setEditingDonates] = useState<any>([])
  const [editingCollections, setEditingCollections] = useState<any>([])
  const [editingPfpUri, setEditingPfpUri] = useState("")
  const [articleData, setArticleData] = useState([]);

  useEffect(() => {
    setLoading(true)
    const fetchFirst = async () => await getAtomicals()
    fetchFirst()
  }, [walletData, network])

  useEffect(() => {
    if (typeof window !== "undefined" && navigator) {
      const ua = navigator.userAgent;
      if (isMobileDevice(ua)) {
        setIsMobile(true);
      }
    }
  }, []);

  useEffect(() => {
    const func = async () => {
      if (!editingProfileId)
        return
      const data = await getProfileFromDelegate(editingProfileId)
      if (!data || !data.fields)
        return

      const { v, name, desc, image, links, wallets, collections } = data
      if (name)
        setEditingProfileName(name)
      if (desc)
        setEditingProfileDescription(desc)
      if (image)
        setEditingPfpUri(image)
      if (links) {
        const { items } = links[0]
        let linksArr: any[] = []
        const itemsKeys = Object.keys(items)
        for (const itemsKey of itemsKeys) {
          linksArr.push(items[itemsKey])
        }
        setEditingLinks(linksArr)
      }
      if (wallets) {
        const walletKeys = Object.keys(wallets)
        let walletsArr: any[] = []
        for (const walletType of walletKeys) {
          walletsArr.push({
            type: walletType,
            address: wallets[walletType]["address"]
          })
        }
        setEditingDonates(walletsArr)
      }
      if (collections) {
        const collectionSlugs = Object.keys(collections)
        let collectionsArr: any[] = []
        for (const slug of collectionSlugs) {
          const { name, desc, image, preview } = collections[slug]
          const previewKeys = Object.keys(preview)
          let previews: any[] = []
          for (const previewKey of previewKeys) {
            const { img } = preview[previewKey]
            const pos = img.lastIndexOf(":")
            previews.push({
              type: img.substring(0, pos),
              uri: img.substring(pos + 1, img.length)
            })
          }
          collectionsArr.push({
            slug,
            name,
            desc,
            image,
            previews
          })
        }
        setEditingCollections(collectionsArr)
      }
    }
    func()
  }, [editingProfileId])

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

          // just for test
          if (subtype === "realm") {
            if (request_realm_status.status === "verified")
              realms.push(elem)
          }

          else if (subtype === "subrealm") {
            if (request_subrealm_status.status === "verified" && elem.full_realm_name.startsWith(tlr))
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

      setRealmList(realms)
      setSubrealmList(subrealms)
      setProfileNftList(profiles)
    }
    setLoading(false)
  }

  const onCloseSatsbyte = () => {
    setSatsbyteDialogOpen(false)
  }

  const getUserSelectedSatsbyte = () => {
    switch (selectedFeeType) {
      case "fast": return fastestFee;
      case "average": return halfHourFee;
      case "slow": return hourFee;
      case "custom": return customFee;
      default: return -1
    }
  }

  const onRequestSats = ({ address, sats }: { address: string, sats: number }) => {
    const sendFunc = async ({ address, sats }: { address: string, sats: number }) => {
      const getRecommendedFeeAPI = `${network === "testnet" ? process.env.NEXT_PUBLIC_MEMPOOL_TESTNET_APIENDPOINT : process.env.NEXT_PUBLIC_MEMPOOL_APIENDPOINT}/v1/fees/recommended`
      const response = await fetch(getRecommendedFeeAPI)
      const recommendedFees = await response.json()
      const { opcode, txid } = await sendBitcoin({
        dest: address,
        satoshis: sats,
        feeRate: recommendedFees.fastestFee
      })
      if (opcode !== WalletOpCode.SUCCESS) {
        showAlert("Send Bitcoin Failed...")
        setProcessing(false)
        setStatus("")
      }
    }
    sendFunc({ address, sats })
  }

  const pushInfo = ({ state, data, qrcode }: { state?: any, data?: any, qrcode?: string }) => {

    if (state === "awaiting-funding-utxo") {
      if (typeof window !== "undefined") {
        const { address, fees } = data
        const fn = async () => {
          const { opcode, txid } = await sendBitcoin({
            dest: address,
            satoshis: fees,
            feeRate: getUserSelectedSatsbyte()
            // feeRate: "" + getUserSelectedSatsbyte()      // this is to avoid bug on wizz mobile app
          })
          if (opcode !== WalletOpCode.SUCCESS) {
            showAlert("Operation failed.")
            setProcessing(false)
            setStatus("")
          }
        }
        fn()
        setProcessing(true)
        setStatus("awaiting-funding-utxo")
      }
    }

    else if (state === "detected-funding-utxo") {
      setStatus("detected-funding-utxo")
    }

    else if (state === "broadcasting-tx") {
      setStatus("broadcasting-tx")
    }

    else if (state === "sent-tx") {
      setProcessing(false)
      showAlert("Successfully minted profile NFT.")
      getAtomicals()
    }

    // else {
    //   showAlert(state)
    // }

  }

  const mintProfileNft = async (userSatsByte: any) => {
    const funding_address = await createKeyPair(mnemonic, "m/86'/0'/0'/1/0")
    const { WIF } = funding_address

    const atomicals = new Atomicals(ElectrumApi.createClient((network === 'testnet' ? process.env.NEXT_PUBLIC_WIZZ_PROXY_TESTNET : process.env.NEXT_PUBLIC_WIZZ_PROXY) || ''));
    try {
      const getRecommendedFeeAPI = `${network === "testnet" ? process.env.NEXT_PUBLIC_MEMPOOL_TESTNET_APIENDPOINT : process.env.NEXT_PUBLIC_MEMPOOL_APIENDPOINT}/v1/fees/recommended`
      const response = await fetch(getRecommendedFeeAPI)
      const recommendedFees = await response.json()
      await atomicals.electrumApi.open();
      const command: CommandInterface = new MintProfileNftCommand(atomicals.electrumApi, { satsbyte: userSatsByte }, walletData.primary_addr, WIF, profileJson, pushInfo);
      const res = await command.run(pushInfo);
    } catch (error: any) {
      setProcessing(false)
    } finally {
      atomicals.electrumApi.close();
    }

  }

  const openSatsbyteWindow = async (next: string) => {
    const getRecommendedFeeAPI = `${network === "testnet" ? process.env.NEXT_PUBLIC_MEMPOOL_TESTNET_APIENDPOINT : process.env.NEXT_PUBLIC_MEMPOOL_APIENDPOINT}/v1/fees/recommended`
    const response = await fetch(getRecommendedFeeAPI)
    const recommendedFees = await response.json()
    setFastestFee(recommendedFees.fastestFee)
    setHourFee(recommendedFees.hourFee)
    setMinimumFee(recommendedFees.minimumFee)
    setHalfHourFee(recommendedFees.halfHourFee)
    setNextFunctionForSatsbyte(next)
    setSatsbyteDialogOpen(true)
  }

  const setToRealm = async (userSatsbyte: any) => {

    let delegate = ""
    if (currentTab === "owned")
      delegate = currentProfileId || ""
    else if (currentTab === "any")
      delegate = delegateInput

    if (!delegate) {
      if (currentTab === "owned")
        showAlert("Select profile to set to realm.")
      if (currentTab === "any")
        showAlert("Input delegate id to set to realm.")
      return
    }

    if (!currentSubrealmId) {
      showAlert("Select subrealm to set this profile.")
      return
    }

    setProcessing(true)
    setStatus('Set profile process started...')

    const publicKey = await window.wizz.getPublicKey()

    const atomicalId = currentSubrealmId.replaceAll("\"", "")

    const funding_address = await createKeyPair(mnemonic, "m/86'/0'/0'/1/0")
    const { WIF } = funding_address

    const atomicals = new Atomicals(ElectrumApi.createClient((network === 'testnet' ? process.env.NEXT_PUBLIC_WIZZ_PROXY_TESTNET : process.env.NEXT_PUBLIC_WIZZ_PROXY) || ''));
    try {
      await atomicals.electrumApi.open();
      const command: CommandInterface = new SetProfileCommand(atomicals.electrumApi, { satsbyte: userSatsbyte }, atomicalId, { "d": delegate }, WIF, publicKey, onRequestSats);
      const res = await command.run(signPsbts);
    } catch (error: any) {
      console.log(error)
    } finally {
      atomicals.electrumApi.close();
    }
  }

  const editProfile = async (userSatsbyte: any) => {
    setProcessing(true)
    setStatus('Edit profile process started...')
    const publicKey = await window.wizz.getPublicKey()

    const atomicalId = editingProfileId
    console.log(atomicalId)
    return

    const funding_address = await createKeyPair(mnemonic, "m/86'/0'/0'/1/0")
    const { WIF } = funding_address

    const atomicals = new Atomicals(ElectrumApi.createClient((network === 'testnet' ? process.env.NEXT_PUBLIC_WIZZ_PROXY_TESTNET : process.env.NEXT_PUBLIC_WIZZ_PROXY) || ''));
    try {
      await atomicals.electrumApi.open();
      const command: CommandInterface = new SetProfileCommand(atomicals.electrumApi, { satsbyte: userSatsbyte }, atomicalId, editingProfileJson, WIF, publicKey, onRequestSats);
      const res = await command.run(signPsbts);
    } catch (error: any) {
      console.log(error)
    } finally {
      atomicals.electrumApi.close();
    }
  }

  const signPsbts = async (toSignPsbts: any[]) => {
    for (let i = 0; i < toSignPsbts.length; i++) {
      const psbt = toSignPsbts[i];
      const { opcode, result } = await signPsbt(psbt)
      if (opcode !== WalletOpCode.SUCCESS) {
        showAlert("Operation failed.")
        setProcessing(false)
        setStatus('')
      }
      const { opcode: opcode_push, result: result_push } = await pushPsbt(result)
      if (opcode_push !== WalletOpCode.SUCCESS) {
        showAlert("Operation failed.")
        setProcessing(false)
        setStatus('')
      }
    }
    setProcessing(false)
    setStatus('Set profile process finished...')
  }

  const downloadProfileJson = () => {
    const jsonBlob = new Blob([JSON.stringify(profileJson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(jsonBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `profile.json`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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

  const handleMintArticle = () => {
    if (!walletData.connected) {
      showAlert("Connect your wallet to continue.");
      if (typeof window !== 'undefined' && window.wizz) {
        connectWizz();
      } else if (typeof window !== 'undefined' && window.unisat) {
        connectUnisat();
      }
      return;
    }

    if (articleData.length === 0) {
      showAlert("You should add some content to your article.");
      return;
    }

    // Set the article data and open the minting window
    openSatsbyteWindow("mint");
  };

  // if (!walletData.connected) {
  //   return (
  //     <div className="lg:mx-auto mx-8 my-8 text-center justify-center lg:w-full">
  //       {
  //        /*  isMobile ? (
  //           <div>
  //             We are temporarily unavailable to provide set-to-realm function on mobile devices. Please access from your PC to proceed...
  //           </div>
  //         ) : */ (
  //           <>
  //             <div>
  //               Create and set profile to your Realms.
  //             </div>
  //             <div className="mt-8">
  //               Connect your wallet to continue...
  //             </div>
  //           </>
  //         )
  //       }
  //     </div>
  //   )
  // }

  return (
    <>
      <div className="text-center justify-center lg:w-full lg:mx-auto mx-8 absolute">
        <Dialog open={processing} modal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>In Progress...</DialogTitle>
              <DialogDescription>
                <div className="flex flex-col space-y-3 mt-4">
                  <div className=" w-full flex lg:flex-row flex-col lg:space-x-2 space-x-0 space-y-2 lg:space-y-0 justify-between">
                    Please do not close this window until process is finished. Otherwise, you will be left with nothing...
                    <div>
                      {status}
                    </div>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <Dialog open={satsbyteDialogOpen} onOpenChange={onCloseSatsbyte} modal>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Fee Rate</DialogTitle>
              <DialogDescription>
                <div className="flex flex-col space-y-3 mt-4">
                  <div className=" w-full flex lg:flex-row flex-col lg:space-x-2 space-x-0 space-y-2 lg:space-y-0 justify-between">
                    <Toggle onPressedChange={() => setSelectedFeeType("fast")} pressed={selectedFeeType === "fast"} variant="outline" className="w-full flex flex-col py-10">
                      <div>Fast</div>
                      <div>{fastestFee} sat/vB</div>
                      <div>~ 10 mins</div>
                    </Toggle>
                    <Toggle
                      onPressedChange={() => {
                        setSelectedFeeType("custom")
                        if (customFeeInput.current)
                          customFeeInput.current.focus()
                      }}
                      pressed={selectedFeeType === "custom"}
                      variant="outline"
                      className="w-full flex flex-col py-10">
                      <div>Custom</div>
                      <div className="flex flex-row items-center">
                        <input
                          value={customFee}
                          // onBlur={() => console.log(customFee)}
                          onChange={(e: any) => {
                            setCustomFee(e.target.value)
                          }}
                          ref={customFeeInput}
                          className={`${selectedFeeType === "custom" ? "w-12" : "opacity-0 w-0"} p-1 my-0 `}
                          type="number" />
                        <div className={`${selectedFeeType === "custom" ? "opacity-0 w-0" : ""}`}>
                          {customFee}
                        </div>
                        <div className="ml-2">
                          sat/vB
                        </div>
                      </div>
                    </Toggle>
                  </div>
                  <div className=" w-full flex lg:flex-row flex-col lg:space-x-2 space-x-0 space-y-2 lg:space-y-0 justify-between">
                    <Toggle onPressedChange={() => setSelectedFeeType("average")} pressed={selectedFeeType === "average"} variant="outline" className="w-full flex flex-col py-10">
                      <div>Average</div>
                      <div>{halfHourFee} sat/vB</div>
                      <div>~ 30 mins</div>
                    </Toggle>
                    <Toggle onPressedChange={() => setSelectedFeeType("slow")} pressed={selectedFeeType === "slow"} variant="outline" className="w-full flex flex-col py-10">
                      <div>Slow</div>
                      <div>{hourFee} sat/vB</div>
                      <div>~ 1 hour</div>
                    </Toggle>
                  </div>
                  <Button onClick={() => {
                    const satsbyte = getUserSelectedSatsbyte()
                    if (satsbyte < minimumFee) {
                      showAlert("You have set too low satsbyte. Transaction might be stuck...")
                      return;
                    }
                    if (satsbyte >= 200) {
                      showAlert("You have set too high satsbyte. You might pay high network fee...")
                      return;
                    }
                    if (nextFunctionForSatsbyte === "mint") {
                      onCloseSatsbyte()
                      mintProfileNft(satsbyte)
                    }
                    if (nextFunctionForSatsbyte === "set") {
                      onCloseSatsbyte()
                      setToRealm(satsbyte)
                    }
                    if (nextFunctionForSatsbyte === "edit") {
                      onCloseSatsbyte()
                      editProfile(satsbyte)
                    }
                  }}>Next</Button>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

      </div>
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-1 xl:min-h-[800px] p-4">
        <div className="flex justify-center align-top items-baseline">
          <div className="mx-auto grid gap-6">

            {
              isMobile ? (
                <div>
                  We are temporarily unavailable to provide set-to-realm function on mobile devices. Please access from your PC to proceed...
                </div>
              ) : (<></>)
            }

            <div className="grid gap-4">
              {
                // loading ? (
                //   <div className="mt-8 flex flex-row gap-4"> <LoadingSpinner /> loading subrealms...</div>
                // ) : (
                <Tabs defaultValue="mint" value={currentTab} onValueChange={(val) => setCurrentTab(val)} className="">
                  <TabsList className="w-full">
                    <TabsTrigger className="w-full" value="mint">
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>

                    </TabsTrigger>
                    <TabsTrigger className="w-full" value="owned">
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    </TabsTrigger>
                    <TabsTrigger className="w-full" value="edit">
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path xmlns="http://www.w3.org/2000/svg" id="Shape" d="M.75,17.5A.751.751,0,0,1,0,16.75V12.569a.755.755,0,0,1,.22-.53L11.461.8a2.72,2.72,0,0,1,3.848,0L16.7,2.191a2.72,2.72,0,0,1,0,3.848L5.462,17.28a.747.747,0,0,1-.531.22ZM1.5,12.879V16h3.12l7.91-7.91L9.41,4.97ZM13.591,7.03l2.051-2.051a1.223,1.223,0,0,0,0-1.727L14.249,1.858a1.222,1.222,0,0,0-1.727,0L10.47,3.91Z" transform="translate(3.25 3.25)" fill="currentColor" />
                      </svg>
                    </TabsTrigger>
                    <TabsTrigger className="w-full" value="article">
                      <svg className="w-6 h-6 text-gray-800 dark:text-white" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <style type="text/css"> </style> <g> <polygon className="st0" points="93.539,218.584 275.004,218.584 354.699,138.894 355.448,138.145 355.448,125.045 93.539,125.045 "></polygon> <polygon className="st0" points="402.213,433.724 46.77,433.724 46.77,78.276 402.213,78.276 402.213,91.467 448.983,56.572 448.983,31.506 0,31.506 0,480.494 448.983,480.494 448.983,289.204 402.213,335.974 "></polygon> <path className="st0" d="M229.358,274.708H93.539v28.062h120.476C218.602,292.858,223.932,283.312,229.358,274.708z"></path> <path className="st0" d="M93.539,349.539v28.062h110.935c-3.275-8.796-4.302-18.334-3.649-28.062H93.539z"></path> <path className="st0" d="M290.939,268.789c-15.501,15.501-55.612,80.76-40.11,96.27c15.51,15.51,80.76-24.609,96.27-40.11l63.755-63.77 l-56.155-56.15L290.939,268.789z"></path> <path className="st0" d="M500.374,115.509c-15.511-15.502-40.649-15.502-56.15,0l-76.682,76.685l56.156,56.15l76.676-76.685 C515.875,156.158,515.875,131.019,500.374,115.509z M400.166,202.361l-9.636-9.628l53.684-53.684l9.619,9.618L400.166,202.361z"></path> </g> </g></svg>
                    </TabsTrigger>
                    {/* <TabsTrigger className="w-full" value="any">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                      </TabsTrigger> */}
                  </TabsList>

                  <TabsContent value="mint" className="">
                    <div className="grid gap-2">
                      <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Create Profile</h1>
                        <p className="text-balance text-muted-foreground">
                          Create and Mint a profile NFT for your realms.
                        </p>
                      </div>

                      <CardContent className="bg-card pt-6 rounded-lg">
                        <div className="grid gap-4">
                          <PFPEdit value={pfpUri} onEdit={(data: any) => setPfpUri(data || "atom:btc:id:189550")} />
                          <NameEdit value={profileName} onEdit={(data: any) => setProfileName(data || "Click to edit your name")} />
                          <DescriptionEdit value={profileDescription} onEdit={(data: any) => setProfileDescription(data || "Click to write your bio or description.")} />
                          <LinksEdit value={links} onEdit={(data: any) => setLinks(data)} />
                          <DonatesEdit value={donates} onEdit={(data: any) => setDonates(data)} />
                          <CollectionsEdit value={collections} onEdit={(data: any) => setCollections(data)} />
                          <Button className="" onClick={() => {
                            if (!walletData.connected) {
                              showAlert("Connect your wallet to continue.")
                              if (typeof window !== 'undefined' && window.wizz) {
                                connectWizz()
                              }
                              else if (typeof window !== 'undefined' && window.unisat) {
                                connectUnisat()
                              }
                              return
                            }
                            if (!pfpUri || pfpUri === "atom:btc:id:" || pfpUri === "atom:btc:dat:" || pfpUri === "ord:btc:id:") {

                              setPfpUri("atom:btc:id:189550")
                            }
                            if (!profileDescription || profileDescription === "Click to write your bio or description.")
                              setProfileDescription(`This profile has been created on Realmbullrun.com , check it out on https://realmbullrun.com`)
                            const profileJson = getProfileJson({
                              pfpUri: (!pfpUri || pfpUri === "atom:btc:id:" || pfpUri === "atom:btc:dat:" || pfpUri === "ord:btc:id:") ? "atom:btc:id:189550" : pfpUri,
                              profileName,
                              profileDescription: (!profileDescription || profileDescription === "Click to write your bio or description.") ? "This profile has been created on Realmbullrun.com , check it out on https://realmbullrun.com" : profileDescription,
                              links,
                              donates,
                              collections
                            })
                            if (!pfpUri || !profileName || !profileDescription || profileName === "Click to edit your name" || profileDescription === "Click to write your bio or description.") {
                              showAlert("You should at least set your name.")
                              return
                            }
                            setProfileJson(profileJson)
                            openSatsbyteWindow("mint")
                          }}>Mint Profile</Button>
                          <Button className="" onClick={() => {
                            if (!pfpUri || pfpUri === "atom:btc:id:" || pfpUri === "atom:btc:dat:" || pfpUri === "ord:btc:id:") {
                              setPfpUri("atom:btc:id:189550")
                            }
                            if (!profileDescription || profileDescription === "Click to write your bio or description.")
                              setProfileDescription(`This profile has been created on realmbullrun.com , check it out on https://realmbullrun.com/explore`)
                            const profileJson = getProfileJson({
                              pfpUri: (!pfpUri || pfpUri === "atom:btc:id:" || pfpUri === "atom:btc:dat:" || pfpUri === "ord:btc:id:") ? "atom:btc:id:189550" : pfpUri,
                              profileName,
                              profileDescription: (!profileDescription || profileDescription === "Click to write your bio or description.") ? "This profile has been created on Realmbullrun.com , check it out on https://realmbullrun.com" : profileDescription,
                              links,
                              donates,
                              collections
                            })
                            if (!pfpUri || !profileName || !profileDescription || profileName === "Click to edit your name" || profileDescription === "Click to write your bio or description.") {
                              showAlert("You should at least set your name.")
                              return
                            }
                            setProfileJson(profileJson)
                            downloadProfileJson()
                          }}>Download JSON</Button>
                        </div>
                      </CardContent>
                    </div>
                  </TabsContent>

                  <TabsContent value="owned" className="">
                    <div className="grid gap-2">
                      <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Set My Profile</h1>
                        <p className="text-balance text-muted-foreground">
                          Set profile to your realmnames
                        </p>
                      </div>

                      {
                        (!subrealmList || subrealmList.length <= 0) ? (
                          <>
                            <div className="mt-8 ">There are no +{tlr} subrealms in this wallet.</div>
                            <div>Connect different account or mint your +{tlr} subrealm.</div>
                          </>
                        ) : (
                          <></>
                        )
                      }
                      <p className="text-gray-600 -mb-2">Profile</p>
                      <Select value={!currentProfileId ? "" : currentProfileId} onValueChange={(val: any) => setCurrentProfileId(val.toString())}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your profile." />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            profileNftList ? profileNftList.map((elem: any) => (
                              <SelectItem key={elem.atomical_id} value={`${elem.atomical_id}`}>{elem?.data?.state?.latest?.name || elem?.data?.state?.latest?.name || "unknown"}{` ( ${elem.atomical_number} )`}</SelectItem>
                            )) : 'Nothing found'
                          }
                        </SelectContent>
                      </Select>

                      <div className="w-full flex justify-center mt-4">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.119 8h9.762a1 1 0 0 1 .772 1.636l-4.881 5.927a1 1 0 0 1-1.544 0l-4.88-5.927A1 1 0 0 1 7.118 8Z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 -mb-2">
                        Realm
                      </p>
                      <Select value={!currentSubrealmId ? "" : currentSubrealmId} onValueChange={(val: any) => setCurrentSubrealmId(val.toString())}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select the realm." />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            subrealmList && subrealmList.map((elem: any) => (
                              <SelectItem key={elem.atomical_id} value={`${elem.atomical_id}`}>+{elem.full_realm_name || "unknown"}</SelectItem>
                            ))
                          }
                          {
                            realmList && realmList.map((elem: any) => (
                              <SelectItem key={elem.atomical_id} value={`${elem.atomical_id}`}>+{elem.full_realm_name || "unknown"}</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                      <Button
                        className=""
                        // disabled={!subrealmList || subrealmList.length <= 0}
                        onClick={() => {

                          if (!walletData.connected) {
                            showAlert("Connect your wallet to continue.")
                            if (typeof window !== 'undefined' && window.wizz) {
                              connectWizz()
                            }
                            else if (typeof window !== 'undefined' && window.unisat) {
                              connectUnisat()
                            }
                            return
                          }

                          const delegate = currentProfileId

                          if (!delegate) {
                            showAlert("Select profile to set to realm.")
                            return
                          }

                          if (!currentSubrealmId) {
                            showAlert("Select subrealm to set this profile.")
                            return
                          }

                          openSatsbyteWindow("set")
                          // setToRealm()
                        }}
                      >
                        Set to Realm
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="any" className="">
                    <div className="grid gap-2">
                      <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Any Profile</h1>
                        <p className="text-balance text-muted-foreground">
                          Set ANY profile to your {tlr} realms.
                        </p>
                      </div>
                      {
                        (!subrealmList || subrealmList.length <= 0) ? (
                          <>
                            <div className="mt-8 ">There are no +{tlr} subrealms in this wallet.</div>
                            <div>Connect different account or mint your +{tlr} subrealm.</div>
                          </>
                        ) : (
                          <></>
                        )
                      }
                      <p className="text-gray-600 -mb-2">Profile</p>
                      <Input
                        className=""
                        value={delegateInput}
                        placeholder="Input delegate id to set to realm..."
                        onChange={(e) => setDelegateInput(e.target.value)}
                      />
                      <div className="w-full flex justify-center mt-4">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.119 8h9.762a1 1 0 0 1 .772 1.636l-4.881 5.927a1 1 0 0 1-1.544 0l-4.88-5.927A1 1 0 0 1 7.118 8Z" />
                        </svg>
                      </div>
                      <p className="text-gray-600 -mb-2">Realm</p>
                      <Select value={!currentSubrealmId ? "" : currentSubrealmId} onValueChange={(val: any) => setCurrentSubrealmId(val.toString())}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your profile to set to realm." />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            subrealmList && subrealmList.map((elem: any) => (
                              <SelectItem key={elem.atomical_id} value={`${elem.atomical_id}`}>+{elem.full_realm_name || "unknown"}</SelectItem>
                            ))
                          }
                          {
                            realmList && realmList.map((elem: any) => (
                              <SelectItem key={elem.atomical_id} value={`${elem.atomical_id}`}>+{elem.full_realm_name || "unknown"}</SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                      <Button
                        className=""
                        // disabled={!subrealmList || subrealmList.length <= 0}
                        onClick={() => {
                          openSatsbyteWindow("set")
                          // setToRealm()
                        }}
                      >
                        Set to Realm
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="edit" className="">
                    <div className="grid gap-2">
                      <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Edit profile</h1>
                        <p className="text-balance text-muted-foreground">
                          Edit your profiles
                        </p>
                      </div>

                      <p className="text-gray-600 -mb-2">Profile</p>
                      <Select value={!editingProfileId ? "" : editingProfileId} onValueChange={(val: any) => setEditingProfileId(val.toString())}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your profile." />
                        </SelectTrigger>
                        <SelectContent>
                          {
                            profileNftList ? profileNftList.map((elem: any) => (
                              <SelectItem key={elem.atomical_id} value={`${elem.atomical_id}`}>{elem?.data?.state?.latest?.name || elem?.data?.state?.latest?.fields?.name || "unknown"}{` ( ${elem.atomical_number} )`}</SelectItem>
                            )) : 'Nothing found'
                          }
                        </SelectContent>
                      </Select>

                      <div className="w-full flex justify-center mt-4">
                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7.119 8h9.762a1 1 0 0 1 .772 1.636l-4.881 5.927a1 1 0 0 1-1.544 0l-4.88-5.927A1 1 0 0 1 7.118 8Z" />
                        </svg>
                      </div>


                      <CardContent className="bg-card pt-6 rounded-lg">
                        <div className="grid gap-4">
                          <PFPEdit value={editingPfpUri} onEdit={(data: any) => setEditingPfpUri(data || "atom:btc:id:189550")} />
                          <NameEdit value={editingProfileName} onEdit={(data: any) => setEditingProfileName(data || "Click to edit your name")} />
                          <DescriptionEdit value={editingProfileDescription} onEdit={(data: any) => setEditingProfileDescription(data || "Click to write your bio or description.")} />
                          <LinksEdit value={editingLinks} onEdit={(data: any) => setEditingLinks(data)} />
                          <DonatesEdit value={editingDonates} onEdit={(data: any) => setEditingDonates(data)} />
                          <CollectionsEdit value={editingCollections} onEdit={(data: any) => setEditingCollections(data)} />
                        </div>
                      </CardContent>

                      <Button
                        className=""
                        // disabled={!subrealmList || subrealmList.length <= 0}
                        onClick={() => {

                          if (!walletData.connected) {
                            showAlert("Connect your wallet to continue.")
                            if (typeof window !== 'undefined' && window.wizz) {
                              connectWizz()
                            }
                            else if (typeof window !== 'undefined' && window.unisat) {
                              connectUnisat()
                            }
                            return
                          }

                          if (!editingProfileId) {
                            showAlert("Select profile to modify.")
                            return
                          }

                          if (!editingPfpUri || editingPfpUri === "atom:btc:id:" || editingPfpUri === "atom:btc:dat:" || editingPfpUri === "ord:btc:id:") {

                            setPfpUri("atom:btc:id:189550")
                          }
                          if (!editingProfileDescription || editingProfileDescription === "Click to write your bio or description.")
                            setProfileDescription(`This profile has been created on Realmbullrun.com , check it out on https://realmbullrun.com`)
                          const profileJson = getProfileJson({
                            pfpUri: (!editingPfpUri || editingPfpUri === "atom:btc:id:" || editingPfpUri === "atom:btc:dat:" || editingPfpUri === "ord:btc:id:") ? "atom:btc:id:189550" : editingPfpUri,
                            profileName: editingProfileName,
                            profileDescription: (!editingProfileDescription || editingProfileDescription === "Click to write your bio or description.") ? "This profile has been created on Realmbullrun.com , check it out on https://realmbullrun.com" : editingProfileDescription,
                            links: editingLinks,
                            donates: editingDonates,
                            collections: editingCollections
                          })
                          if (!editingPfpUri || !editingProfileName || !editingProfileDescription || editingProfileName === "Click to edit your name" || editingProfileDescription === "Click to write your bio or description.") {
                            showAlert("You should at least set your name.")
                            return
                          }
                          setEditingProfileJson(profileJson)
                          openSatsbyteWindow("edit")
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="article" className="">
                    <div className="grid gap-2">
                      <div className="grid gap-2 text-center">
                        <h1 className="text-3xl font-bold">Create Article</h1>
                        <p className="text-balance text-muted-foreground">
                          Create and Mint an article NFT for your realms.
                        </p>
                      </div>
                      <CardContent className="bg-card pt-6 rounded-lg">
                        <div className="grid gap-4">
                          <DragAndDropEditor setArticleData={setArticleData} />
                          <Button onClick={handleMintArticle}>Mint Article</Button>
                        </div>
                      </CardContent>
                    </div>
                  </TabsContent>

                </Tabs >
                // )
              }
            </div >
          </div >
        </div >
        {/* <div className="hidden bg-muted lg:block">
          <Image
            src="/Banner.gif"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div> */}
      </div >
    </>

  )
}

export default Profiles