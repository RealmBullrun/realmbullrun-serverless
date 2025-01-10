import Image from "next/image"
import { Separator } from "../ui/separator"
import Link from "next/link"
import { TwitterXIcon } from "../icons/TwitterXIcon"
import { TelegramIcon } from "../icons/TelegramIcon"
import { BookIcon } from "../icons/BookIcon"
import { QuestionMarkIcon } from "../icons/QuestionMarkIcon"

export const Footer = () => {
  return (
    <>
      <footer className="p-4 sm:p-6 ">
        <div className="mx-auto max-w-screen-2xl">
          <Separator className="my-4" />
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center">
                <Image src="/banner.png" width={144} height={80} className="mr-3" alt="+bullrun" />
              </a>
              <div className="text-sm text-gray-500 text-center mx-auto dark:text-gray-400">
                 2024 <a href="/" className="hover:underline">+BULLRUN™</a>. All Rights Reserved.
              </div>
              {/* <span className="">© 2024 <a href="/" className="hover:underline">+BULLRUN™</a>. All Rights Reserved.
              </span> */}
            </div>
            <div className="grid grid-cols-2 gap-12 sm:gap-20 sm:grid-cols-2 mt-4">
              <div className="mx-auto">
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Join us</h2>
                <div className="text-gray-600 dark:text-gray-400 mb-4 flex flex-row gap-8 text-2xl">
                  <Link href="https://x.com/realmbullrun" target="_blank"><TwitterXIcon /></Link>
                  <Link href="https://t.me/+wZUvcQNp8AtkZTU0" target="_blank"><TelegramIcon /></Link>
                </div>
              </div>
              <div className="mx-auto">
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                <div className="text-gray-600 dark:text-gray-400 mb-4 flex flex-row gap-8 text-2xl">
                  <Link href="https://atomicals.guide" target="_blank"><BookIcon /></Link>
                  <Link href="/qna" target="_self"><QuestionMarkIcon /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}