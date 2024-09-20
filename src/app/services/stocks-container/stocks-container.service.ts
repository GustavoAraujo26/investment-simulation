import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppState } from '../../state/app.state';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { BrapiStockResponse } from '../../models/brapi/brapi-stock-response';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { toogleLoading } from '../../state/loading/loading.actions';
import { StocksContainer } from '../../models/stocks-container';
import { OptionStock } from '../../models/option-stock';
import { saveStocksContainer } from '../../state/stocks-container/stocks-container.actions';

const STORAGEKEY: string = 'stocks-container';

@Injectable({
  providedIn: 'root'
})
export class StocksContainerService {

  constructor(private http: HttpClient, private store: Store<AppState>, private datePipe: DatePipe) {

  }

  private getStocks(): Observable<BrapiStockResponse> {
    var url = `${environment.brapiApiUrl}quote/list?token=${environment.brapiApiToken}`;

    return this.http.get<BrapiStockResponse>(url);
  }

  loadStocks() {
    this.store.dispatch(toogleLoading({ show: true }));

    var validPeriod = this.loadPeriodIdentifier();

    var storageItem = localStorage.getItem(STORAGEKEY);
    if (storageItem !== null && storageItem !== ''){
      console.log(storageItem);
      var currentResponse = JSON.parse(storageItem) as StocksContainer;

      if (currentResponse.period === validPeriod){
        this.store.dispatch(saveStocksContainer({ container: currentResponse }));
        this.store.dispatch(toogleLoading({ show: false }));
        return;
      }
    }

    this.getStocks().subscribe(httpResponse => {
      var stocks = httpResponse.stocks.map((value) => {
        let option: OptionStock = {
          code: value.stock,
          name: value.name,
          logo: value.logo,
          price: value.close,
          type: value.type,
          sector: value.sector
        };
        return option;
      });

      let response: StocksContainer = {
        period: validPeriod!,
        stocks: stocks
      };

      var json = JSON.stringify(response);
      localStorage.setItem(STORAGEKEY, json);
      this.store.dispatch(saveStocksContainer({ container: response }));
      this.store.dispatch(toogleLoading({ show: false }));
    });
  }

  private loadPeriodIdentifier() {
    var now = new Date();

    return this.datePipe.transform(now, 'yyyy-MM-dd');
  }

}
