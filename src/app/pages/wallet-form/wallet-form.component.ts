import { Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { addTitle } from '../../state/title/title.actions';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.css'],
  imports: [
    MatGridListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSlideToggleModule
  ],
  standalone: true
})
export class WalletFormComponent implements OnInit {

  isEdition: boolean = false;
  id: string | null = null;
  title: string = '';

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {
    this.getCurrentId();
    this.store.dispatch(addTitle({ currentTitle: this.title }));
  }

  ngOnInit() {
  }

  getCurrentId(){
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id === null || this.id === undefined || this.id === ''){
      this.isEdition = false;
      this.title = 'Criação de carteira de investimentos';
    }
    else{
      this.isEdition = true;
      this.title = 'Edição de carteira de investimentos';
    }
  }

}
