import { Wallet } from './../../models/wallet/wallet';
import { createReducer, on } from "@ngrx/store";
import { addAllWallets, deleteWallet, loadWallets, saveWallet } from "./wallets.actions";

export const initialState: Wallet[] = [];

export const walletsReducer = createReducer(
  initialState,
  on(addAllWallets, (state, { wallets }) => (state = wallets)),
  on(saveWallet, (state, { wallet }) => {
    var currentWallet = state.filter(x => x.id === wallet.id);
    if (currentWallet === null || currentWallet === undefined){
      return [...state, wallet];
    }
    else{
      var otherWallets = state.filter(x => x.id !== wallet.id);
      return [...otherWallets, wallet];
    }
  }),
  on(deleteWallet, (state, { id }) => {
    return state.filter(x => x.id !== id);
  }),
  on(loadWallets, (state) => state),
);
