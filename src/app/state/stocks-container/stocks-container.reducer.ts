import { createReducer, on } from "@ngrx/store";
import { StocksContainer } from "../../models/stocks-container";
import { loadStocksContainer, saveStocksContainer } from "./stocks-container.actions";

export const initialState: StocksContainer = {
  period: '',
  stocks: []
};

export const stocksContainerReducer = createReducer(
  initialState,
  on(saveStocksContainer, (state, { container }) => (container)),
  on(loadStocksContainer, (state) => state)
);
