"use client"
import { useContext, useEffect, useRef, useState } from "react";
import { WalletContext } from "@/providers/WalletContextProvider";
import { AppContext } from "@/providers/AppContextProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle"
import { LoadingSpinner } from "@/components/icons/Spinner";
import { ClipboardCopyIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import QRCode from "react-qr-code";

import { detectScriptToAddressType } from "../atomical-lib";
const bip39 = require('bip39')
import BIP32Factory from "bip32";
import * as ecc from '@bitcoinerlab/secp256k1';
const bip32 = BIP32Factory(ecc);
import { createKeyPair } from "../atomical-lib/utils/create-key-pair";

import { Atomicals } from "../atomical-lib";
import { ElectrumApi } from "../atomical-lib/api/electrum-api";
import { CommandInterface } from "../atomical-lib/commands/command.interface";
import { MintInteractiveSubrealmCommand } from "../atomical-lib/commands/mint-interactive-subrealm-command";
import { MakePendingSubrealmPaymentCommand } from "../atomical-lib/commands/make-pending-subrealm-payment-command";
import { PendingSubrealmsCommand } from "../atomical-lib/commands/pending-subrealms-command";

export default function MintSubrealm() {

  const { network, tlr, mnemonic, showError, showAlert } = useContext(AppContext)
  const { walletData } = useContext(WalletContext)

  // main state variables
  const [fullname, setFullname] = useState(`+${tlr}.`)
  const [subrealm, setSubrealm] = useState('');
  const [mintingSubrealm, setMintingSubrealm] = useState("")
  const [receiverAddr, setReceiverAddr] = useState("")
  const [fundingAddress, setFundingAddress] = useState("")

  // satsbyte set logic state variables
  const [satsbyteDialogOpen, setSatsbyteDialogOpen] = useState(false)
  const [fastestFee, setFastestFee] = useState(0)
  const [halfHourFee, setHalfHourFee] = useState(0)
  const [hourFee, setHourFee] = useState(0)
  const [minimumFee, setMinimumFee] = useState(0)
  const [customFee, setCustomFee] = useState(30)
  const [selectedFeeType, setSelectedFeeType] = useState("fast")
  const [nextFunctionForSatsbyte, setNextFunctionForSatsbyte] = useState("mint")
  const customFeeInput = useRef<HTMLInputElement>(null)

  // claim logic state variables
  const [progressState, setProgressState] = useState('ready')
  const [claimTxId, setClaimTxId] = useState("")
  const [fundingFee, setFundingFee] = useState(0)
  const [fundingStatementVisible, setFundingStatementVisible] = useState(false)
  const [qrCode, setQrCode] = useState('')

  // get pending subs logic state variables
  const [pendingState, setPendingState] = useState('ready')
  const [pendingDialogOpen, setPendingDialogOpen] = useState(false)
  const [pendingCandidates, setPendingCandidates] = useState([])
  const [pendingAwaitingConfirmations, setPendingAwaitingConfirmations] = useState([])
  const [pendingAwaitingPayments, setPendingAwaitingPayments] = useState([])
  const [currentBlockHeight, setCurrentBlockHeight] = useState(2578696)    // block height at this time of coding...lol...

  // pay to verify logic state variables
  const [payToVerifyState, setPaytoVerifyState] = useState('ready')
  const [payToVerifyDialogOpen, setPayToVerifyDialogOpen] = useState(false)
  const [verifyingSubrealmAtomicalId, setVerifyingSubrealmAtomicalId] = useState("")
  const [verifyingSubrealmPaymentRules, setVerifyingSubrealmPaymentRules] = useState({})
  const [ruleFee, setRuleFee] = useState(0)
  const [ruleAddress, setRuleAddress] = useState('')
  const [ruleQrCode, setRuleQrCode] = useState('')

  useEffect(() => {
    if (!receiverAddr)
      setReceiverAddr(walletData.primary_addr)
  }, [walletData.primary_addr])

  // function to update current state and push notifications and display qrCode
  const pushInfo = (info: any) => {
    if (info.state) {
      setProgressState(info.state)
      if (info.state === 'awaiting-funding-utxo') {
        setFundingFee(info.data.fees)
        setFundingAddress(info.data.address)
        setFundingStatementVisible(true)
      }
      if (info.state === 'sent-tx') {
        setClaimTxId(info.data)
      }
    }
    if (info.warning) {
      showError(info.warning)
    }
    if (info.info) {
      showAlert(info.info)
    }
    if (info.qrcode)
      setQrCode(info.qrcode)
    if (info['pending-state']) {
      setPaytoVerifyState(info['pending-state'])
      if (info['pending-state'] === "Awaiting funding UTXO") {
        setRuleFee(info['rule-fee'])
        setRuleAddress(info['rule-address'])
        setRuleQrCode(info['rule-address'])
      }
      if (info['pending-state'] === "Success") {
        setPayToVerifyDialogOpen(false)
        showAlert('Successfully sent verification payment. Wait for the transaction to be confirmed...')
      }
    }
    if (info['pending-state'] === "error") {
      showError(info['pending-error'])
    }
  }

  // generate keypairs regarding funding address...mnemonic is saved in local storage
  const getFundingDetails = async () => {
    const funding_address = await createKeyPair(mnemonic, "m/86'/0'/0'/1/0")
    setFundingAddress(funding_address.address)
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const rootKey = bip32.fromSeed(seed);
    const childNode = rootKey.derivePath("m/86'/0'/0'/1/0");
    const owner = {
      address: funding_address.address,
      WIF: funding_address.WIF,
      childNode
    }
    const WIF = funding_address.WIF
    return {
      funding_address,
      seed,
      rootKey,
      childNode,
      owner,
      WIF
    }
  }

  const onClose = () => {
    setPendingDialogOpen(false)
  }

  const onClosePayToVerify = () => {
    setPayToVerifyDialogOpen(false)
  }

  const onCloseSatsbyte = () => {
    setProgressState('ready')
    setSatsbyteDialogOpen(false)
  }

  const openSatsbyteWindow = async (next: string) => {
    const getRecommendedFeeAPI = `${network === "testnet" ? process.env.NEXT_PUBLIC_MEMPOOL_TESTNET_APIENDPOINT : process.env.NEXT_PUBLIC_MEMPOOL_APIENDPOINT}/v1/fees/recommended`
    const response = await fetch(getRecommendedFeeAPI)
    const recommendedFees = await response.json()
    setFastestFee(recommendedFees.fastestFee)
    setHourFee(recommendedFees.hourFee)
    setMinimumFee(recommendedFees.minimumFee)
    setHalfHourFee(recommendedFees.halfHourFee)
    setNextFunctionForSatsbyte(next)
    setSatsbyteDialogOpen(true)
  }

  const getUserSelectedSatsbyte = () => {
    switch (selectedFeeType) {
      case "fast": return fastestFee;
      case "average": return halfHourFee;
      case "slow": return hourFee;
      case "custom": return customFee;
      default: return -1
    }
  }

  const mintSubrealm = async () => {
    let str = fullname.trim()
    setProgressState('started')

    if (str.startsWith('+'))
      str = str.substring(1, str.length).trim()

    if (!str) {
      showError('Please input the subrealm name to claim.')
      setProgressState('error')
      return
    }

    let just_str = str.substring((tlr.length + 1), str.length).trim()
    if (!just_str) {
      showError(`Please input your subrealm after +${tlr}.`)
      setProgressState('error')
      return
    }

    if (!receiverAddr) {
      showError('PPlease input the BTC address to receive the subrealm.')
      setProgressState('error')
      return
    }

    if (!str.startsWith(`${tlr}.`)) {
      showError(`You can only mint subrealms starting with +\'${tlr}\' here...`)
      setProgressState('error')
      return
    }

    setMintingSubrealm(str)
    await openSatsbyteWindow("mint")
  }

  const mintSubrealmWizz = () => {

    if (typeof window.wizz !== 'undefined') {
      window.wizz.requestMint({
        type: 'mint_subrealm',
        realm: 'bullrun',
        subrealm: subrealm,
      }).catch((error: any) => {
        console.error('Error minting Subrealm:', error);
      });
    } else {
      console.log('Wizz Wallet is not installed!');
    }
  };

  const MintSubrealmWithSatsByte = async (userSetSatsbyte: number) => {
    setSatsbyteDialogOpen(false)
    const atomicals = new Atomicals(ElectrumApi.createClient((network === 'testnet' ? process.env.NEXT_PUBLIC_WIZZ_PROXY_TESTNET : process.env.NEXT_PUBLIC_WIZZ_PROXY) || ''));
    try {
      const { owner, WIF } = await getFundingDetails()
      setProgressState('validating')
      await atomicals.electrumApi.open();
      const command: CommandInterface = new MintInteractiveSubrealmCommand(atomicals.electrumApi, {
        satsbyte: userSetSatsbyte,
        satsoutput: 1000
      }, mintingSubrealm, receiverAddr, WIF, owner);
      const res = await command.run(pushInfo);
    } catch (error: any) {
      console.log(error)
    } finally {
      atomicals.electrumApi.close();
    }
  }

  const getPendingRealms = async () => {
    if (!receiverAddr || receiverAddr === "") {
      showAlert('Please input a receiver address or connect your wallet to view any pending subrealms.')
      return;
    }
    setPendingState('fetching')
    const { WIF } = await getFundingDetails()

    const atomicals = new Atomicals(ElectrumApi.createClient((network === 'testnet' ? process.env.NEXT_PUBLIC_WIZZ_PROXY_TESTNET : process.env.NEXT_PUBLIC_WIZZ_PROXY) || ''));

    try {
      await atomicals.electrumApi.open();
      const command: CommandInterface = new PendingSubrealmsCommand(atomicals.electrumApi, {}, receiverAddr, WIF, -1, false);
      const result = await command.run(pushInfo);

      if (result && result.data) {
        const { current_block_height, request_subrealm } = result.data
        setCurrentBlockHeight(current_block_height)
        const { pending_awaiting_confirmations_for_payment_window, pending, pending_awaiting_payment } = request_subrealm
        setPendingCandidates(pending ? pending : [])
        setPendingAwaitingConfirmations([])
        if (pending_awaiting_confirmations_for_payment_window && pending_awaiting_confirmations_for_payment_window.length > 0) {
          setPendingAwaitingConfirmations(pending_awaiting_confirmations_for_payment_window)
        }
        setPendingAwaitingPayments([])
        if (pending_awaiting_payment && pending_awaiting_payment.length > 0) {
          setPendingAwaitingPayments(pending_awaiting_payment)
        }
        setPendingDialogOpen(true)
      }
      else {
        showAlert('No pending subrealms found. If you have just broadcasted a transaction, please wait for it to be confirmed before checking pending realms again.')
      }
    } catch (error: any) {
      showAlert('No pending subrealms found. If you have just broadcasted a transaction, please wait for it to be confirmed before checking pending realms again.')
      return {
        success: false,
        message: error.toString(),
        error
      }
    } finally {
      atomicals.electrumApi.close();
      setPendingState('ready')
    }
  }

  const payForRules = async (atomicalId: any, paymentRules: any) => {
    setPendingDialogOpen(false)
    setVerifyingSubrealmAtomicalId(atomicalId)
    setVerifyingSubrealmPaymentRules(paymentRules)
    openSatsbyteWindow("verify")
  }

  const PayToVerifyWithSatsByte = async (userSetSatsbyte: number) => {
    setSatsbyteDialogOpen(false)
    setPayToVerifyDialogOpen(true)
    let paymentOutputs = []
    const paymentRules: any = verifyingSubrealmPaymentRules
    for (const payScript in paymentRules) {
      if (!paymentRules.hasOwnProperty(payScript)) {
        continue;
      }
      const outputValue = paymentRules[payScript]['v']
      const outputArc20 = paymentRules[payScript]['id']
      const expectedAddress = detectScriptToAddressType(payScript);
      paymentOutputs.push({
        address: expectedAddress,
        value: outputValue
      });

      if (outputArc20) {
        showError('ARC-20 payment not supported yet. Coming soon...')
        return;
      } else {
        console.log('Price: ', outputValue / 100000000);
      }
    }
    const { WIF } = await getFundingDetails()

    const atomicals = new Atomicals(ElectrumApi.createClient((network === 'testnet' ? process.env.NEXT_PUBLIC_WIZZ_PROXY_TESTNET : process.env.NEXT_PUBLIC_WIZZ_PROXY) || ''));

    try {
      await atomicals.electrumApi.open();
      const command: CommandInterface = new MakePendingSubrealmPaymentCommand(atomicals.electrumApi, { satsbyte: userSetSatsbyte }, WIF, verifyingSubrealmAtomicalId, paymentOutputs);
      const result = await command.run(pushInfo);
    } catch (err) {
      console.log(err)
    } finally {
      atomicals.electrumApi.close()
    }
  }

  const getStatementsFromProgreeState = (state: string) => {
    switch (state) {
      case 'ready': return '';
      case 'error': return 'Oops! Something went wrong. Please try again with the correct information.';
      case 'validating': return 'Validating your input...';
      case 'detected-rules': return 'Subrealm rules detected at the parent realm.';
      case 'checking-rules': return 'Now checking against the rules...';
      case 'rule-matched': return 'Your subrealm matches the rule. Starting...';
      case 'payment-address-detected': return 'Payment address detected.';
      case 'detected-funding-utxo': return 'Funding UTXO detected. Preparing to mint...';
      case 'concurrency-set': return 'Concurrent mining workers are prepared.';
      case 'mining-started': return 'Mining started... This may take some time due to your GPU...';
      case 'mined-bitwork': return 'Bitwork validated!';
      case 'broadcasting-tx': return 'Broadcasting transaction for your subrealm.';
      case 'sent-tx': return 'Subrealm successfully minted! Please wait for the transaction to be confirmed...';
    }
    return ''
  }

  return (
    <div className="lg:mx-auto lg:w-6/12 mx-8">

      <div className="mint-container flex flex-col gap-4">
        <h1 className="font-black text-4xl">
          Join the +bullrun
        </h1>
        <p className="mb-4">
          Claim a subrealm between 0 and 9999 to be part of the +BULLRUN. Customise it, trade it or just hold. Realms are more than you imagine.
        </p>


        <div className="flex gap-2">
          <Input
            type="number"
            min="0"
            max="9999"
            value={subrealm}
            onChange={(e) => setSubrealm(e.target.value)}
            placeholder="Enter Subrealm"
            className="w-full"
          />
          <Button onClick={mintSubrealmWizz} className="w-full">Mint Subrealm</Button>


        </div>
        <div className="flex flex-col gap-2">
          <Input
            className="w-full"
            type="text"
            disabled={pendingState !== "ready" || (progressState !== "ready" && progressState !== "error" && progressState !== "sent-tx")}
            placeholder="Address to verify pending subrealm"
            value={receiverAddr}
            onChange={e => setReceiverAddr(e.target.value)}
          />
          <Button variant={"outline"} disabled={pendingState !== "ready"} onClick={() => getPendingRealms()}>
            <LoadingSpinner className={`h-4 ${(pendingState !== 'ready' && pendingState !== 'error' && pendingState !== 'sent-tx') ? "" : "hidden"}`}>
            </LoadingSpinner>
            Pending
          </Button>
        </div>
        <p className="mb-4">
          Once claimed, be sure to <span className="text-primary font-bold">PAY-TO-VALIDATE</span> your realm. Click on <span className=" font-bold">PENDING</span> and follow the instructions OR open your
          <span className="text-orange-400 font-bold"> wizzwallet</span> to track your payments.
        </p>
      </div>

      {/* <div className="mt-4 flex flex-wrap gap-2 w-full lg:items-start items-center justify-center space-y-2 text-center ">
        A Decentralised-MINT requires to CLAIM & VALIDATE your assets.
        <span className="text-green-400 font-semibold"> Please follow the subrealm status.</span> Click the {`"`}Pending{`"`} button, and pay to validate your subrealm.
      </div>

      <div className="mt-4 flex flex-col w-full lg:items-start items-center space-y-2">
        <Input
          placeholder="Check realms and subrealms..."
          disabled={(progressState !== 'ready' && progressState !== 'error' && progressState !== 'sent-tx')}
          value={fullname}
          onChange={(e) => {
            let typedName = e.target.value
            if (typedName.startsWith(`+${tlr}.`) && typedName.length > tlr.length + 1)
              setFullname(typedName)
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter' && fullname !== '') mintSubrealm();
          }}
        />
        <div className=" w-full flex lg:flex-row flex-col lg:space-x-2 space-x-0 space-y-2 lg:space-y-0">
          <Button disabled={progressState !== "ready" && progressState !== "error" && progressState !== "sent-tx"} onClick={() => mintSubrealm()}>
            <LoadingSpinner className={`h-4 ${(progressState !== 'ready' && progressState !== 'error' && progressState !== 'sent-tx') ? "" : "hidden"}`}>
            </LoadingSpinner>
            Mint
          </Button>
          <Button disabled={pendingState !== "ready"} onClick={() => getPendingRealms()}>
            <LoadingSpinner className={`h-4 ${(pendingState !== 'ready' && pendingState !== 'error' && pendingState !== 'sent-tx') ? "" : "hidden"}`}>
            </LoadingSpinner>
            Pending
          </Button>
        </div>

      </div>

      <div className="mt-4 items-center flex flex-col space-y-2">
        <div className="z-10">
          Receiver address
        </div>
        <Input
          className="w-full"
          type="text"
          disabled={pendingState !== "ready" || (progressState !== "ready" && progressState !== "error" && progressState !== "sent-tx")}
          placeholder="Address to receive subrealm"
          value={receiverAddr}
          onChange={e => setReceiverAddr(e.target.value)}
        />
      </div> */}

      <div className={`mt-12 flex flex-col items-center ${(progressState !== 'ready' && progressState !== 'error' && progressState !== 'sent-tx') ? "" : "hidden"}`}>
        <div className="z-10">Now Minting...</div>
        <p className="text-center z-10">
          Please do not refresh this page until the mint ends. Refreshing the page will stop the mining process.
        </p>
      </div>

      <div className="mt-12 flex flex-col text-center w-full z-10">
        <div className="w-full text-center z-10">
          <LoadingSpinner className={` m-auto ${(progressState !== 'ready' && progressState !== 'error' && progressState !== 'sent-tx') ? "" : "hidden"}`}>
          </LoadingSpinner>
        </div>
        <p className="text-center z-10">
          {getStatementsFromProgreeState(progressState)}
        </p>
      </div>

      <div className={`mt-8 flex flex-col space-y-2 text-center z-10 w-full ${progressState !== 'awaiting-funding-utxo' ? 'hidden' : ''}`}>
        <div className={`${fundingStatementVisible ? "" : "hidden"} `}>
          {`Awaiting ${fundingFee / 100000000} BTC to`}
        </div>
        <div className={`z-10 flex flex-row justify-center space-x-3 w-full text-center ${fundingStatementVisible ? "" : "hidden"}`}>
          <div>
            {`${fundingAddress.substring(0, 5)}.....${fundingAddress.substring(fundingAddress.length - 5, fundingAddress.length)}`}
          </div>

          <ClipboardCopyIcon
            className="cursor-pointer"
            onClick={() => {
              if (typeof navigator !== "undefined") {
                navigator.clipboard.writeText(fundingAddress)
                showAlert('Copied to clipboard !')
              }
            }} />
        </div>
        <div className="h-auto z-10 max-w-[320px] w-full mx-auto pb-20">
          <QRCode
            className="mt-4 bg-white p-4"
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={qrCode}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>

      <Dialog open={pendingDialogOpen} onOpenChange={onClose} modal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pending Subrealms in Receiver Address</DialogTitle>
            <DialogDescription>
              <div className="mt-8 ">
                <div>
                  If you have recently claimed a subrealm or sent a verification payment, please wait for the transaction to be confirmed before attempting to check pending realms again to avoid duplicate payments.
                </div>
                <div className="mt-6">
                  Current Block Height
                </div>
                <div className="mt-2">
                  {currentBlockHeight}
                </div>
              </div>

              <div className="mt-8">
                {
                  pendingAwaitingPayments && pendingAwaitingPayments.length > 0 ? (
                    <div>
                      Pending Awaiting Payments
                    </div>
                  ) : (<></>)
                }
                <div className="">
                  {
                    pendingAwaitingPayments.map((elem: any) => {
                      const payment_rule = elem.applicable_rule.matched_rule.o
                      return (
                        <div key={elem.atomical_id} className="mt-3">
                          <div>Atomical #{elem.atomical_number}: +{elem.request_full_realm_name}</div>
                          <div>Payment from height: {elem.make_payment_from_height}</div>
                          <div>Payment no later than: {elem.payment_due_no_later_than_height}</div>
                          <div>Candidates: {elem.subrealm_candidates.length}</div>
                          <div>
                            <Button color="primary" onClick={() => payForRules(elem.atomical_id, payment_rule)}>
                              Pay to verify
                            </Button>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>

              <div className="mt-8">
                {
                  pendingAwaitingConfirmations && pendingAwaitingConfirmations.length > 0 ? (
                    <div>
                      Pending Awaiting Confirmations for Payment Window
                    </div>
                  ) : (<></>)
                }
                <div className="mt-2">
                  {
                    pendingAwaitingConfirmations.map((elem: any) => (
                      <div key={elem.atomical_id} className="mt-6">
                        <div>Atomical #{elem.atomical_number}: +{elem.request_full_realm_name}</div>
                        <div>Payment from height: {elem.make_payment_from_height}</div>
                        <div>payment no later than: {elem.payment_due_no_later_than_height}</div>
                        <div>Candidates: {elem.subrealm_candidates.length}</div>
                      </div>
                    ))
                  }
                </div>
              </div>

              <div className="mt-8">
                {
                  pendingCandidates && pendingCandidates.length > 0 ? (
                    <div>
                      Pending for Candidates - wait 3 blocks for other candidates
                    </div>
                  ) : (<></>)
                }
                <div className="mt-2">
                  {
                    pendingCandidates.map((elem: any) => (
                      <div key={elem.atomical_id} className="mt-6">
                        <div>Atomical #{elem.atomical_number}: +{elem.request_full_realm_name}</div>
                        <div>Payment from height: {elem.make_payment_from_height}</div>
                        <div>payment no later than: {elem.payment_due_no_later_than_height}</div>
                        <div>Candidates: {elem.subrealm_candidates.length}</div>
                      </div>
                    ))
                  }
                </div>
              </div>


            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={satsbyteDialogOpen} onOpenChange={onCloseSatsbyte} modal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Fee Rate</DialogTitle>
            <DialogDescription>
              <div className="flex flex-col space-y-3 mt-4">
                <div className=" w-full flex lg:flex-row flex-col lg:space-x-2 space-x-0 space-y-2 lg:space-y-0 justify-between">
                  <Toggle onPressedChange={() => setSelectedFeeType("fast")} pressed={selectedFeeType === "fast"} variant="outline" className="w-full flex flex-col py-10">
                    <div>Fast</div>
                    <div>{fastestFee} sat/vB</div>
                    <div>~ 10 mins</div>
                  </Toggle>
                  <Toggle
                    onPressedChange={() => {
                      setSelectedFeeType("custom")
                      if (customFeeInput.current)
                        customFeeInput.current.focus()
                    }}
                    pressed={selectedFeeType === "custom"}
                    variant="outline"
                    className="w-full flex flex-col py-10">
                    <div>Custom</div>
                    <div className="flex flex-row items-center">
                      <input
                        value={customFee}
                        onBlur={() => console.log(customFee)}
                        onChange={(e: any) => {
                          setCustomFee(e.target.value)
                        }}
                        ref={customFeeInput}
                        className={`${selectedFeeType === "custom" ? "w-12" : "opacity-0 w-0"} p-1 my-0 `}
                        type="number" />
                      <div className={`${selectedFeeType === "custom" ? "opacity-0 w-0" : ""}`}>
                        {customFee}
                      </div>
                      <div className="ml-2">
                        sat/vB
                      </div>
                    </div>
                  </Toggle>
                </div>
                <div className=" w-full flex lg:flex-row flex-col lg:space-x-2 space-x-0 space-y-2 lg:space-y-0 justify-between">
                  <Toggle onPressedChange={() => setSelectedFeeType("average")} pressed={selectedFeeType === "average"} variant="outline" className="w-full flex flex-col py-10">
                    <div>Average</div>
                    <div>{halfHourFee} sat/vB</div>
                    <div>~ 30 mins</div>
                  </Toggle>
                  <Toggle onPressedChange={() => setSelectedFeeType("slow")} pressed={selectedFeeType === "slow"} variant="outline" className="w-full flex flex-col py-10">
                    <div>Slow</div>
                    <div>{hourFee} sat/vB</div>
                    <div>~ 1 hour</div>
                  </Toggle>
                </div>
                <Button onClick={async () => {
                  const satsbyte = getUserSelectedSatsbyte()
                  if (satsbyte < minimumFee) {
                    showAlert("You have set too low satsbyte. Transaction might be stuck...")
                    return;
                  }
                  if (satsbyte >= 200) {
                    showAlert("You have set too high satsbyte. You might pay high network fee...")
                    return;
                  }
                  if (nextFunctionForSatsbyte === "mint")
                    await MintSubrealmWithSatsByte(satsbyte)
                  else if (nextFunctionForSatsbyte === "verify")
                    await PayToVerifyWithSatsByte(satsbyte)
                }}>Next</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={payToVerifyDialogOpen} onOpenChange={onClosePayToVerify} modal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pay to Verify your Subrealm</DialogTitle>
            <DialogDescription>
              <div className={payToVerifyState === "Awaiting funding UTXO" ? "hidden" : ""}>
                {payToVerifyState}
              </div>
              <div className={payToVerifyState === "Awaiting funding UTXO" ? "" : "hidden"}>
                <div className="flex flex-row justify-center space-x-3 w-full text-center mt-4 mb-2">
                  {`Awaiting ${ruleFee / 100000000} BTC to`}
                </div>
                <div className="flex flex-row justify-center space-x-3 w-full text-center">
                  <div>
                    {`${ruleAddress.substring(0, 5)}.....${ruleAddress.substring(ruleAddress.length - 5, ruleAddress.length)}`}
                  </div>

                  <ClipboardCopyIcon
                    className="cursor-pointer"
                    onClick={() => {
                      if (typeof navigator !== "undefined") {
                        navigator.clipboard.writeText(ruleAddress)
                        showAlert('Copied to clipboard !')
                      }
                    }} />
                </div>
                <div className="h-auto max-w-[320px] w-full mx-auto pb-20">
                  <QRCode
                    className="mt-4 bg-white p-4"
                    size={256}
                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                    value={ruleQrCode}
                    viewBox={`0 0 256 256`}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}