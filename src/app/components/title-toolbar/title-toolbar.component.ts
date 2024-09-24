import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-title-toolbar',
  templateUrl: './title-toolbar.component.html',
  styleUrls: ['./title-toolbar.component.css'],
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ]
})
export class TitleToolbarComponent implements OnInit {

  @Input() title!: string;
  @Output() toogleSideNav: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleSideNav() {
    this.toogleSideNav.emit();
  }
}
