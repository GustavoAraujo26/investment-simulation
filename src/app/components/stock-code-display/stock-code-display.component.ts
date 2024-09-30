import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-stock-code-display',
  templateUrl: './stock-code-display.component.html',
  styleUrls: ['./stock-code-display.component.css'],
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    MatTooltipModule
  ]
})
export class StockCodeDisplayComponent implements OnInit {

  @Input() logo!: string;
  @Input() code!: string;
  @Input() name!: string;
  @Input() logoHeight!: string;
  @Input() type!: string;

  typeContainerLayoutClass: string = '';
  typeText: string = '';
  typeShow: boolean = true;

  constructor() {

  }

  ngOnInit() {
    this.pickTypeColor();
  }

  ngOnChanges() {
    this.pickTypeColor();
  }

  pickTypeColor() {
    if (this.type === null || this.type === undefined || this.type === ''){
      this.typeContainerLayoutClass = '';
      this.typeShow = false;
      this.typeText = '';
      return;
    }

    if (this.type === 'stock'){
      this.typeContainerLayoutClass = 'type-stock-bg type-badge';
      this.typeShow = true;
      this.typeText = 'Ação';
      return;
    }

    if (this.type === 'bdr'){
      this.typeContainerLayoutClass = 'type-bdr-bg type-badge';
      this.typeShow = true;
      this.typeText = 'BDR';
      return;
    }

    if (this.type === 'fund'){
      this.typeContainerLayoutClass = 'type-fund-bg type-badge';
      this.typeShow = true;
      this.typeText = 'Fundo';
      return;
    }
  }
}
