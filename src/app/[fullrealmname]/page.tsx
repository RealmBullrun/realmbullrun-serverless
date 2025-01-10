import getProfileDataFromBackend from "@/lib/get-profile-data-from-backend"

import { Donates } from "@/components/profile/Donates";
import { Links } from "@/components/profile/Links";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collections } from "@/components/profile/Collections";
import { ImageFromUri } from "@/components/profile/ImageFromUri";
import ShareOnTwitterButton from "@/components/common/ShareOnTwitterButton";
import { CopyToClipboardButton } from "@/components/common/CopyToClipboardButton";
import SubrealmsList from "@/components/profile/SubrealmsList";
import PunyCode from "@/components/common/PunyCode";

async function getProfileData(fullrealmname: string) {
  let result: any = { fullrealmname }
  const network = "bitcoin"
  const profileData = await getProfileDataFromBackend(`${fullrealmname}`, network)
  if (profileData.result === "success") {
    const { name, desc, pfpUri, socials, wallets, subrealm, collections, atomicalId } = profileData.data
    result = {
      ...result,
      atomicalId,
      profileName: name,
      description: desc,
      pfpUri,
      linksObject: socials,
      walletsObject: wallets,
      collectionsObject: collections
    }
  }

  return result
}

export default async function Page({ params }: { params: any }) {
  const { fullrealmname = "not-found" } = params
  const { atomicalId, profileName, description, pfpUri, linksObject, walletsObject, collectionsObject, profileOwnerAtomicals } = await getProfileData(fullrealmname)

  if (!profileName || profileName === "---")
    return (
      <>
        <div className="flex-col md:flex">
          <div className="flex-1 space-y-4 p-8 pt-0">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList>
                <TabsTrigger value="overview">Profile</TabsTrigger>
                <TabsTrigger value="subrealms">
                  Subrealms
                </TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="">
                <div className="bg-secondary h-40 -mx-[31px] flex flex-col items-start justify-center p-2">
                  <div className="mt-6 mx-auto">
                    +{fullrealmname}
                  </div>
                  <PunyCode value={fullrealmname} additionalClassName="mt-2 mx-auto" />
                  <div className="mt-2 mx-auto">
                    No Profile Found
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="subrealms" className="space-y-4 border-2 p-4 bg-[rgba(117,141,179,0.31)]">
                <SubrealmsList tlrAtomicalId={atomicalId} fullRealmName={fullrealmname} />
              </TabsContent>

            </Tabs>
          </div>
        </div>
      </>
    )

  return (
    <>
      <title>{profileName}</title>
      <meta property="og:title" content={profileName} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={`https://realmbullrun.com/${fullrealmname}`} />
      <meta property="og:image" content={`https://api.realmbullrun.com/api/image?uri=${pfpUri}`} />
      <meta property="og:site_name" content="RealmBullrun.com" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={profileName} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://api.realmbullrun.com/api/image?uri=${pfpUri}`} />
      <meta name="twitter:creator" content="@realmbullrun" />

      <div className="flex-col md:flex max-w-screen-2xl mx-auto">
        <div className="flex-1 space-y-4 p-8 pt-0">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Profile</TabsTrigger>
              <TabsTrigger value="subrealms">
                Subrealms
              </TabsTrigger>
              <TabsTrigger value="bitwork" disabled>
                Bitwork Lab
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="">
              <div className="bg-secondary h-40 -mx-[31px] flex items-start justify-end p-2">
                <div className="flex flex-row-reverse gap-2">
                  <CopyToClipboardButton content={`https://realmbullrun.com/${fullrealmname}`} />
                  <ShareOnTwitterButton
                    url={`https://realmbullrun.com/${fullrealmname}`}
                    text={`${profileName}\n+${fullrealmname}\n${description}\n\n`}
                    via="realmbullrun"
                    hashtags="Atomicals,Realmname,Bullrun,SocialFi,OnChainProfile"
                  />
                </div>
              </div>
              <div className="">
                <CardContent className="p-4 mt-[-8rem]">
                  {
                    !pfpUri ? (
                      <Skeleton className="h-[144px] w-[144px]" />
                    ) : (
                      <ImageFromUri additionalClass=" rounded-full border-[6px] border-background" uri={pfpUri} />
                    )
                  }
                </CardContent>
                <CardContent className="">
                  {
                    !profileName ? (
                      <Skeleton className="h-8 w-32" />
                    ) : (
                      <h1 className="text-5xl font-bold break-words">{profileName}</h1>
                    )
                  }

                  <h2 className="text-secondary text-2xl tracking-tight break-words">
                    {`+${params.fullrealmname}`}
                  </h2>
                </CardContent>

                {
                  description && (
                    <Card className="pt-6">
                      <CardContent>
                        <div>{description}</div>
                      </CardContent>
                    </Card>
                  )
                }
              </div>

              <CardContent className="flex justify-center pt-6">
                <Links linksObject={linksObject} />
              </CardContent>

              <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-8">
                {
                  (collectionsObject && Object.keys(collectionsObject).length > 0) ? (
                    <div className="pb-6 w-full">

                      <Card className="bg-bg border-0">
                        <CardHeader>
                          <CardTitle>Containers</CardTitle>
                          <p className="text-xs text-muted-foreground">
                            {`${Object.keys(collectionsObject).length} ${Object.keys(collectionsObject).length === 1 ? 'collection' : 'collections'} to discover`}
                          </p>
                        </CardHeader>
                        <CardContent className="">
                          <Collections collectionsObject={collectionsObject} />
                        </CardContent>
                      </Card>
                    </div>

                  ) : (
                    <>
                    </>
                  )
                }

                {(walletsObject && Object.keys(walletsObject).length > 0) && (
                  <Card className="w-full mb-6">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="flex flex-col">
                        <CardTitle className="text-sm font-medium">Wallets</CardTitle>
                        <p className="text-xs text-muted-foreground">
                          select an address to send cryptos
                        </p>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                    </CardHeader>
                    <CardContent>
                      <Donates fullrealmname={params.fullrealmname} donates={walletsObject} />
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="bitwork" className="space-y-4 border-2 p-4 bg-[rgba(117,141,179,0.31)]">
              {
                profileOwnerAtomicals && profileOwnerAtomicals.map((elem: any) => (
                  <div key={elem.atomical_id} className="mb-20 break-words">
                    <div>
                      type: {elem.type}
                    </div>
                    <div>
                      subtype: {elem.subtype}
                    </div>
                    <div>
                      bitworkc: {elem.data?.$bitwork?.bitworkc}
                    </div>
                  </div>
                ))
              }
            </TabsContent>

            <TabsContent value="subrealms" className="space-y-4 border-2 p-4 bg-[rgba(117,141,179,0.31)]">
              <SubrealmsList tlrAtomicalId={atomicalId} fullRealmName={fullrealmname} />
            </TabsContent>

          </Tabs>
        </div>
      </div>

    </>
  )
}