import { CommonModule, CurrencyPipe } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { StockCodeDisplayComponent } from '../stock-code-display/stock-code-display.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { SimulationStock } from '../../models/simulation/simulation-stock';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatIconModule } from '@angular/material/icon';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { StockTypeChipComponent } from '../stock-type-chip/stock-type-chip.component';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-simulation-table',
  templateUrl: './simulation-table.component.html',
  styleUrls: ['./simulation-table.component.css'],
  standalone: true,
  imports: [
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    CommonModule,
    CurrencyPipe,
    FormsModule,
    StockCodeDisplayComponent,
    CurrencyMaskModule,
    MatIconModule,
    StockTypeChipComponent,
    MatExpansionModule
  ],
})
export class SimulationTableComponent implements OnChanges {

  @Input() stocks: SimulationStock[] = [];
  @Input() walletId: string | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns = ['stock', 'price', 'percentage', 'quantity'];
  dataSource: MatTableDataSource<SimulationStock> = new MatTableDataSource();
  obs: Observable<SimulationStock[]> | null = null;

  isMobile: boolean = false;

  constructor(private deviceService: DeviceDetectorService, private cd: ChangeDetectorRef) {
    this.isMobile = deviceService.isMobile();
    if (!this.isMobile){
      this.updateDataSource(this.stocks);
    }
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes['walletId'] !== null && changes['walletId'] !== undefined && changes['walletId'].previousValue !== this.walletId){
      this.updateDataSource(this.stocks);
      return;
    }

    this.dataSource.data.forEach(x => {
      var currentStock = this.stocks.find(y => y.stock.code === x.stock.code);
      if (currentStock === null || currentStock === undefined)
        return;

      x.quantity = currentStock.quantity;
    });
  }

  ngAfterViewInit() {
    if (this.isMobile){
      this.dataSource.paginator = this.paginator;
      this.cd.detectChanges();
    }
  }

  updateDataSource(stocks: SimulationStock[]) {
    this.dataSource = new MatTableDataSource(stocks);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    if (this.isMobile){
      this.obs = this.dataSource.connect();
    }
  }
}
