import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const selectWallets = (state: AppState) => state.wallets;
