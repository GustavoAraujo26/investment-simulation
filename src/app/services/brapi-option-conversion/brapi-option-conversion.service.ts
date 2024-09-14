import { Injectable } from '@angular/core';
import { BrapiTextConversorService } from '../brapi-text-conversion/brapi-text-conversor.service';
import { BrapiStock } from '../../models/brapi/brapi-stock';
import { OptionStock } from '../../models/option-stock';

@Injectable({
  providedIn: 'root'
})
export class BrapiOptionConversionService {

  constructor(private textConversionService: BrapiTextConversorService) { }

  convertToOptions(stocks: BrapiStock[]): OptionStock[] {
    var result: OptionStock[] = [];

    for(var i = 0; i <= stocks.length; i++){
      var current = stocks[i];

      result.push({
        code: current.stock,
        name: current.name,
        price: current.close,
        logo: current.logo,
        sector: this.textConversionService.convertAvailableSectorsToPortugueseDescription(current.sector),
        type: this.textConversionService.convertStockTypeToPortugueseDescription(current.type)
      });
    }

    return result;
  }
}
