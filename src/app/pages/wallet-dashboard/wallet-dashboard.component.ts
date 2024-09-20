import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { addTitle } from '../../state/title/title.actions';
import { Wallet } from '../../models/wallet/wallet';
import { v4 as uuidv4 } from 'uuid';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TableActionsComponent } from '../../components/table-actions/table-actions.component';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { selectWallets } from '../../state/wallets/wallets.selector';
import { changeWalletStatus, deleteWallet, loadWallets, saveWallet } from '../../state/wallets/wallets.actions';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

const ELEMENT_DATA: Wallet[] =[
  {
    id: uuidv4(),
    title: 'Wallet 1',
    observation: 'Test',
    active: true,
    stocks: []
  },
  {
    id: uuidv4(),
    title: 'Wallet 2',
    observation: 'Test',
    active: true,
    stocks: []
  },
  {
    id: uuidv4(),
    title: 'Wallet 3',
    observation: 'Test',
    active: true,
    stocks: []
  },
  {
    id: uuidv4(),
    title: 'Wallet 4',
    observation: 'Test',
    active: true,
    stocks: []
  },
  {
    id: uuidv4(),
    title: 'Wallet 5',
    observation: 'Test',
    active: true,
    stocks: []
  },
  {
    id: uuidv4(),
    title: 'Wallet 1',
    observation: 'Test',
    active: true,
    stocks: []
  },
  {
    id: uuidv4(),
    title: 'Wallet 2',
    observation: 'Test',
    active: true,
    stocks: []
  },
  {
    id: uuidv4(),
    title: 'Wallet 3',
    observation: 'Test',
    active: true,
    stocks: []
  },
  {
    id: uuidv4(),
    title: 'Wallet 4',
    observation: 'Test',
    active: true,
    stocks: []
  },
  {
    id: uuidv4(),
    title: 'Wallet 5',
    observation: 'Test',
    active: true,
    stocks: []
  },
  {
    id: uuidv4(),
    title: 'Wallet 1',
    observation: 'Test',
    active: true,
    stocks: []
  },
  {
    id: uuidv4(),
    title: 'Wallet 2',
    observation: 'Test',
    active: true,
    stocks: []
  },
  {
    id: uuidv4(),
    title: 'Wallet 3',
    observation: 'Test',
    active: true,
    stocks: []
  },
  {
    id: uuidv4(),
    title: 'Wallet 4',
    observation: 'Test',
    active: true,
    stocks: []
  },
  {
    id: uuidv4(),
    title: 'Wallet 5',
    observation: 'Test',
    active: true,
    stocks: []
  },
];

@Component({
  selector: 'app-wallet-dashboard',
  templateUrl: './wallet-dashboard.component.html',
  styleUrls: ['./wallet-dashboard.component.css'],
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
  ]
})
export class WalletDashboardComponent implements AfterViewInit {
  displayedColumns = ["title", "observation", "active", "actions"];
  dataSource: MatTableDataSource<Wallet>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store<AppState>, private router: Router) {
    this.store.dispatch(addTitle({ currentTitle: 'Lista de carteiras de investimentos' }));
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.store.select(selectWallets).subscribe(value => this.updateDataSource(value));
    this.store.dispatch(loadWallets());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editWallet(id: string) {
    this.router.navigate([`/wallets/edit/${id}`]);
  }

  eraseWallet(wallet: Wallet) {
    Swal.fire({
      icon: 'question',
      title: 'Deleção de carteira',
      text: `Tem certeza que deseja apagar a carteira "${wallet.title}"?`,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed){
        this.store.dispatch(deleteWallet({ id: wallet.id }));
      }
    });
  }

  simulateWallet(id: string) {
    this.router.navigate([`/investment/simulation/${id}`]);
  }

  createWallet() {
    this.router.navigate(['/wallets/create']);
  }

  toogleWalletStatus(wallet: Wallet) {
    var actionMessage = wallet.active ? 'desativar' : 'ativar';
    var message = `Tem certeza que deseja ${actionMessage} a carteira ${wallet.title}?`;

    Swal.fire({
      icon: 'question',
      title: 'Alteração de status da carteira',
      text: message,
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não'
    }).then((result) => {
      if (result.isConfirmed){
        this.store.dispatch(changeWalletStatus({ id: wallet.id, active: !wallet.active }));
      }
    });
  }

  updateDataSource(stocks: Wallet[]) {
    this.dataSource = new MatTableDataSource(stocks);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
