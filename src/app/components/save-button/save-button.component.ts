import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-save-button',
  templateUrl: './save-button.component.html',
  styleUrls: ['./save-button.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ]
})
export class SaveButtonComponent implements OnInit {

  @Output() onSave: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  saving() {
    this.onSave.emit();
  }
}
