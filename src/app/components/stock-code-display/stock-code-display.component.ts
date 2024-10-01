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
  @Input() name?: string;
  @Input() logoHeight!: string;
  @Input() type?: string;

  imgTooltip: string = '';
  nameFilled: boolean = false;

  constructor() {

  }

  ngOnInit() {
    this.initializeVariables();
  }

  ngOnChanges() {
    this.initializeVariables();
  }

  initializeVariables() {
    this.nameFilled = this.checkName();
    if (this.nameFilled){
      this.imgTooltip = `${this.code} - ${this.name}`;
    }
    else{
      this.imgTooltip = this.code;
    }
  }

  checkName(): boolean {
    return this.name !== null && this.name !== undefined && this.name !== '';
  }
}
