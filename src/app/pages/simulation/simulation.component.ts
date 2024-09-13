import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { addTitle } from '../../state/title/title.actions';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit {

  constructor(private store: Store<AppState>) {
    this.store.dispatch(addTitle({ currentTitle: 'Simulador de investimentos' }));
  }

  ngOnInit() {
  }

}
