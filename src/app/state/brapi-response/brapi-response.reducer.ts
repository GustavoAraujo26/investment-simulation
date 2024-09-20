import { createReducer, on } from "@ngrx/store";
import { BrapiResponse } from "../../models/brapi/brapi-response";
import { loadResponse, saveResponse } from "./brapi-response.actions";

export const initialState: BrapiResponse = {
  period: '',
  response: {
    stocks: [],
    indexes: [],
    availableSectors: [],
    availableStockTypes: []
  }
};

export const loadingReducer = createReducer(
  initialState,
  on(saveResponse, (state, { response }) => (response)),
  on(loadResponse, (state) => state)
);
