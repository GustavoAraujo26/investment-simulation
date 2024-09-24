import { Component, ElementRef, ViewChild } from '@angular/core';
import { EventType, Router, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
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
import { StocksContainerService } from './services/stocks-container/stocks-container.service';
import { TitleToolbarComponent } from './components/title-toolbar/title-toolbar.component';

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
    NgxLoadingModule,
    TitleToolbarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('sidenav', {static: false}) sidenav!: MatSidenav;

  sidenavOpened: boolean = false;
  public title: string = 'Simulador de Investimentos';

  public isLoading: boolean = false;

  constructor(private deviceService: DeviceDetectorService, private store: Store<AppState>,
    private stocksContainerService: StocksContainerService, private router: Router
  ) {
    this.store.select(selectTitle).subscribe(value => {
      this.title = value;
    });

    this.store.select(selectLoading).subscribe(value => this.isLoading = value);
    this.store.dispatch(loadLoading());

    this.stocksContainerService.loadStocks();
  }

  ngOnInit() {
    this.sidenavOpened = this.deviceService.isDesktop();

    this.router.events.subscribe((event) => {
      if (event.type !== EventType.NavigationEnd)
        return;

      if (this.sidenav.opened && !this.deviceService.isDesktop())
        this.sidenav.toggle();
    });
  }

  toggleMenu() {
    this.sidenav.toggle();
  }
}
