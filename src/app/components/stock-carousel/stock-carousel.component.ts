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

  carouselInterval: number = 1000;
  startIndex: number = 0;
  carouselItemCount: number = 5;
  carouselSubscription: Subscription | null = null;
  carouselIntervalStopped: boolean = false;
  mobileDevice: boolean = false;
  carouselFirstExecution: boolean = true;

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
    this.carouselSubscription = interval(this.carouselInterval).subscribe(val => {
      if (!this.carouselFirstExecution){
        this.startIndex = this.calculateIndex(this.startIndex, true);
      }

      this.loadCarouselItems(this.startIndex, this.carouselItemCount);
      this.carouselFirstExecution = false;
    });
  }

  loadCarouselItems(currentIndex: number, itemCount: number) {
    var itemsToGet = currentIndex + itemCount;

    var capturedStocks = this.stocks.slice(currentIndex, itemsToGet);
    if (capturedStocks.length < itemCount){
      var diff = itemCount - capturedStocks.length;

      for(var i = 0; i < diff; i++){
        capturedStocks.push(this.stocks[i]);
      }
    }

    this.carouselStocks = capturedStocks;
  }

  goToLeft() {
    if (!this.carouselSubscription!.closed){
      this.carouselSubscription?.unsubscribe();
    }

    this.startIndex = this.calculateIndex(this.startIndex, false);
    this.loadCarouselItems(this.startIndex, this.carouselItemCount);
  }

  gotToRight() {
    if (!this.carouselSubscription!.closed){
      this.carouselSubscription?.unsubscribe();
    }

    this.startIndex = this.calculateIndex(this.startIndex, true);
    this.loadCarouselItems(this.startIndex, this.carouselItemCount);
  }

  calculateIndex(currentIndex: number, moveFoward: boolean): number{
    var newIndex = 0;

    var lastStockIndex = this.stocks.length - 1;

    if (moveFoward && currentIndex < lastStockIndex){
      newIndex = currentIndex + 1;
    }
    else if (moveFoward && currentIndex === lastStockIndex){
      newIndex = 0;
    }
    else if (!moveFoward && currentIndex === 0){
      newIndex = lastStockIndex;
    }
    else if (!moveFoward && currentIndex > 0){
      newIndex = currentIndex - 1;
    }

    return newIndex;
  }
}
