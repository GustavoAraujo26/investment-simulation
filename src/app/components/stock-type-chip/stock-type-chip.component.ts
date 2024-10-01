import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-type-chip',
  templateUrl: './stock-type-chip.component.html',
  styleUrls: ['./stock-type-chip.component.css'],
  standalone: true,
  imports: [
    CommonModule
  ]
})
export class StockTypeChipComponent implements OnInit {

  @Input() type?: string;

  typeContainerLayoutClass: string = '';
  typeText: string = '';
  typeLetter: string = '';
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
      this.typeLetter = '';
      return;
    }

    if (this.type === 'stock'){
      this.typeContainerLayoutClass = 'mdl-chip__contact mdl-color--orange-900 mdl-color-text--white';
      this.typeShow = true;
      this.typeText = 'Ação';
      this.typeLetter = 'A';
      return;
    }

    if (this.type === 'bdr'){
      this.typeContainerLayoutClass = 'mdl-chip__contact mdl-color--cyan-600 mdl-color-text--white';
      this.typeShow = true;
      this.typeText = 'BDR';
      this.typeLetter = 'B';
      return;
    }

    if (this.type === 'fund'){
      this.typeContainerLayoutClass = 'mdl-chip__contact mdl-color--green-A700 mdl-color-text--white';
      this.typeShow = true;
      this.typeText = 'Fundo';
      this.typeLetter = 'F';
      return;
    }
  }
}
