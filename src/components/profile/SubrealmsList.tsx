"use client"
import { useEffect, useState } from "react"
import getSubrealmsFromOnChain from "@/lib/get-subrealms-from-onchain";
import { useRouter } from "next/navigation";

export default function SubrealmsList({ tlrAtomicalId, fullRealmName }: { tlrAtomicalId: string, fullRealmName: string }) {

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [subrealms, setSubrealms] = useState<any[]>([])

  useEffect(() => {

    const fetch = async (atomicalId: string) => {
      setSubrealms([])
      setLoading(true)
      const result = await getSubrealmsFromOnChain(atomicalId)
      setSubrealms(result)
      setLoading(false)
    }

    fetch(tlrAtomicalId)

  }, [tlrAtomicalId])

  return (
    <div className="mb-20 break-words">
      <ul className="space-y-2">
        {
          loading ? (
            <>Loading subrealms...</>
          ) : (!subrealms || subrealms.length === 0) ? (
            <>No Subrealms...</>
          ) : (
            <></>
          )
        }
        {subrealms && subrealms.map((elem: any, index: number) => (
          <li 
            onClick={() => {
              router.push(`/${fullRealmName}.${elem.subrealm}`)
            }} 
            key={index} 
            className="p-2 rounded shadow-sm hover:bg-card cursor-pointer">
            +{fullRealmName}.{elem.subrealm}
          </li>
        ))}
      </ul>
    </div>
  )
}