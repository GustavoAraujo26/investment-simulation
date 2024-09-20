import { Injectable } from '@angular/core';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { Wallet } from '../../models/wallet/wallet';
import { addAllWallets } from '../../state/wallets/wallets.actions';
import { Observable, of } from 'rxjs';

const STORAGEKEY: string = 'wallets';

@Injectable({
  providedIn: 'root'
})
export class WalletsService {

  constructor() { }

  loadWallets(): Observable<Wallet[]> {
    var storageItem = localStorage.getItem(STORAGEKEY);
    if (storageItem === null)
      return of([]);

    var wallets = JSON.parse(storageItem!) as Wallet[];

    return of(wallets);
  }

  saveWallet(wallet: Wallet): Observable<boolean> {
    debugger;
    var storageItem = localStorage.getItem(STORAGEKEY);
    if (storageItem === null){
      this.saveWalletsOnLocalStorage([wallet]);
      return of(true);
    }

    var wallets = JSON.parse(storageItem!) as Wallet[];

    var walletIndex = wallets.findIndex(x => x.id === wallet.id);
    if (walletIndex === 0){
      wallets.push(wallet);
    }
    else{
      wallets[walletIndex] = wallet;
    }

    this.saveWalletsOnLocalStorage(wallets);

    return of(true);
  }

  private saveWalletsOnLocalStorage(wallets: Wallet[]) {
    var json = JSON.stringify(wallets);
    localStorage.setItem(STORAGEKEY, json);
  }
}
