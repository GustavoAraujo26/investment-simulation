import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BrapiResponse } from '../../models/brapi/brapi-response';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { saveResponse } from '../../state/brapi-response/brapi-response.actions';
import { BrapiStockResponse } from '../../models/brapi/brapi-stock-response';
import { toogleLoading } from '../../state/loading/loading.actions';
import { DatePipe } from '@angular/common';

const storageKey: string = 'brapi-response';

@Injectable({
  providedIn: 'root'
})
export class BrapiStockLoadingService {

  constructor(private http: HttpClient, private store: Store<AppState>, private datePipe: DatePipe) {

  }

  private getStocks(): Observable<BrapiStockResponse> {
    var url = `${environment.brapiApiUrl}quote/list?token=${environment.brapiApiToken}`;

    return this.http.get<BrapiStockResponse>(url);
  }

  loadStocks() {
    this.store.dispatch(toogleLoading({ show: true }));

    var validPeriod = this.loadPeriodIdentifier();

    var storageItem = localStorage.getItem(storageKey);
    if (storageItem !== null && storageItem !== ''){
      console.log(storageItem);
      var currentResponse = JSON.parse(storageItem) as BrapiResponse;

      if (currentResponse.period === validPeriod){
        this.store.dispatch(saveResponse({ response: currentResponse }));
        this.store.dispatch(toogleLoading({ show: false }));
        return;
      }
    }

    this.getStocks().subscribe(httpResponse => {
      let response: BrapiResponse = {
        period: validPeriod!,
        response: httpResponse
      };

      var json = JSON.stringify(response);
      localStorage.setItem(storageKey, json);
      this.store.dispatch(saveResponse({ response: response }));
      this.store.dispatch(toogleLoading({ show: false }));
      console.log(json);
    });
  }

  private loadPeriodIdentifier() {
    var now = new Date();

    return this.datePipe.transform(now, 'yyyy-MM-dd');
  }
}
