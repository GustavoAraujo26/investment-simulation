import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
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
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import Swal from 'sweetalert2';
import { selectStocksContainer } from '../../state/stocks-container/stocks-container.selector';
import { loadStocksContainer } from '../../state/stocks-container/stocks-container.actions';
import { Wallet } from '../../models/wallet/wallet';
import { v4 as uuidv4 } from 'uuid';
import { saveWallet } from '../../state/wallets/wallets.actions';

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
    TableActionsComponent,
    CurrencyMaskModule,
    NgxMaskDirective
  ],
  standalone: true,
  providers: [
    provideNgxMask()
  ]
})
export class WalletFormComponent implements AfterViewInit {
  displayedColumns = ['code', 'percentage', 'actions'];
  dataSource: MatTableDataSource<WalletStock>;
  allStocks: OptionStock[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isEdition: boolean = false;
  id: string | null = null;
  title: string = '';
  selectedWalletStock: WalletStock | null = null;
  stockPrice: number | null = null;

  wallet: Wallet = {
    id: uuidv4(),
    title: '',
    observation: '',
    active: true,
    stocks: []
  };

  constructor(private route: ActivatedRoute, private store: Store<AppState>,
    public dialog: MatDialog, private router: Router
  ) {
    this.getCurrentId();
    this.store.dispatch(addTitle({ currentTitle: this.title }));
    this.dataSource = new MatTableDataSource();
  }

  ngAfterViewInit() {
    this.store.select(selectStocksContainer).subscribe(value => this.allStocks = value.stocks);
    this.store.dispatch(loadStocksContainer());
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
        this.selectedWalletStock = {
          code: result.code,
          name: result.name,
          logo: result.logo,
          type: result.type,
          percentage: null
        };
        this.stockPrice = result.price;
      }
    });
  }

  clearSelectedStock() {
    this.selectedWalletStock = null;
    this.stockPrice = null;
  }

  onSaveWallet() {
    const stocks = this.getStocksFromDataSource();
    this.wallet.stocks = stocks;

    if (!this.validateWallet(this.wallet))
      return;

    this.store.dispatch(saveWallet({ wallet: this.wallet }));

    Swal.fire({
      icon: 'success',
      title: 'Salvando a carteira',
      text: 'Carteira salva com sucesso!'
    });

    this.router.navigate(['/wallets/dashboard']);
  }

  addSelectedStock() {
    if (this.selectedWalletStock!.percentage !== null && this.selectedWalletStock!.percentage !== undefined){
      this.selectedWalletStock!.percentage = +this.selectedWalletStock!.percentage!;
    }

    if (!this.validateSelectedStock())
      return;

    this.pushStock();
    this.clearSelectedStock();
  }

  editSelectedStock(code: string) {
    const stocks = this.getStocksFromDataSource();

    var selectedStock = stocks.find(x => x.code === code);
    if (selectedStock === null || selectedStock === undefined){
      this.showValidationModal('Edição de ativo', `Ativo ${code} não encontrado na lista!`);
      return;
    }

    this.selectedWalletStock = {
      code: selectedStock.code,
      name: selectedStock.name,
      logo: selectedStock.logo,
      type: selectedStock.type,
      percentage: selectedStock.percentage
    };

    this.loadStockPriceEdition(selectedStock.code);
  }

  deleteSelectedStock(code: string) {
    const stocks = this.getStocksFromDataSource();

    var selectedStock = stocks.find(x => x.code === code);
    if (selectedStock === null || selectedStock === undefined){
      this.showValidationModal('Deleção de ativo', `Ativo ${code} não encontrado na lista!`);
      return;
    }

    stocks.splice(stocks.indexOf(selectedStock!), 1);
    this.updateDataSourceStocks(stocks);
  }

  pushStock() {
    const data = this.getStocksFromDataSource();

    var stockIndex = this.checkStockInDataSource(this.selectedWalletStock!.code);
    if (stockIndex === 0){
      data.push(this.selectedWalletStock!);
    }
    else{
      data[stockIndex] = {
        code: this.selectedWalletStock!.code,
        name: this.selectedWalletStock!.name,
        logo: this.selectedWalletStock!.logo,
        type: this.selectedWalletStock!.type,
        percentage: this.selectedWalletStock!.percentage
      };
    }

    this.updateDataSourceStocks(data);
  }

  getStocksFromDataSource(): WalletStock[] {
    return this.dataSource.data;
  }

  updateDataSourceStocks(stocks: WalletStock[]) {
    this.dataSource = new MatTableDataSource(stocks);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  checkStockInDataSource(code: string): number {
    const stocks = this.getStocksFromDataSource();

    var selectedStock = stocks.find(x => x.code === code);
    if (selectedStock === null || selectedStock === undefined)
      return 0;

    return stocks.indexOf(selectedStock);
  }

  validateSelectedStock(): boolean {
    const validationTitle: string = 'Validação de seleção de ativo';
    const stocks = this.getStocksFromDataSource();

    if (this.selectedWalletStock!.percentage === null || this.selectedWalletStock!.percentage === 0){
      this.showValidationModal(validationTitle,
        'A porcentagem de participação do ativo na carteira é de preenchimento obrigatório!');
      return false;
    }

    var totalPercentage = this.calculateStocksPercentage(stocks, this.selectedWalletStock);
    if (totalPercentage > 100){
      this.showValidationModal(validationTitle,
        'O somatório de porcentagem de participação dos ativos na carteira não pode ultrapassar 100%!');
        return false;
    }

    return true;
  }

  private showValidationModal(title: string, text: string) {
    Swal.fire({
      icon: 'warning',
      title: title,
      text: text
    });
  }

  private calculateStocksPercentage(stocks: WalletStock[], selectedStock: WalletStock | null): number {
    var totalPercentage: number = 0;
    var checkingCurrentStock: boolean = selectedStock !== null && selectedStock !== undefined;

    stocks.forEach(x => {
      if (!checkingCurrentStock){
        totalPercentage += x.percentage!
      }
      else if (x.code !== selectedStock!.code){
        totalPercentage += x.percentage!
      }
    });

    if (checkingCurrentStock){
      totalPercentage += selectedStock!.percentage!;
    }

    return totalPercentage;
  }

  private loadStockPriceEdition(code: string) {
    var currentStock = this.allStocks.find(x => x.code === code);
    if (currentStock === null || currentStock === undefined){
      this.showValidationModal('Carregamento de preço de ativo',
        `Não foi possível carregar o preço do ativo ${code}!`);
    }

    this.stockPrice = currentStock!.price;
  }

  private validateWallet(wallet: Wallet): boolean {
    var errorMessage: string = '';

    if (this.wallet.title === null || this.wallet.title === undefined || this.wallet.title === ''){
      errorMessage += 'É obrigatório informar o título da carteira! \n'
    }

    if (this.wallet.stocks === null || this.wallet.stocks === undefined || this.wallet.stocks.length === 0){
      errorMessage += 'É obrigatório informar os ativos que fazem parte da carteira! \n';
    }

    var totalPercentage = this.calculateStocksPercentage(wallet.stocks, null);
    if (totalPercentage !== 100){
      errorMessage += 'O somatório das porcentagens de participação dos ativos precisa ser igual a 100%! \n';
    }

    if (errorMessage !== ''){
      this.showValidationModal('Validação de carteira', errorMessage);
      return false;
    }

    return true;
  }
}
