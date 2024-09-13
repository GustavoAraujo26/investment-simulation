import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { addTitle } from '../../state/title/title.actions';

@Component({
  selector: 'app-wallet-dashboard',
  templateUrl: './wallet-dashboard.component.html',
  styleUrls: ['./wallet-dashboard.component.css']
})
export class WalletDashboardComponent implements OnInit {

  constructor(private store: Store<AppState>) {
    this.store.dispatch(addTitle({ currentTitle: 'Lista de carteiras de investimentos' }));
  }

  ngOnInit() {
  }

}
