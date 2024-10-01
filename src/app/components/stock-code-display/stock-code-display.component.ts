import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatChipsModule} from '@angular/material/chips';
import { StockTypeChipComponent } from '../stock-type-chip/stock-type-chip.component';

@Component({
  selector: 'app-stock-code-display',
  templateUrl: './stock-code-display.component.html',
  styleUrls: ['./stock-code-display.component.css'],
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatTooltipModule,
    MatChipsModule,
    StockTypeChipComponent
  ]
})
export class StockCodeDisplayComponent implements OnInit {

  @Input() logo!: string;
  @Input() code!: string;
  @Input() name!: string;
  @Input() logoHeight!: string;
  @Input() type?: string;

  constructor() {

  }

  ngOnInit() {

  }
}
