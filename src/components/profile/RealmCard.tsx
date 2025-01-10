"use client"
import { useContext } from "react"

import { AppContext } from "@/providers/AppContextProvider";

import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { DynamicIcon } from "../icons/DynamicIcon";
import Link from "next/link";
import { BsLightning } from "react-icons/bs";
import { ImageFromUri } from "./ImageFromUri";

export const RealmCard = ({ atomicalId, title, atomical_number = '??????', links, fullRealmName, pfpUri }: { atomicalId?: string, title?: string, atomical_number?: string, links?: any, fullRealmName?: string, pfpUri: string }) => {
    const { tlr, showAlert } = useContext(AppContext)
    
    const boostAlert = () => {
        console.log(links)
        showAlert('Bitwork-Boost soon available')
    }

    const getXLink = () => {
        try {
            const { items } = links["0"]
            const itemKeys = Object.keys(items)
            for (const itemKey of itemKeys) {
                const { name, type, url } = items[itemKey]
                if (type === "x" || type === "twitter")
                    return { name, type, url }
            }
        } catch (error) { }
        return null
    }

    return atomicalId?.startsWith('fake-skeleton') ? (
        <Skeleton className="h-[176px] w-full " />
    ) : (
        <Card className={`relative hover:shadow-[0px_0px_40px_4px_rgba(117,141,179,0.31)]`}>
            <div className="bg-background rounded-lg absolute top-0 right-0 border-0 text-lg font-bold py-1 px-2 rounded-tl-lg z-30">
                <span>{fullRealmName ? fullRealmName.substring(8) : ''}</span>
            </div>
            <CardHeader className="p-2 pb-0" >
                <div className=" flex flex-col items-center">
                    <ImageFromUri additionalClass="rounded-lg image-pixel" uri={pfpUri} />
                </div>
                <div className="flex flex-row items-center justify-between">
                    <CardTitle className="text-xl">
                        <a href={`/${fullRealmName || ''}`} target="_blank">
                            {title ? (title.length > 13 ? `${title.substring(0, 13)}...` : title) : ''}
                        </a>
                    </CardTitle>

                    {/* <div className="text-sm text-slate-400">#{atomical_number}</div> */}
                </div>
            </CardHeader>
            <CardFooter className="p-2  justify-between">
                <div className="flex gap-2 flex-row">
                    {
                        (title && title !== "---") ? (
                            <Link className="bg-border p-1.5 rounded-md hover:scale-95" href={`/${fullRealmName}`} target="_blank">
                                <DynamicIcon type="person" />
                            </Link>
                        ) : (
                            <></>
                        )
                    }
                    {
                        (getXLink()) ? (
                            <Link className="bg-border p-1.5 rounded-md hover:scale-95" href={getXLink()?.url} target="_blank">
                                <DynamicIcon type="x" url={getXLink()?.url} />
                            </Link>
                        ) : (
                            <></>
                        )
                    }
                </div>
                <div className="flex gap-4 flex-row">
                    <Link onClick={boostAlert} className="p-1.5 rounded-md hover:scale-95 text-primary" href="#" target="_self">
                        <BsLightning type="person" />
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}