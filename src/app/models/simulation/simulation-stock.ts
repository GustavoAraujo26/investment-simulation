import { WalletStock } from "../wallet/wallet-stock";

export interface SimulationStock {
  stock: WalletStock,
  price: number,
  quantity: number
}
