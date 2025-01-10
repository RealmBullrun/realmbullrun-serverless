export const WalletTypes = {
  WizzWallet: "wizz",
  UnisatWallet: "unisat",
  OKXWallet: "okx"
}

export const WalletOpCode = {
  SUCCESS: "success",
  NoBrowser: "no-browser",
  NoWalletFound: "no-wallet-found",
  NotConnected: "not-connected",
  NoWizzWallet: "no-wizz-wallet",
  NotEnoughFund: "not-enough-fund",
  UserRejected: "user-rejected",
  UnknownError: "unknown-error",
}

export const getInstalledWalletTypes = () => {
  if (!window || typeof window === "undefined") {
    return {
      opcode: WalletOpCode.NoBrowser,
      result: []
    }
  }

  let result = []
  if (window.wizz && typeof window.wizz !== "undefined")
    result.push(WalletTypes.WizzWallet)

  if (window.unisat && typeof window.unisat !== "undefined")
    result.push(WalletTypes.UnisatWallet)

  if (window.okxwallet && typeof window.okxwallet !== 'undefined')
    result.push(WalletTypes.OKXWallet)

  if (result.length === 0)
    return {
      opcode: WalletOpCode.NoWalletFound,
      result
    }

  return {
    opcode: WalletOpCode.SUCCESS,
    result
  }
}

export const getConnectedWallet = async () => {

  const { opcode, result: installedWalletTypes } = getInstalledWalletTypes()

  if (opcode !== WalletOpCode.SUCCESS)
    return {
      opcode,
      result: []
    }
  
  for (const i in installedWalletTypes) {
    const type = installedWalletTypes[i]
    try {
      if (type === WalletTypes.WizzWallet) {
        const result: string[] = await window.wizz.getAccounts()
        if (result && result.length > 0)
          return {
            opcode: WalletOpCode.SUCCESS,
            type: WalletTypes.WizzWallet,
            primary_address: result[0]
          }
      }
      if (type === WalletTypes.UnisatWallet) {
        const result: string[] = await window.unisat.getAccounts()
        if (result && result.length > 0)
          return {
            opcode: WalletOpCode.SUCCESS,
            type: WalletTypes.UnisatWallet,
            primary_address: result[0]
          }
      }
      if (type === WalletTypes.UnisatWallet) {
        const result = await window.okxwallet.bitcoin.getAccounts()
        if (result && result.length > 0)
        return {
          opcode: WalletOpCode.SUCCESS,
          type: WalletTypes.OKXWallet,
          primary_address: result[0]
        }
      }  
    } catch (error) {
      console.log(error)
    }
  }
  return {
    opcode: WalletOpCode.UnknownError,
    type: "",
    primary_address: ""
  }
}

export const sendBitcoin = async ({
  dest,
  satoshis,
  feeRate
}: {
  dest: string,
  satoshis: number,
  feeRate: number
}) => {

  const { opcode, type, primary_address } = await getConnectedWallet()

  if (opcode !== WalletOpCode.SUCCESS || !type || !primary_address)
    return {
      opcode,
      txid: ""
    }

  try {
    if (type === WalletTypes.WizzWallet) {
      const txid = await window.wizz.sendBitcoin(dest, satoshis, { feeRate })
      if (txid)
        return {
          opcode: WalletOpCode.SUCCESS,
          txid
        }
    }
    if (type === WalletTypes.UnisatWallet) {
      const txid = await window.unisat.sendBitcoin(dest, satoshis, { feeRate })
      if (txid)
        return {
          opcode: WalletOpCode.SUCCESS,
          txid
        }
    }
    if (type === WalletTypes.OKXWallet) {
      const txid = await window.okxwallet.bitcoin.sendBitcoin(dest, satoshis, { feeRate })
      if (txid)
        return {
          opcode: WalletOpCode.SUCCESS,
          txid
        }
    }
  } catch (error) {
    console.log(error)
  }
  
  return {
    opcode: WalletOpCode.UnknownError,
    txid: ""
  }

}

export const mintSubrealm = ({
  tlr,
  subrealm,
  satsIn
}: {
  tlr: string,
  subrealm: string,
  satsIn: number
}) => {

  const { result: walletTypes }: { result: string[] } = getInstalledWalletTypes()
  if (walletTypes.indexOf(WalletTypes.WizzWallet) < 0) {
    return {
      opcode: WalletOpCode.NoWizzWallet,
      message: "You should install Wizz wallet in order to proceed to mint..."
    }
  }

  window.wizz.requestMint({
    type: 'mint_subrealm', 
    realm: tlr, 
    subrealm: subrealm,
    satsIn
  }).catch((error: any) => {
    console.log(error)
    return {
      opcode: WalletOpCode.UnknownError,
      message: "Unknown Error..."
    }
  })

  return {
    opcode: WalletOpCode.SUCCESS,
    message: ""
  }

}

export const mintDMItem = async (json: any) => {
  
  const { opcode, result: walletTypes }: { opcode: any, result: string[] } = getInstalledWalletTypes()
  if (walletTypes.indexOf(WalletTypes.WizzWallet) < 0) {
    return {
      opcode: WalletOpCode.NoWizzWallet,
      message: "You should install Wizz wallet in order to proceed to mint..."
    }
  }

  await window.wizz.requestMint({
    type: 'mint_dmitem',
    atomicalId: '52537011ff972e8bb431c139a0a5359731dd802b8de5752bbecadbf015884456i0', // bullrun collection atomicalId
    satsIn: 546,  // default dust limit
    dmitem: json
  }).catch((error: any) => {
    console.log(error)
    return {
      opcode: WalletOpCode.UnknownError,
      message: "Unknown Error..."
    }
  })

  return {
    opcode: WalletOpCode.SUCCESS,
    message: ""
  }

}

export const signMessage = async (message: string) => {

  const { opcode, type, primary_address } = await getConnectedWallet()

  if (opcode !== WalletOpCode.SUCCESS || !type || !primary_address)
    return {
      opcode,
      result: ""
    }

  try {
    if (type === WalletTypes.WizzWallet) {
      const result = await window.wizz.signMessage(message, "bip322-simple")
      if (result)
        return {
          opcode: WalletOpCode.SUCCESS,
          result
        }
    }
    if (type === WalletTypes.UnisatWallet) {
      const result = await window.unisat.signMessage(message, "bip322-simple")
      if (result)
        return {
          opcode: WalletOpCode.SUCCESS,
          result
        }
    }
    if (type === WalletTypes.OKXWallet) {
      const result = await window.okxwallet.bitcoin.signMessage(message, "bip322-simple")
      if (result)
        return {
          opcode: WalletOpCode.SUCCESS,
          result
        }
    }
  } catch (error) {
    console.log(error)
  }

  return {
    opcode: WalletOpCode.UnknownError,
    result: ""
  }
}

export const signPsbt = async (psbt: any) => {

  const { opcode, type, primary_address } = await getConnectedWallet()

  if (opcode !== WalletOpCode.SUCCESS || !type || !primary_address)
    return {
      opcode,
      result: ""
    }

  try {
    if (type === WalletTypes.WizzWallet) {
      const result = await window.wizz.signPsbt(psbt)
      if (result)
        return {
          opcode: WalletOpCode.SUCCESS,
          result
        }
    }
    if (type === WalletTypes.UnisatWallet) {
      const result = await window.unisat.signPsbt(psbt)
      if (result)
        return {
          opcode: WalletOpCode.SUCCESS,
          result
        }
    }
    if (type === WalletTypes.OKXWallet) {
      const result = await window.okxwallet.bitcoin.signPsbt(psbt)
      if (result)
        return {
          opcode: WalletOpCode.SUCCESS,
          result
        }
    }
  } catch (error) {
    console.log(error)
  }

  return {
    opcode: WalletOpCode.UnknownError,
    result: ""
  }
}

export const pushPsbt = async (psbtHex: any) => {

  const { opcode, type, primary_address } = await getConnectedWallet()

  if (opcode !== WalletOpCode.SUCCESS || !type || !primary_address)
    return {
      opcode,
      result: ""
    }

  try {
    if (type === WalletTypes.WizzWallet) {
      const result = await window.wizz.pushPsbt(psbtHex)
      if (result)
        return {
          opcode: WalletOpCode.SUCCESS,
          result
        }
    }
    if (type === WalletTypes.UnisatWallet) {
      const result = await window.unisat.pushPsbt(psbtHex)
      if (result)
        return {
          opcode: WalletOpCode.SUCCESS,
          result
        }
    }
    if (type === WalletTypes.OKXWallet) {
      const result = await window.okxwallet.bitcoin.pushPsbt(psbtHex)
      if (result)
        return {
          opcode: WalletOpCode.SUCCESS,
          result
        }
    }
  } catch (error) {
    console.log(error)
  }

  return {
    opcode: WalletOpCode.UnknownError,
    result: ""
  }
}