import { StocksContainer } from "../models/stocks-container";

export interface AppState {
  title: string,
  loading: boolean,
  stocksContainer: StocksContainer
}
