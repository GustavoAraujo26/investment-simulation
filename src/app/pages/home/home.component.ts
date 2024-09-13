import { Component, OnInit } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { titleReducer } from '../../state/title/title.reducer';
import { AppState } from '../../state/app.state';
import { addTitle } from '../../state/title/title.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: []
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<AppState>) {
    this.store.dispatch(addTitle({ currentTitle: 'Home' }));
  }

  ngOnInit() {
  }

}
