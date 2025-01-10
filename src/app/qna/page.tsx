"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";

export default function QnA() {

  return (
    <section className="max-w-screen-2xl mx-auto">
      <div className="max-w-screen-2xl mx-auto p-4 md:p-12">
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
          <p className="text-muted-foreground max-w-[700px]">
            Find answers to common questions about minting your NFT. If you have any other questions, feel free to reach
            out to our support team.
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-col gap-4">
            <h1 className="text-3xl mb-2 font-extrabold">HOW TO MINT - Subrealms</h1>
            <div className="prose prose-lg ">
              <p className="my-4">
                A decentralized mint on Bitcoin always takes place in 2 steps:
                <span className="font-bold "> CLAIM & VALIDATION</span>.
              </p>
              <p>
                <span>Mine in a fully decentralized way using our function </span>{" "}
                <Link href="realmbullrun.com/mint-subrealm" className="font-medium text-primary hover:underline" prefetch={false}>
                  mint-subrealm
                </Link>
                .
              </p>
              <p className="font-bold">
                <span>For an optimal experience, we strongly recommend using </span>{" "}
                <Link href="https://wizzwallet.io/" className="font-bold text-orange-400 hover:underline" prefetch={false}>
                  Wizz Wallet
                </Link>
                .</p>
            </div>

            <div className="flex flex-wrap p-2 border-background border-2 rounded-md ">
              <h2 className="font-bold mb-4 text-center md:text-start underline  w-full">Prerequisites</h2>

              <div className="container mx-auto px-4  md:flex md:gap-8">
                <div className="border-l-8 rounded-lg border-orange-400 bg-background p-4 md:w-1/2 h-fit mb-2 hover:dark:brightness-105  hover:brightness-95">
                  <div className="flex">
                    <div className="">
                      <p className="text-sm md:text-lg">
                        0.0005 BTC + fees
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-l-8 rounded-lg border-primary bg-background p-4 md:w-1/2 h-fit mb-2  hover:dark:brightness-105  hover:brightness-95">
                  <div className="flex">
                    <div className="">
                      <p className="text-sm md:text-lg">
                        Atomicals compatible wallet
                      </p>
                    </div>
                  </div>
                </div>


              </div>

              <div className="border-l-8 rounded-lg border-green-400 bg-background md:my-4 mx-4 p-4 w-full h-fit hover:dark:brightness-105  hover:brightness-95">
                <div className="flex">
                  <div className="">
                    <p className="text-sm md:text-lg">
                      Before claiming a subrealm: go to{" "}
                      <Link href="/explore" className="font-medium text-green-400 hover:underline" prefetch={false}>
                        Explore
                      </Link>{" "}
                      page to check its availability.
                    </p>
                  </div>
                </div>
              </div>



            </div>

          </CardHeader>
          <CardContent className="p-2 bg-background">

            <Tabs defaultValue="wizzwallet" className="w-full">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="wizzwallet">Wizz Wallet</TabsTrigger>
                <TabsTrigger value="decentralised">Decentralised</TabsTrigger>
              </TabsList>

              <TabsContent value="wizzwallet">
                <div className="space-y-6 p-4 md:p-8 flex flex-col">
                  <div>
                    <h2 className="text-2xl mb-4 font-bold">WIZZ WALLET EXTENSION (recommended)</h2>

                    <div className="mt-4 flex flex-col space-y-4 gap-4">
                      <Image
                        src="/mint-tuto/10.png"
                        width={1440}
                        height={594}
                        alt="Connect wallet on wizzwallet"
                        className="rounded-lg w-full"
                      />


                      <h1 className="text-3xl mb-2 font-extrabold">THE CLAIM</h1>

                      <div className="border-l-8 rounded-lg border-orange-400 bg-background md:my-4 mx-4 p-4 w-full h-fit hover:dark:brightness-105 hover:brightness-95">
                        <div className="flex">
                          <div className="">
                            <p className="text-sm md:text-lg">
                              <span className="font-bold">1</span>.
                              Open the   {' '}<Link href="https://wizzwallet.io/" className="font-bold text-orange-400 hover:underline" prefetch={false}>
                                Wizz Wallet
                              </Link>  {' '}extension and go to the Realm section.
                            </p>
                            <p className="text-sm md:text-lg">
                              <span className="font-bold">2</span>.
                              Select {`"`}bullrun{`"`} as the Realm and enter your {`"`}bullrun.0000{`"`} in the subrealm field.
                            </p>
                            <p className="text-sm md:text-lg">
                              <span className="font-bold">3</span>.
                              Sign the transaction to claim the subrealm.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 text-sm md:text-base  gap-4 flex flex-wrap justify-center">
                        <Image
                          src="/mint-tuto/11.png"
                          width={1440}
                          height={594}
                          alt="Connect wallet on wizzwallet"
                          className="rounded-lg w-[80%]"
                        />
                      </div>


                      <div className="border-l-8 rounded-lg border-purple-400 bg-background md:my-4 mx-4 p-4 w-full h-fit hover:dark:brightness-105 hover:brightness-95">
                        <div className="flex">
                          <div className="">
                            <p className="text-sm md:text-lg">
                              Wait 1 block for the confirmation of your {" "}
                              <Link href="mempool.space" className="font-medium text-purple-400 hover:underline" prefetch={false}>
                                transaction.
                              </Link>{" "}
                            </p>
                            <p className="text-sm md:text-lg">
                              The subrealm and a payment notification will appear in your {' '}<Link href="https://wizzwallet.io/" className="font-bold text-orange-400 hover:underline" prefetch={false}>
                                Wizz Wallet
                              </Link>  {' '}.
                            </p>
                          </div>
                        </div>
                      </div>


                      <div>
                        <div className="mt-2 text-sm md:text-base  gap-4 flex flex-wrap justify-center">
                          <Image
                            src="/mint-tuto/12.png"
                            width={1440}
                            height={594}
                            alt="Connect wallet on wizzwallet"
                            className="rounded-lg w-[80%]"
                          />
                        </div>
                      </div>
                      <div className="border-l-8 rounded-lg border-green-400 bg-background md:my-4 mx-4 p-4 w-full h-fit hover:dark:brightness-105  hover:brightness-95">
                        <div className="flex">
                          <div className="">
                            <p className="text-sm md:text-lg">
                              You have successfully CLAIMED your subrealm.
                            </p>
                            <p className="text-sm md:text-lg">
                              Now, pay to VERIFY and make it valid.
                            </p>
                          </div>
                        </div>
                      </div>
                      <h1 className="text-3xl mb-2 font-extrabold">THE VALIDATION</h1>

                      <div className="border-l-8 rounded-lg border-orange-400 bg-background md:my-4 mx-4 p-4 w-full h-fit hover:dark:brightness-105 hover:brightness-95">
                        <div className="flex">
                          <div className="">
                            <p className="text-sm md:text-lg">
                              Click on the payment notification.
                            </p>
                            <p className="text-sm md:text-lg">
                              Select the item to pay and sign the transaction.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 text-sm md:text-base  gap-4 flex flex-wrap justify-center">

                        <Image
                          src="/mint-tuto/13.png"
                          width={1440}
                          height={594}
                          alt="Connect wallet on wizzwallet"
                          className="rounded-lg w-[80%]"
                        />
                      </div>

                      <div className="border-l-8 rounded-lg border-purple-400 bg-background md:my-4 mx-4 p-4 w-full h-fit hover:dark:brightness-105 hover:brightness-95">
                        <div className="flex">
                          <div className="">
                            <p className="text-sm md:text-lg">
                              Wait 1 block for the confirmation of your {" "}
                              <Link href="https://mempool.space" className="font-medium text-purple-400 hover:underline" prefetch={false}>
                                transaction.
                              </Link>{" "}.
                            </p>
                            <p className="text-sm md:text-lg">
                              Wait 3 blocks for the confirmation of your candidate.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="mt-2 text-sm md:text-base  gap-4 flex flex-wrap justify-center">
                          <Image
                            src="/mint-tuto/14.png"
                            width={1440}
                            height={594}
                            alt="Connect wallet on wizzwallet"
                            className="rounded-lg w-[80%]"
                          />
                        </div>
                      </div>

                      <div className="border-l-8 rounded-lg border-blue-400 bg-background md:my-4 mx-4 p-4 w-full h-fit hover:dark:brightness-105 hover:brightness-95">
                        <div className="flex">
                          <div className="">
                            <p className="text-sm md:text-lg">
                              Track the status of your mint directly in the
                              {" "}
                              <Link href="https://wizzwallet.io/" className="font-bold text-orange-400 hover:underline" prefetch={false}>
                                Wizzwallet extension
                              </Link>{" "}or on
                              {" "}
                              <Link href="https://wizz.cash/live-mint" className="font-medium text-orange-400 hover:underline" prefetch={false}>
                                wizz.cash/live-mint
                              </Link>{" "}.

                            </p>
                            <p className="text-sm md:text-lg">
                              Once it changes from
                              {" "}
                              <span className="font-medium text-orange-400 hover:font-bold">orange</span>
                              {" "}to{" "}
                              <span className="font-medium text-green-400 hover:font-bold">green</span>

                              , your item becomes valid.


                            </p>
                          </div>
                        </div>
                      </div>


                      <div className="mt-2 text-sm md:text-base  gap-4 flex flex-wrap justify-center">

                        <Image
                          src="/mint-tuto/15.png"
                          width={1440}
                          height={594}
                          alt="Connect wallet on wizzwallet"
                          className="rounded-lg w-[80%]"
                        />
                      </div>

                      <div className="border-l-8 rounded-lg border-green-400 bg-background md:my-4 mx-4 p-4 w-full h-fit hover:dark:brightness-105 hover:brightness-95">
                        <div className="flex">
                          <div className="">
                            <p className="text-sm md:text-lg">
                              You have successfully verified your Subrealm.
                            </p>
                            <p className="text-sm md:text-lg">
                              You are now the proud owner of a club membership card, and much more.
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </TabsContent>



              <TabsContent value="decentralised">
                <div className="space-y-6 p-4 md:p-8 flex flex-col">
                  <div>
                    <h2 className="text-2xl mb-4 font-bold">Decentralized Mint (all devices)</h2>

                    <div className="mt-4 flex flex-col space-y-4 gap-4">
                      <Image
                        src="/mint-tuto/6.png"
                        width={1440}
                        height={594}
                        alt="Connect wallet on wizzwallet"
                        className="rounded-lg w-full"
                      />


                      <h1 className="text-3xl mb-2 font-extrabold">THE CLAIM</h1>

                      <div className="border-l-8 rounded-lg border-orange-400 bg-background md:my-4 mx-4 p-4 w-full h-fit hover:dark:brightness-105 hover:brightness-95">
                        <div className="flex">
                          <div className="">
                            <p className="text-sm md:text-lg">
                              Go to the {" "}
                              <Link href="/mint-subrealm" className="font-bold text-primary hover:underline" prefetch={false}>
                                Mint Subrealm
                              </Link>{" "} page.

                            </p>
                            <p className="text-sm md:text-lg">
                              Select the {`"`}bullrun.0000{`"`} of your choice and enter the desired <span className="text-orange-400 font-bold">receiving address</span>.
                            </p>
                            <p className="text-sm md:text-lg">
                              Click on <span className="text-primary font-bold">MINT</span> to start the process.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="border-l-8 rounded-lg border-yellow-400 bg-background md:my-4 mx-4 p-4 w-full h-fit hover:dark:brightness-105 hover:brightness-95">
                        <div className="flex">
                          <div className="">
                            <p className="text-sm md:text-lg">
                              When the QR code appears, follow the on-screen instructions.
                            </p>
                            <p className="text-sm md:text-lg">
                              Send <span className="text-yellow-400">0.0000XXX BTC</span> to the <span className="text-primary">indicated address</span> {`"`}bc1...{`"`}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="border-l-8 rounded-lg border-slate-400 bg-background md:my-4 mx-4 p-4 w-full h-fit hover:dark:brightness-105 hover:brightness-95">
                        <div className="flex">
                          <div className="">
                            <p className="text-sm md:text-lg">
                              Once your transaction is broadcast, it will be recognized and processed accordingly.
                            </p>
                            <p className="text-sm md:text-lg">
                              Wait without closing or refreshing the mint page until your BTC is received at the generated address.
                            </p>
                          </div>
                        </div>
                      </div>



                      <p className="text-sm md:text-lg w-full text-center text-red-400">
                        Once the process begins, DO NOT refresh or leave the page. This will interrupt the mint.
                      </p>

                      <div className="mt-2 text-sm md:text-base  gap-4 flex flex-wrap justify-center">
                        <Image
                          src="/mint-tuto/7.png"
                          width={1440}
                          height={594}
                          alt="Connect wallet on wizzwallet"
                          className="rounded-lg w-[80%]"
                        />
                      </div>

                      <Accordion type="single" collapsible className="w-full px-8">
                        <AccordionItem value="item-1" className=" -mt-8">
                          <AccordionTrigger>What is happening?</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-sm md:text-lg">
                              A derivated address is <span className="font-bold">generated</span> to mine and send the realm to the <span className="font-bold">receiving address</span>.

                            </p>
                            <p className="text-sm md:text-lg">
                              This allows a fully decentralized mint, where the user <span className="font-bold">never connects their wallet to a third party</span>.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      <div className="border-l-8 rounded-lg border-purple-400 bg-background md:my-4 mx-4 p-4 w-full h-fit hover:dark:brightness-105 hover:brightness-95">
                        <div className="flex">
                          <div className="">
                            <p className="text-sm md:text-lg">
                              Wait 1 block for the confirmation of your transaction. Track its status on {" "}
                              <Link href="https://mempool.space" className="font-medium text-purple-400 hover:underline" prefetch={false}>
                                mempool.space
                              </Link>.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="border-l-8 rounded-lg border-green-400 bg-background md:my-4 mx-4 p-4 w-full h-fit hover:dark:brightness-105 hover:brightness-95">
                        <div className="flex">
                          <div className="">
                            <p className="text-sm md:text-lg">
                              You have successfully CLAIMED your subrealm.
                            </p>
                            <p className="text-sm md:text-lg">
                              Now, you need to VERIFY it to make it valid.
                            </p>
                          </div>
                        </div>
                      </div>



                      <h1 className="text-3xl mb-2 font-extrabold">THE VALIDATION</h1>

                      <div className="border-l-8 rounded-lg border-primary bg-background md:my-4 mx-4 p-4 w-full h-fit hover:dark:brightness-105  hover:brightness-95">
                        <div className="flex">
                          <div className="">
                            <p className="text-sm md:text-lg">
                              To do this, click on PENDING on the {" "}
                              <Link href="/mint-sburealm" className="font-medium text-primary hover:underline" prefetch={false}>
                                Mint Subrealm
                              </Link>{" "}
                              page, specifying your address.
                            </p>
                            <p className="text-sm md:text-lg">
                              Select the item to pay.
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="mt-2 text-sm md:text-base  gap-4 flex flex-wrap justify-center">
                          <Image
                            src="/mint-tuto/8.png"
                            width={1440}
                            height={594}
                            alt="Connect wallet on wizzwallet"
                            className="rounded-lg w-[80%]"
                          />
                        </div>
                      </div>


                      <div className="border-l-8 rounded-lg border-yellow-400 bg-background md:my-4 mx-4 p-4 w-full h-fit hover:dark:brightness-105 hover:brightness-95">
                        <div className="flex">
                          <div className="">
                            <p className="text-sm md:text-lg">
                              When the QR code appears, follow the on-screen instructions.
                            </p>
                            <p className="text-sm md:text-lg">
                              Send <span className="text-yellow-400">0.0000XXX BTC</span> to the <span className="text-primary">indicated address</span> {`"`}bc1...{`"`}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="border-l-8 rounded-lg border-purple-400 bg-background md:my-4 mx-4 p-4 w-full h-fit hover:dark:brightness-105 hover:brightness-95">
                        <div className="flex">
                          <div className="">
                            <p className="text-sm md:text-lg">
                              Wait 1 block for the confirmation of your {" "}
                              <Link href="https://mempool.space" className="font-medium text-purple-400 hover:underline" prefetch={false}>
                                transaction
                              </Link>.
                            </p>
                            <p className="text-sm md:text-lg">
                              Wait 3 blocks for the confirmation of your candidate.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-sm md:text-base  gap-4 flex flex-wrap justify-center">
                        <Image
                          src="/mint-tuto/9.png"
                          width={1440}
                          height={594}
                          alt="Connect wallet on wizzwallet"
                          className="rounded-lg w-[80%]"
                        />
                      </div>

                      <Accordion type="single" collapsible className="w-full px-8">
                        <AccordionItem value="item-1" className=" -mt-8">
                          <AccordionTrigger>Track the status of your mint</AccordionTrigger>
                          <AccordionContent>
                            <p className="text-sm md:text-lg">
                              Track the status of your mint directly on{' '}
                              <Link href="wizz.cash/live-mint" className="font-medium text-orange-400 hover:underline" prefetch={false}>
                                wizz.cash/live-mint
                              </Link>
                              .
                            </p>
                            <p className="text-sm md:text-lg">
                              Once it changes from
                              {" "}
                              <span className="font-medium text-orange-400 hover:font-bold">orange</span>
                              {" "}to{" "}
                              <span className="font-medium text-green-400 hover:font-bold">green</span>

                              , your item becomes valid.
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>


                      <div className="border-l-8 rounded-lg border-green-400 bg-background md:my-4 mx-4 p-4 w-full h-fit hover:dark:brightness-105 hover:brightness-95">
                        <div className="flex">
                          <div className="">
                            <p className="text-sm md:text-lg">
                              You have successfully verified your Subrealm.
                            </p>
                            <p className="text-sm md:text-lg">
                              You are now the proud owner of a club membership card, and much more.
                            </p>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </TabsContent>

            </Tabs>
          </CardContent >

        </Card >
      </div >

      <div className="p-4 md:p-12">
        <div className="mb-10 p-4 ">
          <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            What is Atomicals?
          </h3>
          <p className="text-gray-500 dark:text-gray-400">The Atomicals Protocol is designed for UTXO blockchains like Bitcoin to facilitate the minting, transferring, and updating of digital objects, commonly known as non-fungible tokens (NFTs). An Atomical, also referred to as an {`"`}atom,{`"`} represents a method for managing the lifecycle of digital objects through a chain of ownership, governed by a set of straightforward rules.</p>
        </div>

        <div className="mb-10">
          <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            What is a Digital Passport powered by Bitcoin?
          </h3>
          <p className="text-gray-500 dark:text-gray-400">A Digital Passport is a decentralized identity solution where realm names are self-owned and self-managed directly on the Bitcoin blockchain using the Atomicals Digital Object format, ensuring permanent and transferable ownership.</p>
        </div>

        <div className="mb-10">
          <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            What makes the Atomicals Bullrun special?
          </h3>
          <p className="text-gray-500 dark:text-gray-400">The Bullrun includes 10,000 subrealms, 10,000 NFTs, and an open-source Realm Name Service (RNS) website. It showcases digital identity and art collections globally and promotes self-sovereignty over digital presence.</p>
        </div>

        <div className="mb-10">
          <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            What is the Realm Name Service (RNS)?
          </h3>
          <p className="text-gray-500 dark:text-gray-400">RNS is a service that allows users to claim, own, and manage realm names directly on the Bitcoin blockchain without any intermediaries, ensuring permanent and transferable ownership.</p>
        </div>

        <div className="mb-10">
          <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            How are realm names managed on the Bitcoin blockchain?
          </h3>
          <p className="text-gray-500 dark:text-gray-400">Realm names are managed using the Atomicals Digital Object format, which eliminates the need for a centralized registrar. Once a name is claimed, it belongs to the owner indefinitely or until it is transferred.</p>
        </div>

        <div className="mb-10">
          <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            Can I create subrealms within my realm?
          </h3>
          <p className="text-gray-500 dark:text-gray-400">Yes, you can create subrealms tailored for various purposes such as friends, family, or business ventures, allowing for enhanced customization and management.</p>
        </div>

        <div className="mb-10">
          <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            What is the purpose of subrealms?
          </h3>
          <p className="text-gray-500 dark:text-gray-400">Subrealms can be used to organize and manage different areas of your digital identity or business, enabling specific configurations and interactions within each subrealm.</p>
        </div>

        <div className="mb-10">
          <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            How does decentralization benefit realm name owners?
          </h3>
          <p className="text-gray-500 dark:text-gray-400">Decentralization ensures that realm name owners have full control and sovereignty over their digital presence without reliance on a middleman. This promotes trust and security.</p>
        </div>

        <div className="mb-10">
          <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            What is the significance of NFTs in the Bullrun?
          </h3>
          <p className="text-gray-500 dark:text-gray-400">The 10,000 NFTs in the Bullrun represent unique digital assets that can be owned, showcased, and potentially appreciated in value, adding a layer of digital art and identity to the realms.</p>
        </div>

        <div className="mb-10">
          <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            How can I automate business processes using RNS?
          </h3>
          <p className="text-gray-500 dark:text-gray-400">RNS allows for the automation of subrealm creation and management, as well as automated payments in satoshis or ARC20 tokens based on advanced criteria, streamlining business operations.</p>
        </div>

        <div className="mb-10">
          <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            Are transactions transparent and verifiable?
          </h3>
          <p className="text-gray-500 dark:text-gray-400">Yes, transactions on the Bitcoin blockchain are transparent and verifiable, ensuring regulatory adherence and trust in financial interactions.</p>
        </div>

        <div className="mb-10">
          <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            How can I showcase my digital identity and art collections?
          </h3>
          <p className="text-gray-500 dark:text-gray-400">The RNS website provides a platform to display your digital identity and art collections to a global audience, enhancing your online presence and brand.</p>
        </div>

        <div className="mb-10">
          <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            Can realm names appreciate in value?
          </h3>
          <p className="text-gray-500 dark:text-gray-400">Yes, realm names and subrealms can be considered digital assets with the potential for appreciation over time, similar to other blockchain-based assets.</p>
        </div>

        <div className="mb-10">
          <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            What is the significance of a digital passport on the Bullrun?
          </h3>
          <p className="text-gray-500 dark:text-gray-400">A digital passport on the Bullrun is more than just a record; it signifies the potential of decentralized, blockchain-powered identity, and provides enhanced control and security over your digital presence.</p>
        </div>

        <div className="mb-10">
          <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            What is the +Bullrun Realm?
          </h3>
          <p className="text-gray-500 dark:text-gray-400">+Bullrun is a one-of-a-kind Top-Level-Realm (TLR). It is the first and only project on BTC offering an exclusive approach to discovering the technology of Realms together.

            By combining NFT culture with its 10,000 available subrealms and the advanced technology of the Realm Name Service, +Bullrun stands out.

            This is the first NFT collection where BELONGING TO THE COMMUNITY takes precedence over the ART.

            All together, as you are.</p>
        </div>

        <div className="mb-10">
          <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            How to Obtain a Bullrun Subrealm?
          </h3>
          <p className="text-gray-500 dark:text-gray-400">To obtain a Bullrun Subrealm, you need to claim the subrealm of your choice between bullrun.0 and bullrun.9999 using WizzWallet (link).

            The process for obtaining a realm is entirely decentralized and follows these steps:

            1. Claim the subrealm of your choice and register it on Bitcoin.
            2. Wait until your subrealm is validated on the blockchain and you are the legitimate candidate for the claim (3 blocks).
            3. Confirm your subrealm claim by paying 0.000888 BTC to the required address (WizzWallet provides an intuitive UI for this).
            4. Wait for the payment to be validated, and that{`'`}s it!</p>
        </div>

        <div className="mb-10">
          <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            How to Create an On-Chain Profile?
          </h3>
          <p className="text-gray-500 dark:text-gray-400">To create an on-chain profile, follow these steps:

            Go to the {`"`}Profile{`"`} section of our website.
            Click on the default section {`"`}Create a New Profile{`"`} and start your profile creation.
            The profiles displayed on realmbullrun.com are based on an extended version of the v1.3 template from the social-fi model of atomicals-js.

            The structure of the Bullrun profile is as follows: .......

            Tip: How to Automatically Add a List of Ordinals Inscriptions
            To automatically add a list of Ordinals inscriptions, follow these steps:

            Use the “parse JSON” option on our site.
            Copy and paste the inscription.json file from the desired collection on GitHub into the designated area.
            Our site will handle the rest, automatically adding all inscriptions, in order, to the “Collection” section of your profile.
            Next, choose an image (logo) for your collection, a title, and a slug. Additionally, you can select the option to redirect to the marketplace of your choice: Magic Eden or Atomicals Market.</p>
        </div>

        <div className="mb-10">
          <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            How to Link a Profile to a Realm?
          </h3>
          <p className="text-gray-500 dark:text-gray-400">To link a profile to a realm, follow these steps:

            Go to the {`"`}Profile{`"`} section of the site.
            Choose the option that suits you:
            Add one of YOUR profiles to a realm that you own.
            Add ANY profile to one of the realms that you own.</p>
        </div>

        <div className="mb-10">
          <h3 className="flex items-center mb-4 text-lg font-medium text-gray-900 dark:text-white">
            <svg className="flex-shrink-0 mr-2 w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
            Why Mine a Bullrun Subrealm?
          </h3>
          <p className="text-gray-500 dark:text-gray-400">By using a Bullrun subrealm instead of another realm, you gain visibility as you will be displayed on our explorer. This gives you front-line exposure and a sense of belonging to the +BULLRUN community.
            If you change your mind, don{`'`}t worry. It is always possible to trade your Bullrun subrealm at any time. You are the sole owner and custodian of your realm.</p>
        </div>
      </div>

    </section >
  )
}
