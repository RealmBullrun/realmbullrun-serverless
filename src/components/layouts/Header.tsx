"use client"

import { Logo } from "./Logo"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useRouter } from "next/navigation"
import { WalletConnect } from "../WalletConnect"
import { ModeToggle } from "../ui/ModeToggle"
import { BsList } from 'react-icons/bs'
import Link from "next/link"
import Image from "next/image"
import SearchBox from "../SearchBox"

export const Header = () => {

  const router = useRouter()

  const menuItems = [
    {
      icon: "/icons8-explore.png",
      text: "Explore",
      href: "/explore"
    },
    {
      icon: "/icons8-mine-64.png",
      text: "Mint Subrealm",
      href: "/mint-subrealm"
    },
    {
      icon: "/icons8-profile.png",
      text: "Profile",
      href: "/profil"
    },
    {
      icon: "/icons8-article-64.png", // Add an appropriate icon
      text: "Create Article",
      href: "/create-article"
    },
    {
      icon: "/icons8-bull-64.png",
      text: "Collection",
      href: "/collection"
    },
    {
      icon: "/icons8-question.png",
      text: "FAQ",
      href: "/qna"
    }
  ]

  return (
    <>
      <Menubar className="fixed z-50 top-0 w-full flex justify-between sm:px-8 px-4 py-8 rounded-none border-x-0 border-t-0 bg-background">  {/* //#bf94eb21 */}
        <div className="flex flex-row gap-10 justify-between w-full md:w-auto">
          <Logo />

          <div className="md:hidden flex flex-row">
            <SearchBox />
            <MenubarMenu >
              <MenubarTrigger><BsList size="24" /></MenubarTrigger>
              <MenubarContent className="flex flex-col gap-2">
                {
                  menuItems.map((item: any) => (
                    <MenubarItem key={item.href} onClick={() => router.push(item.href)}>
                      <div className="flex flex-row gap-4 items-center">
                        <Image src={item.icon} height={64} width={64} alt={item.text} className="h-6 w-6 bg-white p-1 rounded-md " />
                        <div>{item.text}</div>
                      </div>
                    </MenubarItem>
                  ))
                }
                <MenubarItem key={"twitter"} onClick={() => router.push("https://x.com/realmbullrun")}>
                  <div className="flex flex-row gap-4 items-center">
                    <Image src={"/icons8-x.png"} height={64} width={64} alt={""} className="h-6 w-6 bg-white p-1 rounded-md " />
                    <div>{"Join on X"}</div>
                  </div>
                </MenubarItem>
                <MenubarItem key={"telegram"} onClick={() => router.push("https://t.me/realmbullrun")}>
                  <div className="flex flex-row gap-4 items-center">
                    <Image src={"/icons8-telegram.png"} height={64} width={64} alt={""} className="h-6 w-6 bg-white p-1 rounded-md " />
                    <div>{"Join on TG"}</div>
                  </div>
                </MenubarItem>

                <div className="flex md:hidden flex-row space-x-2">
                  <ModeToggle />
                  <WalletConnect />
                </div>
              </MenubarContent>
            </MenubarMenu>
          </div>

          <div className="hidden md:flex md:flex-row md:space-x-4 items-center">
            {
              menuItems.map((item: any) => (
                <Link className="hover:scale-95" key={item.href} href={item.href} target="_self">
                  <Image src={item.icon} height={64} width={64} alt={item.text} className="h-6 w-6 bg-white p-1 rounded-md" />
                </Link>
              ))
            }
            <Link className="hover:scale-95" href={"https://x.com/realmbullrun"} target="_blank">
              <Image src={"/icons8-x.png"} height={64} width={64} alt={""} className="h-6 w-6 bg-white p-1 rounded-md" />
            </Link>
            <Link className="hover:scale-95" href={"https://t.me/realmbullrun"} target="_blank">
              <Image src={"/icons8-telegram.png"} height={64} width={64} alt={""} className="h-6 w-6 bg-white p-1 rounded-md" />
            </Link>
            {/* <Link href={item.href} target="_self">
              <Image src={item.icon} height={64} width={64} alt={item.text} className="h-5 w-5" />
            </Link> */}

            {/* <MenubarMenu >
              <MenubarTrigger><BsList size="24" /></MenubarTrigger>
              <MenubarContent className="flex flex-col gap-2">
                {
                  menuItems.map((item: any) => (
                    <MenubarItem key={item.href} onClick={() => router.push(item.href)}>
                      {item.text}
                    </MenubarItem>
                  ))
                }
                <div className="flex sm:hidden flex-row space-x-2">
                  <ModeToggle />
                  <WalletConnect />
                </div>
              </MenubarContent>
            </MenubarMenu> */}
          </div>
        </div>

        <div className="hidden md:flex md:flex-row space-x-2">
          <SearchBox />
          <ModeToggle />
          <WalletConnect />
        </div>


      </Menubar>

    </>
  )
}