import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WalletDashboardComponent } from './pages/wallet-dashboard/wallet-dashboard.component';
import { WalletFormComponent } from './pages/wallet-form/wallet-form.component';
import { SimulationComponent } from './pages/simulation/simulation.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'wallets/dashboard', component: WalletDashboardComponent },
  { path: 'wallets/create', component: WalletFormComponent },
  { path: 'wallets/edit/:id', component: WalletFormComponent },
  { path: 'investment/simulation/:id', component: SimulationComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
