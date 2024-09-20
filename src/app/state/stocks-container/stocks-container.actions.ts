import { createAction, props } from "@ngrx/store";
import { StocksContainer } from "../../models/stocks-container";

export const saveStocksContainer = createAction('[Stocks Container] Save container', props<{ container: StocksContainer }>());

export const loadStocksContainer = createAction('[Brapi Response] Load container');
