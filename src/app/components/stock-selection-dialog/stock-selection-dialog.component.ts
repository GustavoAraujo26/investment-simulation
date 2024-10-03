import { Component, OnInit, AfterViewInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { OptionStock } from '../../models/option-stock';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule, CurrencyPipe} from '@angular/common';
import { AppState } from '../../state/app.state';
import { Store } from '@ngrx/store';
import { selectStocksContainer } from '../../state/stocks-container/stocks-container.selector';
import { loadStocksContainer } from '../../state/stocks-container/stocks-container.actions';
import { Observable } from 'rxjs';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatExpansionModule } from '@angular/material/expansion';
import { StockCodeDisplayComponent } from '../stock-code-display/stock-code-display.component';

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
    CurrencyPipe,
    MatExpansionModule,
    StockCodeDisplayComponent,
    CommonModule
  ]
})
export class StockSelectionDialogComponent implements AfterViewInit {

  displayedColumns: string[] = [ 'logo', 'code', 'name', 'price', 'selection' ];
  dataSource: MatTableDataSource<OptionStock>;
  obs: Observable<OptionStock[]> | null = null;
  isMobile: boolean = false;
  step: number | null = null;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialogRef: MatDialogRef<StockSelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private store: Store<AppState>,
    private deviceService: DeviceDetectorService,
    private cd: ChangeDetectorRef
  ){
    this.dataSource = new MatTableDataSource();
    this.isMobile = deviceService.isMobile();
  }

  ngAfterViewInit() {
    this.store.select(selectStocksContainer).subscribe(value => {
      this.dataSource = new MatTableDataSource(value.stocks);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      if (this.isMobile){
        this.obs = this.dataSource.connect();
        this.cd.detectChanges();
      }
    });
    this.store.dispatch(loadStocksContainer());
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

  expandPanel(index: number) {
    this.step = index;
  }
}
