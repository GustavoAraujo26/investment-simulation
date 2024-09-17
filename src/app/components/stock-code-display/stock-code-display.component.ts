import { Component, Input, OnInit } from '@angular/core';
import {MatListModule} from '@angular/material/list';

@Component({
  selector: 'app-stock-code-display',
  templateUrl: './stock-code-display.component.html',
  styleUrls: ['./stock-code-display.component.css'],
  standalone: true,
  imports: [
    MatListModule
  ]
})
export class StockCodeDisplayComponent implements OnInit {

  @Input() logo!: string;
  @Input() code!: string;
  @Input() name!: string;
  @Input() logoHeight!: string;

  constructor() { }

  ngOnInit() {
  }

}
