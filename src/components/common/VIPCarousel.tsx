"use client"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Autoplay from "embla-carousel-autoplay"
import DummyCard from "./DummyCard"
import VIPCard from "./VIPCard"
import { Card } from "../ui/card"

export default function VIPCaurosel({ data }: { data: any[] }) {

  const dummyData = [
    {
      subrealm: "atomicalsxyz",
      href: "https://x.com/atomicalsxyz",
      image: "/partners/atomicalsxyz.png"
    },
    {
      subrealm: "wizz",
      href: "https://wizz.cash",
      image: "/partners/wizz.png"
    },
    {
      subrealm: "atomicalmarket",
      href: "https://atomicalmarket.com",
      image: "/partners/atomicalmarket.png"
    },
    {
      subrealm: "satsx",
      href: "https://satsx.io",
      image: "/partners/satsx.png"
    },
    {
      subrealm: "bitatom",
      href: "https://bitatom.io",
      image: "/partners/bitatom.png"
    },
    {
      subrealm: "toothy",
      href: "https://toothy.club",
      image: "/partners/toothy.png"
    },
  ]

  return (
    <div className="mx-16 mt-4">
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000
          })
        ]}

        className="w-full max-w-2xl mx-auto"
      >
        <CarouselContent className="">
          {
            dummyData.map((dummyItem: any, index: any) => (
              <CarouselItem className=" md:basis-1/5 sm:basis-1/3 flex justify-center " key={index}>
                <div className="p-2 bg-card">
                  <DummyCard data={dummyItem} />
                </div>
              </CarouselItem>
            ))
          }
          {
            data && data.map((elem: any, index: any) => (
              (elem.fullRealmName !== "bullrun.erik" && elem.fullRealmName !== "bullrun.atomicals") ? (
                <CarouselItem className=" md:basis-1/5 sm:basis-1/3 flex justify-center" key={elem.atomicalId}>
                  <div className="p-2 bg-card">
                    <VIPCard data={{
                      fullRealmName: elem.fullRealmName,
                      subrealm: elem.subrealm,
                      href: `https://realmbullrun.com/${elem.fullRealmName}`,
                      image: elem.pfpUri
                    }} />
                  </div>
                </CarouselItem>
              ) : (<></>)
            ))
          }
          <CarouselItem className="lg:basis-1/5 md:basis-1/3 sm:basis-1/3 flex justify-center" key={"happilynorth"}>
            <Card className="p-2 w-max">
              <VIPCard data={{
                fullRealmName: "happilynorth",
                href: `https://realmbullrun.com/happilynorth`,
                image: "atom:btc:id:213788"
              }} />
            </Card>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}