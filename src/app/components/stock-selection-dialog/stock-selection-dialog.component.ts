import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { OptionStock } from '../../models/option-stock';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {CurrencyPipe} from '@angular/common';

const optionStocks: OptionStock[] = [
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

@Component({
  selector: 'app-stock-selection-dialog',
  templateUrl: './stock-selection-dialog.component.html',
  styleUrls: ['./stock-selection-dialog.component.css'],
  standalone: true,
  imports: [
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule,
    CurrencyPipe
  ]
})
export class StockSelectionDialogComponent implements AfterViewInit {

  displayedColumns: string[] = [ 'logo', 'code', 'name', 'price', 'selection' ];
  dataSource: MatTableDataSource<OptionStock>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<StockSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ){
    this.dataSource = new MatTableDataSource(optionStocks);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectStock(stock: OptionStock) {
    this.dialogRef.close(stock);
  }
}
