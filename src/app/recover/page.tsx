"use client"
import { AppContext } from "@/providers/AppContextProvider"
import { useContext, useEffect, useState } from "react"

export default function MyItems() {

  const { network, showAlert, showError, tlr, mnemonic } = useContext(AppContext)
  
  return (
    <div className="p-12 space-y-10 text-center mx-auto max-w-screen-2xl">
      <div>
        In case you paid sats but did not succeed in mint profile, set to realm etc, {`(`} for example, when you closed the browser while mint{`)`}, you can recover your funds by importing below mnemonic phrase to your Wizz wallet. This mnemonic phrase only resides on your browser, we do not store it on our server side...
      </div>
      <div>
        { mnemonic }
      </div>
    </div>

  )
}

