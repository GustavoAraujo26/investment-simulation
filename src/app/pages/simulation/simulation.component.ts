import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { addTitle } from '../../state/title/title.actions';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TableActionsComponent } from '../../components/table-actions/table-actions.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { Wallet } from '../../models/wallet/wallet';
import { v4 as uuidv4 } from 'uuid';
import { FormsModule } from '@angular/forms';
import { StockCodeDisplayComponent } from '../../components/stock-code-display/stock-code-display.component';
import { SimulationStock } from '../../models/simulation/simulation-stock';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { selectStocksContainer } from '../../state/stocks-container/stocks-container.selector';
import { loadStocksContainer } from '../../state/stocks-container/stocks-container.actions';
import { loadWallets } from '../../state/wallets/wallets.actions';
import { selectWallets } from '../../state/wallets/wallets.selector';
import { combineLatest, combineLatestWith } from 'rxjs';
import { WalletsService } from '../../services/wallets/wallets.service';
import { ActivatedRoute } from '@angular/router';
import { OptionStock } from '../../models/option-stock';

const ELEMENT_DATA: SimulationStock[] = [
  {
    stock: {
      code: 'MRSA3BF',
      name: 'MRS LOGISTICA',
      logo: 'https://s3-symbol-logo.tradingview.com/mrs-logistica--big.svg',
      percentage: 20,
      type: 'stock'
    },
    price: 120.03,
    quantity: 74
  },
  {
    stock: {
      code: 'GDBR34',
      name: 'GEN DYNAMICSDRN',
      logo: 'https://s3-symbol-logo.tradingview.com/general-dynamics--big.svg',
      percentage: 20,
      type: 'stock'
    },
    price: 87.58,
    quantity: 12
  },
  {
    stock: {
      code: 'BCPX39',
      name: 'GX COPPER MNDRE',
      logo: 'https://s3-symbol-logo.tradingview.com/global-x--big.svg',
      percentage: 20,
      type: 'stock'
    },
    price: 65.74,
    quantity: 35
  },
  {
    stock: {
      code: 'SHOP11',
      name: 'FII MULTSHOPCI',
      logo: 'https://brapi.dev/favicon.svg',
      percentage: 20,
      type: 'stock'
    },
    price: 74.25,
    quantity: 17
  },
  {
    stock: {
      code: 'P1NR34',
      name: 'PENTAIR PLC DRN',
      logo: 'https://s3-symbol-logo.tradingview.com/pentair--big.svg',
      percentage: 20,
      type: 'stock'
    },
    price: 9.96,
    quantity: 15
  },
  {
    stock: {
      code: 'MRSA3BF',
      name: 'MRS LOGISTICA',
      logo: 'https://s3-symbol-logo.tradingview.com/mrs-logistica--big.svg',
      percentage: 20,
      type: 'stock'
    },
    price: 69.78,
    quantity: 5
  }
];

const WALLET: Wallet = {
  id: uuidv4(),
  title: 'Wallet 1',
  observation: 'Test',
  active: true,
  stocks: []
}

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    TableActionsComponent,
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    CurrencyPipe,
    FormsModule,
    StockCodeDisplayComponent,
    CurrencyMaskModule
  ]
})
export class SimulationComponent implements AfterViewInit {
  displayedColumns = ['stock', 'price', 'percentage', 'quantity'];
  dataSource: MatTableDataSource<SimulationStock> = new MatTableDataSource();

  id: string | null = null;
  simulationValue: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store<AppState>, private walletService: WalletsService,
    private route: ActivatedRoute
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.store.dispatch(loadWallets());
    this.store.dispatch(loadStocksContainer());

    this.store.select(selectWallets).pipe(
      combineLatestWith(
        this.store.select(selectStocksContainer)
      )
    ).subscribe(([wallets, stockContainer]) => {
      var simulationStocks = this.walletService.convertToSimulation(this.id!, wallets, stockContainer.stocks);
      this.updateDataSource(simulationStocks);
      this.getWalletTitle(wallets);
    });
  }

  updateDataSource(stocks: SimulationStock[]) {
    this.dataSource = new MatTableDataSource(stocks);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getWalletTitle(wallets: Wallet[]) {
    var currentWallet = wallets.find(x => x.id === this.id);
    if (currentWallet === null || currentWallet === undefined){
      this.store.dispatch(addTitle({ currentTitle: 'Simulador de investimentos' }));
    }

    this.store.dispatch(addTitle({ currentTitle: `Simulador de investimentos - ${currentWallet!.title}` }));
  }
}
