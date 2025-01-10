import { useContext, useEffect } from "react";
import { WalletContext } from "@/providers/WalletContextProvider";
import { AppContext } from "@/providers/AppContextProvider";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Button } from "./ui/button";
import { Badge } from "@/components/ui/badge"
import Link from "next/link";
import { BitcoinIcon } from "./icons/BitcoinIcon";
import { RepairIcon } from "./icons/RepairIcon";
import { BsWallet } from 'react-icons/bs'
import { Switch } from "./ui/switch";
import { createMnemonicPhrase } from "@/app/atomical-lib/utils/create-mnemonic-phrase";
import { switchLibraryNetwork } from "@/app/atomical-lib/commands/command-helpers";
import Image from "next/image";
import WizzSvg from "./icons/WizzSvg";
import OKXSvg from "./icons/OKXSvg";
import UnisatSvg from "./icons/UnisatSvg";

declare global {
  interface Window {
    wizz: any;
    unisat: any;
    okxwallet: any;
  }
}

export const WalletConnect = () => {
  const { walletData, setWalletData } = useContext(WalletContext);
  const { network, setNetwork, setMnemonic } = useContext(AppContext)

  const connectWizz = async () => {
    if (hasWizzExtension() && !walletData.connected) {
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
  };

  const connectOKX = async () => {
    if (hasOKXExtension() && !walletData.connected) {
      const result = await window.okxwallet.bitcoin.requestAccounts()
      if (result && result.address) {
        setWalletData({
          ...walletData,
          type: "okx",
          connected: true,
          primary_addr: result.address,
        });
      }
    }
  };

  const connectUnisat = async () => {
    if (hasUnisatExtension() && !walletData.connected) {
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
  };

  const isWizzConnected = async () => {
    if (hasWizzExtension()) {
      const result: string[] = await window.wizz.getAccounts()
      return result.length > 0
    }
  }

  const isOKXConnected = async () => {
    if (hasOKXExtension()) {
      const result = await window.okxwallet.bitcoin.getAccounts()
      return (result && result.length > 0) 
    }
  }

  const isUnisatConnected = async () => {
    if (hasUnisatExtension()) {
      const result: string[] = await window.unisat.getAccounts()
      return result.length > 0
    }
  }

  const getWizzAccounts = async () => {
    if (typeof window !== 'undefined' && typeof window.wizz !== 'undefined') {
      const accounts: string[] = await window.wizz.getAccounts()
      if ( accounts && accounts.length > 0 && accounts[0].startsWith('tb') )
        setNetwork('testnet')
      return accounts
    }
    return []
  }

  const getUnisatAccounts = async () => {
    if (typeof window !== 'undefined' && typeof window.unisat !== 'undefined') {
      const accounts: string[] = await window.unisat.getAccounts()
      if ( accounts && accounts.length > 0 && accounts[0].startsWith('tb') )
        setNetwork('testnet')
      return accounts
    }
    return []
  }
  
  const getOKXAccounts = async () => {
    if (typeof window !== 'undefined' && typeof window.okxwallet !== 'undefined') {
      const accounts: string[] = await window.okxwallet.bitcoin.requestAccounts()
      if ( accounts && accounts.length > 0 && accounts[0].startsWith('tb') )
        setNetwork('testnet')
      return accounts
    }
    return []
  }

  const disconnectWallet = () => {
    setWalletData({
      type: null,
      connected: false,
      primary_addr: null,
    });
  };

  const hasWizzExtension = () => {
    return typeof window !== "undefined" && typeof window.wizz !== "undefined";
  };

  const hasOKXExtension = () => {
    return typeof window !== "undefined" && typeof window.okxwallet !== "undefined";
  };

  const hasUnisatExtension = () => {
    return typeof window !== "undefined" && typeof window.unisat !== "undefined";
  };

  const handleSwitchChange = async (checked: any) => {
    try {
      const isWizz = walletData.connected && walletData.type === 'wizz' && await isWizzConnected()
      if (isWizz) {
        await window.wizz.switchNetwork(checked ? "livenet" : "testnet");
        await getWizzAccounts()
      }
      else {
        const isUnisat = walletData.connected && walletData.type === 'unisat' && await isUnisatConnected()
        if (isUnisat) {
          await window.unisat.switchNetwork(checked ? "livenet" : "testnet");
          await getUnisatAccounts()
        }
      }
      setNetwork(checked ? 'bitcoin' : 'testnet');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    switchLibraryNetwork(network)
  }, [network])

  useEffect(() => {
    const checkRealWalletConnectivity = async () => {
      
      if (localStorage.getItem('clientSeed')) {
        setMnemonic(localStorage.getItem('clientSeed'))
      }
      else {
        const clientSeed = createMnemonicPhrase().phrase
        setMnemonic(clientSeed)
        localStorage.setItem('clientSeed', clientSeed)
      }

      if (typeof window !== 'undefined' && await hasWizzExtension() && await isWizzConnected()) {       
        window.wizz.on('networkChanged', (network_str: string) => {
          if (network_str === 'livenet')
            setNetwork('bitcoin')
          else
            setNetwork('testnet')
          connectWizz()
        })

        window.wizz.on('accountsChanged', (accounts: Array<string>) => {
          connectWizz()
        });

        const accounts = await getWizzAccounts()
        if (accounts.length > 0) {
          setWalletData({
            ...walletData,
            type: "wizz",
            connected: true,
            primary_addr: accounts[0],
          });
        }
      }
      else if (typeof window !== 'undefined' && await hasUnisatExtension() && await isUnisatConnected()) {
        window.unisat.on('networkChanged', (network_str: string) => {
          if (network_str === 'livenet')
            setNetwork('bitcoin')
          else
            setNetwork('testnet')
          connectUnisat()
        })

        window.unisat.on('accountsChanged', (accounts: Array<string>) => {
          connectUnisat()
        });

        const accounts = await getUnisatAccounts()
        if (accounts.length > 0) {
          setWalletData({
            ...walletData,
            type: "unisat",
            connected: true,
            primary_addr: accounts[0],
          });
        }
      }
      else if (typeof window !== 'undefined' && await hasOKXExtension() && await isOKXConnected()) {

        // network changed ???

        window.okxwallet.bitcoin.on('accountsChanged', (accounts: Array<string>) => {
          connectOKX()
        });

        const accounts = await getOKXAccounts()
        if (accounts.length > 0) {
          setWalletData({
            ...walletData,
            type: "okx",
            connected: true,
            primary_addr: accounts[0],
          });
        }
      }
    }
    checkRealWalletConnectivity()
  }, [])

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          {walletData.connected ? (
            <>
              {
                walletData.pendingTxCount > 0 ? (<Badge className="absolute right-2 top-1">{walletData.pendingTxCount} tx in progress</Badge>) : (<></>)
              }              
              {walletData.primary_addr.slice(0, 4)}...{walletData.primary_addr.slice(-4)}
            </>
          ) : (
            <>
              <div className="sm:hidden">
                <BsWallet />
              </div>
              <div className="hidden sm:flex">
                Connect
              </div>
            </>
          )}
        </MenubarTrigger>
        <MenubarContent className="flex items-center flex-col gap-1">


          {walletData.connected ? (
            <>
              <Link target="_blank" href={`${network === "testnet" ? process.env.NEXT_PUBLIC_MEMPOOL_TESTNET_APIENDPOINT : process.env.NEXT_PUBLIC_MEMPOOL_APIENDPOINT}/../address/${walletData.primary_addr}`}>
                History
              </Link>
              <Link target="_self" href={"/myitems"}>
                My Items
              </Link>
              <Link target="_self" href={"/recover"}>
                Recover
              </Link>
              <MenubarSeparator />
              <Button onClick={disconnectWallet}>
                Disconnect
              </Button>

            </>
          ) : (

            <>
              <MenubarItem>
                {typeof window !== 'undefined' && window.wizz ? (
                  <Button className="flex justify-between w-[120px]" color="primary" onClick={connectWizz}>
                    <WizzSvg /> Wizz
                  </Button>
                ) : (
                  <Link target="_blank" href="https://wizzwallet.io/">
                    Install Wizz Wallet
                  </Link>
                )}
              </MenubarItem>
              {/* <MenubarItem>
                {typeof window !== 'undefined' && window.unisat ? (
                  <Button className="flex justify-between w-[120px]" color="primary" onClick={connectOKX}>
                    <OKXSvg /> OKX
                  </Button>
                ) : (
                  <Link target="_blank" href="https://www.okx.com/web3">
                    Install OKX Wallet
                  </Link>
                )}
              </MenubarItem> */}
              <MenubarItem>
                {typeof window !== 'undefined' && window.unisat ? (
                  <Button className="flex justify-between w-[120px]" color="primary" onClick={connectUnisat}>
                    <UnisatSvg /> Unisat
                  </Button>
                ) : (
                  <Link target="_blank" href="https://unisat.io/download">
                    Install Unisat Wallet
                  </Link>
                )}
              </MenubarItem>
            </>
          )}

          <MenubarSeparator />
          <div className="w-full content-center items-center justify-between hidden">
            {network === 'bitcoin' ?
              <BitcoinIcon /> : <RepairIcon />
            }
            <Switch
              checked={network === 'bitcoin'}
              onCheckedChange={handleSwitchChange}
            >
            </Switch>

          </div>

        </MenubarContent>
      </MenubarMenu>

    </Menubar>
  );
};
