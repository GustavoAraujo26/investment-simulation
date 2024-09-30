import { StocksContainer } from './../../models/stocks-container';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { selectStocksContainer } from '../../state/stocks-container/stocks-container.selector';
import { OptionStock } from '../../models/option-stock';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { StockCodeDisplayComponent } from '../stock-code-display/stock-code-display.component';
import { interval, mergeMap, Subscription, timer } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-stock-carousel',
  templateUrl: './stock-carousel.component.html',
  styleUrls: ['./stock-carousel.component.css'],
  standalone: true,
  imports: [
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
export class StockCarouselComponent implements OnInit {

  stocks: OptionStock[] = [];
  carouselStocks: OptionStock[] = [];

  carouselInterval: number = 2000;
  startIndex: number = 0;
  carouselItemCount: number = 5;
  carouselSubscription: Subscription | null = null;
  mobileDevice: boolean = false;

  constructor(private store: Store<AppState>, private deviceService: DeviceDetectorService) {
    this.mobileDevice = this.deviceService.isMobile();

    if (this.mobileDevice){
      this.carouselItemCount = 1;
    }

    this.store.select(selectStocksContainer).subscribe(value => {
      this.stocks = value.stocks;
      this.startCarousel();
    });
  }

  ngOnInit() {

  }

  startCarousel() {
    this.carouselSubscription = interval(5000).subscribe(val => this.loadCarouselItems());
  }

  loadCarouselItems() {
    this.carouselStocks = this.stocks.slice(this.startIndex, this.startIndex + this.carouselItemCount);
    this.startIndex = this.startIndex + 1;
    if (this.startIndex >= this.stocks.length){
      this.startIndex = 0;
    }
  }
}
