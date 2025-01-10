import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import getRealmNamesFromOnChainByFilter from "@/lib/get-realmnames-from-onchain-by-filter";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "./icons/Spinner";
import { SearchIcon } from "./icons/SearchIcon";
import PunyCode from "./common/PunyCode";

export default function SearchBox() {

  const router = useRouter()
  const [searchValue, setSearchValue] = useState("")
  const [list, setList] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [dropdownVisible, setDropdownVisible] = useState(false)

  useEffect(() => {
    if (searchValue === "") {
      setDropdownVisible(false)
      setList([])
      return
    }

    const handler = setTimeout(async () => {
      setLoading(true)
      let filter = searchValue
      if (filter.startsWith("+"))
        filter = filter.substring(1)
      filter = filter.trim()

      if (!filter) {
        setLoading(false)
        return
      }

      const result = await getRealmNamesFromOnChainByFilter(filter)
      setList(result)
      setLoading(false)
      setDropdownVisible(true)
    }, 700)

    return () => clearTimeout(handler)
  }, [searchValue])

  return (
    <div className="flex flex-col">
      <Input 
        disabled={loading} 
        className="lg:w-80 w-28 pl-8"
        placeholder="Search Realm Names..." 
        value={`${searchValue}${loading ? '...' : ''}`} 
        onChange={(event: any) => setSearchValue(event.target.value)} 
      />
      <SearchIcon className={`${loading ? "hidden" : ""} top-[22px] ml-2 z-50 absolute`} />
      <LoadingSpinner className={`${loading ? "" : "hidden"} top-[20px] ml-2 z-50 absolute`} />
      <DropdownMenu open={dropdownVisible} onOpenChange={() => setDropdownVisible(false)}>
        <DropdownMenuTrigger></DropdownMenuTrigger>
        <DropdownMenuContent className="lg:w-80 w-28">
          <DropdownMenuLabel>Top Level Realms</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {
            ( !list || list.length === 0 ) ? (
              <DropdownMenuItem>No realms found...</DropdownMenuItem>
            ) : ( <></> )
          }
          {
            list && list.map((elem: any, index: any) => (
              <DropdownMenuItem 
                key={index}
                className="cursor-pointer" 
                onSelect={() => {
                  setSearchValue("")
                  setDropdownVisible(false)
                  router.push(`/${elem.realm}`) 
                }}>
                  +{elem.realm} 
                  <PunyCode value={elem.realm} prefix=" / " />
                </DropdownMenuItem>
            ))
          }
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}