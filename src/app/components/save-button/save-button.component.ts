import { CommonModule, Location } from '@angular/common';
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
    MatIconModule,
    CommonModule
  ]
})
export class SaveButtonComponent implements OnInit {

  @Output() onSave: EventEmitter<void> = new EventEmitter();

  constructor(private location: Location) { }

  ngOnInit() {
  }

  saving() {
    this.onSave.emit();
  }

  goBack() {
    this.location.back();
  }
}
