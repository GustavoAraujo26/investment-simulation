import { Injectable } from '@angular/core';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class WalletsService {

constructor(private store: Store<AppState>) { }

}
