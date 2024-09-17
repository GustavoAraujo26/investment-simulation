import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.css'],
  standalone: true,
  imports: [
    MatTooltipModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class TableActionsComponent implements OnInit {

  @Input() identifier!: string;

  @Output() onEdit: EventEmitter<string> = new EventEmitter();
  @Output() onDelete: EventEmitter<string> = new EventEmitter();

  @Input() editTooltip!: string;
  @Input() deleteTooltip!: string;

  constructor() { }

  ngOnInit() {
  }

  editItem() {
    this.onEdit.emit(this.identifier);
  }

  deleteItem() {
    this.onDelete.emit(this.identifier);
  }
}
