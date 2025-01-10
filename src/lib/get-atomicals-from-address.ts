import { ElectrumApi, detectAddressTypeToScripthash } from "@/app/atomical-lib";

export default async function getAtomicalsFromAddress (address: string, network: string = "bitcoin" ) {
  const electrumApi = await ElectrumApi.createClient((network === 'testnet' ? process.env.NEXT_PUBLIC_CURRENT_PROXY_TESTNET : process.env.NEXT_PUBLIC_CURRENT_PROXY) || '')
  const { scripthash } = detectAddressTypeToScripthash(address);
  const { atomicals } = await electrumApi.atomicalsByScripthash(scripthash);
  return atomicals
}
