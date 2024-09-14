import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrapiTextConversorService {

  constructor() { }

  convertStockTypeToPortugueseDescription(stockText: string | null): string {
    switch(stockText){
      case 'stock':
        return 'Ação';
      case 'fund':
        return 'Fundo';
      case 'bdr':
        return 'BDR';
      default:
        return 'Ação';
    }
  }

  convertAvailableSectorsToPortugueseDescription(sector: string | null): string {
    switch(sector){
      case 'Retail Trade':
        return 'Comércio Varejista';
      case 'Energy Minerals':
        return 'Mineráis Energéticos';
      case 'Health Services':
        return 'Serviços da Saúde';
      case 'Utilities':
        return 'Utilitários';
      case 'Finance':
        return 'Finanças';
      case 'Consumer Services':
        return 'Serviços ao consumidor';
      case 'Consumer Non-Durables':
        return 'Bens de consumo não duráveis';
      case 'Non-Energy Minerals':
        return 'Minerais não energéticos';
      case 'Commercial Services':
        return 'Serviços energéticos';
      case 'Distribution Services':
        return 'Serviços de distribuição';
      case 'Transportation':
        return 'Transportes';
      case 'Technology Services':
        return 'Serviços de tecnologia';
      case 'Process Industries':
        return 'Processos industriais';
      case 'Communications':
        return 'Comunicações';
      case 'Producer Manufacturing':
        return 'Fabricação do produtor';
      case 'Miscellaneous':
        return 'Variados';
      case 'Electronic Technology':
        return 'Tecnologia eletrônica';
      case 'Industrial Services':
        return 'Serviços industriais';
      case 'Health Technology':
        return 'Tecnologia em saúde';
      case 'Consumer Durables':
        return 'Bens de consumo duráveis';
      default:
        return '-';
    }
  }
}
