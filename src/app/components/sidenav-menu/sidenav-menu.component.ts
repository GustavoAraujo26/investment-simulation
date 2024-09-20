import { SidenavMenuItem } from './../../models/sidenav-menu-item';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { toogleLoading } from '../../state/loading/loading.actions';
import { selectWallets } from '../../state/wallets/wallets.selector';
import { loadWallets } from '../../state/wallets/wallets.actions';
import { Wallet } from '../../models/wallet/wallet';

@Component({
  selector: 'app-sidenav-menu',
  templateUrl: './sidenav-menu.component.html',
  styleUrls: ['./sidenav-menu.component.css'],
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    CommonModule
  ]
})
export class SidenavMenuComponent implements OnInit {
  menuItems: SidenavMenuItem[] = [];
  simulationSubMenuItens: SidenavMenuItem[] = [];
  simulationMenuId: string = uuidv4();

  constructor(private router: Router, private store: Store<AppState>) {
    this.store.select(selectWallets).subscribe(value => this.updateSimulationMenuItems(value));
    this.store.dispatch(loadWallets());
  }

  ngOnInit() {
    this.createMenus();
    this.checkActiveRoute();
  }

  createMenus() {
    this.menuItems.push({
      id: uuidv4(),
      text: 'Home',
      route: '/',
      subItems: [],
      isActive: false,
      icon: 'home'
    });

    this.menuItems.push({
      id: uuidv4(),
      text: 'Carteiras',
      route: '/wallets/dashboard',
      subItems: [],
      isActive: false,
      icon: 'dashboard'
    });

    this.menuItems.push({
      id: uuidv4(),
      text: 'Criar Carteira',
      route: '/wallets/create',
      subItems: [],
      isActive: false,
      icon: 'add'
    });
  }

  menuGo(menuId: string, index: number) {
    if (this.menuItems[index].subItems.length === 0){
      this.router.navigate([this.menuItems[index].route]);
      this.menuItems[index].isActive = true;
      this.deactivateMenus(menuId);
    }
    else{
      this.menuItems[index].isActive = !this.menuItems[index].isActive;
      this.deactivateMenus(menuId);
    }
  }

  deactivateMenus(menuId: string){
    this.menuItems.forEach(x => {
      if (x.id !== menuId && x.isActive){
        x.isActive = false;
      }
    });
  }

  checkActiveRoute(){
    var currentRoute = this.router.url;

    this.menuItems.forEach(x => {
      if (currentRoute.includes(x.route)){
        x.isActive = true;
      }

      x.subItems.forEach(y => {
        if (currentRoute.includes(y.route)){
          y.isActive = true;
        }
      });
    });
  }

  subMenuGo(subMenuId: string, menuId: string, subMenuIndex: number, menuIndex: number){
    this.router.navigate([this.menuItems[menuIndex].subItems[subMenuIndex].route]);
    this.menuItems[menuIndex].subItems[subMenuIndex].isActive = true;

    this.menuItems.forEach(x => {
      if (x.id === menuId){
        x.subItems.forEach(y => {
          if (y.id !== subMenuId){
            y.isActive = false;
          }
        });
        return;
      }

      x.subItems.forEach(y => y.isActive = false);
    });
  }

  updateSimulationMenuItems(wallets: Wallet[]) {
    this.removeSimulationMenu();

    var walletCount = wallets.length;
    if (walletCount === 0){
      this.simulationSubMenuItens = [];
      return;
    }

    var subMenus: SidenavMenuItem[] = [];

    wallets.forEach(x => {
      if (!x.active)
        return;

      subMenus.push({
        id: x.id,
        text: x.title,
        route: `/investment/simulation/${x.id}`,
        subItems: subMenus,
        isActive: false,
        icon: 'paid'
      });
    });

    if (subMenus.length === 0){
      this.simulationSubMenuItens = [];
      return;
    }

    this.simulationSubMenuItens = [...subMenus];

    this.manageSimulationMenu();
  }

  removeSimulationMenu() {
    var menusWithoutSimulation = this.menuItems.filter(x => x.id !== this.simulationMenuId);
    this.menuItems = [...menusWithoutSimulation];
    this.simulationSubMenuItens = [];
  }

  checkSimulationMenu(): boolean {
    return this.menuItems.filter(x => x.id === this.simulationMenuId).length > 0;
  }

  createSimulationMenu() {
    this.menuItems.push({
      id: this.simulationMenuId,
      text: 'Simular',
      route: '/investment/simulation',
      subItems: this.simulationSubMenuItens,
      isActive: false,
      icon: 'calculate'
    });
  }

  manageSimulationMenu() {
    if (this.simulationSubMenuItens.length !== 0){
      this.createSimulationMenu();
    }
    else{
      this.removeSimulationMenu();
    }
  }
}
