import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatDividerModule } from '@angular/material/divider';
import { SidenavMenuComponent } from './components/sidenav-menu/sidenav-menu.component';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { selectTitle } from './state/title/title.selector';
import { loadTitle } from './state/title/title.actions';
import { Observable } from 'rxjs';
import { selectLoading } from './state/loading/loading.selector';
import { loadLoading } from './state/loading/loading.actions';
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    SidenavMenuComponent,
    NgxLoadingModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  sidenavOpened: boolean = true;
  public title$: Observable<string>;

  public isLoading: boolean = false;

  constructor(private deviceService: DeviceDetectorService, private store: Store<AppState>) {
    this.title$ = this.store.select(selectTitle);
    this.store.dispatch(loadTitle());

    this.store.select(selectLoading).subscribe(value => this.isLoading = value);
    this.store.dispatch(loadLoading());
  }

  ngOnInit() {
    this.sidenavOpened = this.deviceService.isDesktop();
  }
}
