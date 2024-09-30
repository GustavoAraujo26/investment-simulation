import { Component, OnInit } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { titleReducer } from '../../state/title/title.reducer';
import { AppState } from '../../state/app.state';
import { addTitle } from '../../state/title/title.actions';
import { StockCarouselComponent } from '../../components/stock-carousel/stock-carousel.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StockCodeDisplayComponent } from '../../components/stock-code-display/stock-code-display.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    StockCarouselComponent,
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    StockCodeDisplayComponent,
    MatDividerModule,
    MatProgressBarModule
  ]
})
export class HomeComponent implements OnInit {

  constructor(private store: Store<AppState>) {
    this.store.dispatch(addTitle({ currentTitle: 'Home' }));
  }

  ngOnInit() {
  }

}
