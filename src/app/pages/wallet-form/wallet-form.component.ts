import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
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
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe, CommonModule} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { StockSelectionDialogComponent } from '../../components/stock-selection-dialog/stock-selection-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { WalletStock } from '../../models/wallet/wallet-stock';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {TooltipPosition, MatTooltipModule} from '@angular/material/tooltip';
import { StockCodeDisplayComponent } from '../../components/stock-code-display/stock-code-display.component';
import { MatListModule } from '@angular/material/list';
import { SaveButtonComponent } from '../../components/save-button/save-button.component';
import { TableActionsComponent } from '../../components/table-actions/table-actions.component';

const ELEMENT_DATA: WalletStock[] = [
  {
    code: 'MRSA3BF',
    name: 'MRS LOGISTICA',
    logo: 'https://s3-symbol-logo.tradingview.com/mrs-logistica--big.svg',
    percentage: 10
  },
  {
    code: 'GDBR34',
    name: 'GEN DYNAMICSDRN',
    logo: 'https://s3-symbol-logo.tradingview.com/general-dynamics--big.svg',
    percentage: 10
  },
  {
    code: 'BCPX39',
    name: 'GX COPPER MNDRE',
    logo: 'https://s3-symbol-logo.tradingview.com/global-x--big.svg',
    percentage: 10
  },
  {
    code: 'SHOP11',
    name: 'FII MULTSHOPCI',
    logo: 'https://brapi.dev/favicon.svg',
    percentage: 10
  },
  {
    code: 'P1NR34',
    name: 'PENTAIR PLC DRN',
    logo: 'https://s3-symbol-logo.tradingview.com/pentair--big.svg',
    percentage: 10
  },
  {
    code: 'MRSA3BF',
    name: 'MRS LOGISTICA',
    logo: 'https://s3-symbol-logo.tradingview.com/mrs-logistica--big.svg',
    percentage: 10
  },
  {
    code: 'MRSA3BF',
    name: 'MRS LOGISTICA',
    logo: 'https://s3-symbol-logo.tradingview.com/mrs-logistica--big.svg',
    percentage: 10
  },
  {
    code: 'MRSA3BF',
    name: 'MRS LOGISTICA',
    logo: 'https://s3-symbol-logo.tradingview.com/mrs-logistica--big.svg',
    percentage: 10
  },
  {
    code: 'MRSA3BF',
    name: 'MRS LOGISTICA',
    logo: 'https://s3-symbol-logo.tradingview.com/mrs-logistica--big.svg',
    percentage: 10
  },
  {
    code: 'MRSA3BF',
    name: 'MRS LOGISTICA',
    logo: 'https://s3-symbol-logo.tradingview.com/mrs-logistica--big.svg',
    percentage: 10
  },
];

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
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatTooltipModule,
    StockCodeDisplayComponent,
    SaveButtonComponent,
    TableActionsComponent
  ],
  standalone: true
})
export class WalletFormComponent implements AfterViewInit {
  displayedColumns = ['code', 'percentage', 'actions'];
  dataSource: MatTableDataSource<WalletStock>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isEdition: boolean = false;
  id: string | null = null;
  title: string = '';
  selectedStock: OptionStock | null = null;

  constructor(private route: ActivatedRoute, private store: Store<AppState>,
    public dialog: MatDialog
  ) {
    this.getCurrentId();
    this.store.dispatch(addTitle({ currentTitle: this.title }));
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  openStockSelectionDialog() {
    const dialogRef = this.dialog.open(StockSelectionDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== null && result !== undefined && result !== ''){
        this.selectedStock = result;
      }
    });
  }

  clearSelectedStock() {
    this.selectedStock = null;
  }

  onSaveWallet() {
    alert('Success');
  }

  editSelectedStock(code: string) {
    alert(code);
  }

  deleteSelectedStock(code: string) {
    alert(code);
  }
}
