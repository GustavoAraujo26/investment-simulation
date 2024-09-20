import { WalletsService } from './../../services/wallets/wallets.service';
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../app.state";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { addAllWallets, loadWallets, saveWallet, deleteWallet } from './wallets.actions';
import { from, switchMap, of, mergeMap, map } from 'rxjs';

@Injectable()
export class WalletsEffects{
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private walletsService: WalletsService
  ) { }

  loadWallets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWallets),
      switchMap(() =>
        this.walletsService.loadWallets().pipe(
          map((wallets) => addAllWallets({ wallets: wallets})),
        ),
      ),
    ),
  );

  saveWallet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveWallet),
      switchMap((action) =>
        this.walletsService.saveWallet(action.wallet).pipe(
          map((result) => console.log(result))
        )
      ),
    ),
    { dispatch: false }
  );

  deleteWallet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteWallet),
      switchMap((action) =>
        this.walletsService.deleteWallet(action.id).pipe(
          map((result) => console.log(result))
        )
      ),
    ),
    { dispatch: false }
  );
}
