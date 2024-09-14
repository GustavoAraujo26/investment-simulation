import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { State, Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { addTitle } from '../../state/title/title.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OptionStock } from '../../models/option-stock';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import {AsyncPipe, CommonModule} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { StockSelectionDialogComponent } from '../../components/stock-selection-dialog/stock-selection-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.css'],
  imports: [
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AsyncPipe,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  standalone: true
})
export class WalletFormComponent implements OnInit {

  isEdition: boolean = false;
  id: string | null = null;
  title: string = '';
  selectedStock: OptionStock | null = null;
  stockCtrl = new FormControl('');
  filteredStocks: Observable<OptionStock[]>;
  optionStocks: OptionStock[] = [
    {
      code: 'FNAM11',
      name: 'FINAM CI *',
      price: 0.46,
      logo: 'https://s3-symbol-logo.tradingview.com/amazonia-on-es--big.svg',
      sector: 'Teste',
      type: 'Ação'
    },
    {
      code: 'B3SA3',
      name: 'B3',
      price: 12.13,
      logo: 'https://s3-symbol-logo.tradingview.com/b3-on-nm--big.svg',
      sector: 'Teste',
      type: 'Ação'
    },
    {
      code: 'AZUL4',
      name: 'AZUL PN',
      price: 4.95,
      logo: 'https://s3-symbol-logo.tradingview.com/azul--big.svg',
      sector: 'Teste',
      type: 'Ação'
    },
    {
      code: 'CVCB3',
      name: 'CVC BRASIL',
      price: 2.08,
      logo: 'https://s3-symbol-logo.tradingview.com/cvc-brasil-on-nm--big.svg',
      sector: 'Teste',
      type: 'Ação'
    }
  ];

  constructor(private route: ActivatedRoute, private store: Store<AppState>,
    public dialog: MatDialog
  ) {
    this.getCurrentId();
    this.store.dispatch(addTitle({ currentTitle: this.title }));

    this.filteredStocks = this.stockCtrl.valueChanges.pipe(
      startWith(''),
      map(stock => (stock ? this._filteredStocks(stock) : this.optionStocks.slice()))
    );
  }

  ngOnInit() {

  }

  getCurrentId(){
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id === null || this.id === undefined || this.id === ''){
      this.isEdition = false;
      this.title = 'Criação de carteira de investimentos';
    }
    else{
      this.isEdition = true;
      this.title = 'Edição de carteira de investimentos';
    }
  }

  private _filteredStocks(value: string): OptionStock[] {
    const filterValue = value.toLowerCase();

    return this.optionStocks.filter(stock => stock.name.toLowerCase().includes(filterValue) ||
      stock.code.toLowerCase().includes(filterValue));
  }

  openStockSelectionDialog() {
    const dialogRef = this.dialog.open(StockSelectionDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.selectedStock = result;
    });
  }
}
