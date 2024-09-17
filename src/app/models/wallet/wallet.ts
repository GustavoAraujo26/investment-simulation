import { WalletStock } from "./wallet-stock";

export interface Wallet {
  id: string,
  title: string,
  observation: string,
  active: boolean,
  stocks: WalletStock[]
}
