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
import getRecentProfiles from "@/lib/get-recent-profiles"
import { useEffect, useState } from "react"
import RecentProfileCard from "./RecentProfileCard"

export default function RecentCaurosel() {

  const [recentItems, setRecentItems] = useState<any>([])

  const getData = async () => {
    const recentItems = await getRecentProfiles()
    console.log(recentItems)
    setRecentItems(recentItems)
  }

  useEffect(() => {
    const init = async () => await getData()
    init()
  }, [])

  return (
    <div className={`mx-auto mt-4 w-full ${(recentItems && recentItems.length > 0) ? "" : "hidden"}`}>
      <Carousel
        plugins={[
          Autoplay({
            delay: 5000
          })
        ]}

        className="w-11/12 max-w-screen-2xl mx-auto"
      >
        <CarouselContent className="">
          {
            recentItems && recentItems.map((item: any, index: any) => (
              <CarouselItem className="lg:basis-1/5 md:basis-1/3 sm:basis-1/3 flex justify-center" key={`recent_profile_${index}`}>
                <Card className="p-2 w-max">
                  <RecentProfileCard
                    data={item}
                  />
                </Card>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}