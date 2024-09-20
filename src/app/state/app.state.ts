import { StocksContainer } from "../models/stocks-container";
import { Wallet } from "../models/wallet/wallet";

export interface AppState {
  title: string,
  loading: boolean,
  stocksContainer: StocksContainer,
  wallets: Wallet[]
}
