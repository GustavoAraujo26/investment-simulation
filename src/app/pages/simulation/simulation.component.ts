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
import { combineLatest, combineLatestWith, map, switchMap } from 'rxjs';
import { WalletsService } from '../../services/wallets/wallets.service';
import { ActivatedRoute, EventType, Router } from '@angular/router';
import { OptionStock } from '../../models/option-stock';
import Swal from 'sweetalert2';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SimulationTableComponent } from '../../components/simulation-table/simulation-table.component';

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
    CurrencyMaskModule,
    SimulationTableComponent
  ]
})
export class SimulationComponent implements OnInit {

  id: string | null = null;
  simulationValue: number | null = null;
  totalCost: number | null = null;
  loadData: boolean = true;
  stocks: SimulationStock[] = [];

  constructor(private store: Store<AppState>, private walletService: WalletsService,
    private route: ActivatedRoute, private router: Router, private deviceService: DeviceDetectorService
  ) {
    this.router.events.subscribe((event) => {
      if (event.type !== EventType.NavigationEnd)
        return;

      this.id = this.route.snapshot.paramMap.get('id');
      if (this.checkCurrentRoute(this.id, event.url))
        this.initializeData();
    });
  }
  ngOnInit(): void {

  }

  initializeData(){
    this.loadData = true;
    this.simulationValue = null;
    this.totalCost = null;
    this.store.dispatch(loadWallets());
    this.store.dispatch(loadStocksContainer());

    this.store.select(selectWallets).pipe(
      combineLatestWith(
        this.store.select(selectStocksContainer)
      )
    ).subscribe(([wallets, stockContainer]) => {
      if (!this.loadData)
        return;

      this.stocks = this.walletService.convertToSimulation(this.id!, wallets, stockContainer.stocks);
      this.getWalletTitle(wallets);
      this.loadData = false;
    });
  }

  getWalletTitle(wallets: Wallet[]) {
    var currentWallet = wallets.find(x => x.id === this.id);
    if (currentWallet === null || currentWallet === undefined){
      this.store.dispatch(addTitle({ currentTitle: 'Simulador de investimentos' }));
      return;
    }

    var title = `Simulador de investimentos - ${currentWallet!.title}`;
    if (this.deviceService.isMobile())
      title = currentWallet!.title;

    this.store.dispatch(addTitle({ currentTitle: title }));
  }

  calculate() {
    if (!this.validateSimulationValue())
      return;

    this.stocks = this.walletService.calculateStocks(this.simulationValue!, this.stocks);
    this.totalCost = this.walletService.calculateTotalCost(this.stocks);
  }

  validateSimulationValue(): boolean {
    if (this.simulationValue === null || this.simulationValue === undefined || this.simulationValue === 0){
      Swal.fire({
        icon: 'warning',
        title: 'Validação da simulação',
        text: 'É obrigatório informar o valor a ser simulado!'
      });
      return false;
    }

    return true;
  }

  checkCurrentRoute(id: string | null, url: string): boolean {
    return url.toLowerCase().includes(`/investment/simulation/${id}`);
  }
}
