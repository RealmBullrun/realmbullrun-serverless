import RecentCarousel from "@/components/common/RecentCarousel";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {

  return (
    <>
      <title>+RealmBullrun</title>
      <meta property="og:title" content="RealmBullrun" />
      <meta property="og:type" content="website" />
      <meta property="og:description" content="The premier exclusive atomicals club 🐮⚛️ 10K Bull-runners making BTC great again." />
      <meta property="og:url" content={`https://realmbullrun.com`} />
      <meta property="og:image" content={`https://raw.githubusercontent.com/realmbullrun/bull-images/main/0.png`} />
      <meta property="og:site_name" content="RealmBullrun.com" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="RealmBullrun" />
      <meta name="twitter:description" content="The premier exclusive atomicals club 🐮⚛️ 10K Bull-runners making BTC great again." />
      <meta name="twitter:image" content={`https://raw.githubusercontent.com/realmbullrun/bull-images/main/0.png`} />
      <meta name="twitter:creator" content="@realmbullrun" />

      <div className=" flex items-start flex-col w-full -mt-8  relative" style={{ height: '144px', overflow: 'hidden' }}>
        <Image
          alt=""
          src="/Banner.gif"
          width={1800}
          height={500}
          className="absolute left-0 top-0 z-0 dark:brightness-50"
        />
      </div>
      <div className="p-12 -mt-4 pt-0 flex items-start flex-col w-full max-w-screen-2xl mx-auto">

        <h1 className="z-10 -mt-8 scroll-m-20 border-b pb-2 text-white drop-shadow-lg text-shadow-lg text-4xl font-black tracking-tight transition-colors">
          Digital ID powered by Bitcoin.
        </h1>
        <p className="z-10 leading-7 [&:not(:first-child)]:mt-6">
          Realm names are self-owned and self-managed directly on the Bitcoin blockchain using the Atomicals Digital Object format — which basically means that there is no middle man or centralized registrar. Once you claim a name, it&apos;s yours forever or until you transfer it to someone else.
        </p>
        <blockquote className="z-10 text-2xl text-purple-400 transition-all hover:text-purple-300 mt-6 border-l-2 pl-6 italic">
          The internet-on-bitcoin is not a meme and will be televised.
        </blockquote>

        <p className="z-10 py-4 leading-7 [&:not(:first-child)]:mt-6">
          The Atomicals Bullrun isn&apos;t just a moment; it&apos;s a gateway to explore the groundbreaking technology offered by the Realm Name Service (RNS).
        </p>


        {/* HERE WE NEED EXPLORER LIKE */}
        <div className="my-4 ">
          <p className="text-[24px]">
            Latest Profiles
          </p>
        </div>
        <RecentCarousel />
        <div className=" flex justify-center items-center gap-4 w-full">
          {/* <Input placeholder="search a realm" className="w-6/12 my-4 py-8" />
          <Button variant={"outline"} className="w-6/12 p-8 text-lg">SEARCH</Button> */}
        </div>

        <p className="z-10 leading-7 [&:not(:first-child)]:mt-6">
          Here&apos;s what makes the Bullrun special:
        </p>
        <ul className="z-10 my-6 ml-6 list-disc [&>li]:mt-2">
          <li className={"transition-all hover:scale-95"}>10,000 Subrealms</li>
          <li className={"transition-all hover:scale-95"}>10,000 NFTs</li>
          <li className={"transition-all hover:scale-95"}>1 Open Source RNS Website</li>
        </ul>

        <div className="flex flex-col lg:flex-row w-full gap-4 py-8">
          <Link
            className="w-full"
            href="/mint-subrealm"
          >
            <div className="relative w-full h-64 group p-8 bg-card border-3 rounded-lg">
              <div className="absolute inset-0 w-full h-full rounded-lg hover:scale-95 transition-all ">
                <Image
                  src="/homeBgRealm.png"
                  width={1440}
                  height={594}
                  alt="Banner"
                  className={`object-cover w-full h-full transition-opacity duration-500 p-4 rounded-lg hover:brightness-95`}
                />
              </div>
              <p
                className="absolute bottom-4 right-4 text-white px-6 py-3 text-lg font-bold z-10 "
              >
                REALMs
              </p>

            </div>
          </Link>
          <Link
            className="w-full"
            href="/collection"
          >
            <div className="relative w-full h-64  group p-8 bg-card border-3 rounded-lg">
              <div className="absolute inset-0 w-full h-full rounded-lg hover:scale-95 transition-all">
                <Image
                  src="/homeBgNFT.png"
                  width={1440}
                  height={594}
                  alt="Banner"
                  className={`object-cover w-full h-full transition-opacity duration-500 p-4 rounded-lg hover:brightness-95`}
                />
              </div>
              <p
                className="absolute bottom-4 right-4 text-white px-6 py-3 text-lg font-bold  z-10 "
              >
                NFTs
              </p>
            </div>
          </Link>
        </div>

        <p className="z-10 leading-7 [&:not(:first-child)]:mt-6">
          Showcase your digital identity and art collections to a global audience.
          Take it a step further
          by creating subrealms within your realm—tailored for friends, family, or business ventures.
        </p>

        <div className="mx-auto max-w-screen-xl py-8">
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-12 md:space-y-0">
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg className="w-8 h-8 text-primary-600 lg:w-8 lg:h-8 dark:text-primary-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Marketing</h3>
              <p className="text-gray-500 dark:text-gray-400">Showcase digital identity and art collections worldwide.
                Promote sovereignty and control over digital presence, enhancing brand trust.</p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg className="w-8 h-8 text-primary-600 lg:w-8 lg:h-8 dark:text-primary-300" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M6 4.5C5.17157 4.5 4.5 5.17157 4.5 6C4.5 6.82843 5.17157 7.5 6 7.5C6.82843 7.5 7.5 6.82843 7.5 6C7.5 5.17157 6.82843 4.5 6 4.5ZM3.5 6C3.5 4.61929 4.61929 3.5 6 3.5C7.38071 3.5 8.5 4.61929 8.5 6C8.5 7.38071 7.38071 8.5 6 8.5C4.61929 8.5 3.5 7.38071 3.5 6Z" fill="currentColor"></path> <path fillRule="evenodd" clipRule="evenodd" d="M18 16.5C17.1716 16.5 16.5 17.1716 16.5 18C16.5 18.8284 17.1716 19.5 18 19.5C18.8284 19.5 19.5 18.8284 19.5 18C19.5 17.1716 18.8284 16.5 18 16.5ZM15.5 18C15.5 16.6193 16.6193 15.5 18 15.5C19.3807 15.5 20.5 16.6193 20.5 18C20.5 19.3807 19.3807 20.5 18 20.5C16.6193 20.5 15.5 19.3807 15.5 18Z" fill="currentColor"></path> <path fillRule="evenodd" clipRule="evenodd" d="M15.55 5.5C15.7816 4.35888 16.7905 3.5 18 3.5C19.3807 3.5 20.5 4.61929 20.5 6C20.5 7.38071 19.3807 8.5 18 8.5C16.7905 8.5 15.7816 7.64112 15.55 6.5H12.5V18C12.5 18.2761 12.2761 18.5 12 18.5H8.44999C8.21836 19.6411 7.20948 20.5 6 20.5C4.61929 20.5 3.5 19.3807 3.5 18C3.5 16.6193 4.61929 15.5 6 15.5C7.20948 15.5 8.21836 16.3589 8.44999 17.5H11.5V6C11.5 5.72386 11.7239 5.5 12 5.5H15.55ZM18 4.5C17.1716 4.5 16.5 5.17157 16.5 6C16.5 6.82843 17.1716 7.5 18 7.5C18.8284 7.5 19.5 6.82843 19.5 6C19.5 5.17157 18.8284 4.5 18 4.5ZM6 16.5C5.17157 16.5 4.5 17.1716 4.5 18C4.5 18.8284 5.17157 19.5 6 19.5C6.82843 19.5 7.5 18.8284 7.5 18C7.5 17.1716 6.82843 16.5 6 16.5Z" fill="currentColor"></path> </g></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Decentralization</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Self-owned and self-managed realm names with no middleman. Permanent and transferable name ownership.</p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><g id="Card"> <path className="cls-1" d="M3,22H6a1,1,0,0,0,1-1V12a1,1,0,0,0-1-1H3a1,1,0,0,0-1,1v9A1,1,0,0,0,3,22Zm1-9H5v7H4Z"></path> <path className="cls-1" d="M17,22h3a1,1,0,0,0,1-1V3a1,1,0,0,0-1-1H17a1,1,0,0,0-1,1V21A1,1,0,0,0,17,22ZM18,4h1V20H18Z"></path> <path className="cls-1" d="M10,5A1,1,0,0,0,9,6V21a1,1,0,0,0,1,1h3a1,1,0,0,0,1-1V6a1,1,0,0,0-1-1Zm2,15H11V7h1Z"></path> </g> </g></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Business Automation</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Automate subrealm creation and management, enable automated payments in satoshis or ARC20 tokens, based on advanced criteria.
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg className="w-8 h-8 text-primary-600 lg:w-8 lg:h-8 dark:text-primary-300" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g data-name="28. Saving" id="_28._Saving"> <path d="M31.47,17.11a5,5,0,0,0-6.53.87l-3.2,3.65A4,4,0,0,0,18,19h-.93a2.54,2.54,0,0,1-1.41-.43A9.38,9.38,0,0,0,3.84,19.74L.29,23.29a1,1,0,0,0,1.42,1.42l3.55-3.55a7.35,7.35,0,0,1,9.29-.92,4.52,4.52,0,0,0,2.52.76H18a2,2,0,0,1,2,2H13a1,1,0,0,0,0,2h8a1,1,0,0,0,.74-.35h0l4.69-5.36a3,3,0,0,1,3-.92L22.4,27.8A3,3,0,0,1,20,29H11.41a4.4,4.4,0,0,0-3.12,1.29,1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0,2.37,2.37,0,0,1,1.7-.71H20a5,5,0,0,0,4-2l7.8-10.4a1.1,1.1,0,0,0,.15-.8A1.16,1.16,0,0,0,31.47,17.11Z"></path> <path d="M20,16a8,8,0,1,0-8-8A8,8,0,0,0,20,16ZM20,2a6,6,0,1,1-6,6A6,6,0,0,1,20,2Z"></path> <path d="M19.29,11.54a1,1,0,0,0,1.42,0l2.83-2.83a1,1,0,0,0,0-1.42L20.71,4.46a1,1,0,0,0-1.42,0L16.46,7.29a1,1,0,0,0,0,1.42ZM20,6.59,21.41,8,20,9.41,18.59,8Z"></path> <path d="M5,5H6V6A1,1,0,0,0,8,6V5H9A1,1,0,0,0,9,3H8V2A1,1,0,0,0,6,2V3H5A1,1,0,0,0,5,5Z"></path> </g> </g></svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">Finance</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Transparent and verifiable transactions for regulatory adherence. Names and subrealms as digital assets with potential for appreciation.
              </p>
            </div>

          </div>
        </div>


        <h3 className="z-10 mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
          The next generation of sovereignty.
        </h3>
        <p className="z-10 leading-7 [&:not(:first-child)]:mt-6">
          Every bullrun.subrealm on #Bitcoin holds the superpower to mint any number of names.
          Configure rules based on advanced pattern matching,
          bitwork mining, and even enable payments in satoshis or ARC20 tokens.
          Your digital passport on the Bullrun is not just a record;
          it&apos;s a testament to the potential of decentralized, blockchain-powered identity.
        </p>

        <div className="z-10 my-6 w-full overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="m-0 border-t p-0 bg-muted">
                <th className="  border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right ">
                </th>
                <th className="  border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right ">
                  RNS
                </th>
                <th className="  border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right ">
                  DNS
                </th>
                <th className="  border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right ">
                  ENS
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="m-0 border-t p-0 ">
                <td className=" border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right ">
                  Registration authority
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-emerald-400">
                  Nobody
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-red-400">
                  ICANN DNS Authority
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-red-400">
                  ENS Contracts Devs
                </td>
              </tr>
              <tr className="m-0 border-t p-0">
                <td className=" border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  Renewals
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right hover:bg-emerald-400">
                  Permanently owned
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-red-400">
                  Yearly renewal + fee
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-red-400">
                  Yearly renewal + fee
                </td>
              </tr>
              <tr className="m-0 border-t p-0 ">
                <td className=" border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right ">
                  Blockchain
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right hover:bg-emerald-400">
                  Bitcoin
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-red-400">
                  N/A
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-red-400">
                  Ethereum
                </td>
              </tr>
              <tr className="m-0 border-t p-0 ">
                <td className=" border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right ">
                  Name identification
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right hover:bg-emerald-400">
                  Start with &quot;+&quot;
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-red-400">
                  End suffix ie: .com
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-red-400">
                  End suffix .eth
                </td>
              </tr>
              <tr className="m-0 border-t p-0 ">
                <td className=" border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                  Name direction
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right hover:bg-emerald-400">
                  +name.subname
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-red-400">
                  subname.com
                </td>
                <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right transition-all hover:bg-red-400">
                  subname.eth
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
