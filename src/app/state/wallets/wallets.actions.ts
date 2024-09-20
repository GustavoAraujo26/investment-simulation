import { createAction, props } from "@ngrx/store";
import { Wallet } from "../../models/wallet/wallet";

export const addAllWallets = createAction('[Wallets] Add all wallets', props<{ wallets: Wallet[] }>());

export const saveWallet = createAction('[Wallets] Save wallet', props<{ wallet: Wallet }>());

export const deleteWallet = createAction('[Wallets] Delete wallet', props<{ id: string }>());

export const loadWallets = createAction('[Wallet] Load all wallets');

export const loadCurrentWallet = createAction('[Wallets] Load current wallet', props<{ id: string }>());
