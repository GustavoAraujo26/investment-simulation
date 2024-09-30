import { Component, OnInit } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { titleReducer } from '../../state/title/title.reducer';
import { AppState } from '../../state/app.state';
import { addTitle } from '../../state/title/title.actions';
import { StockCarouselComponent } from '../../components/stock-carousel/stock-carousel.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { StockCodeDisplayComponent } from '../../components/stock-code-display/stock-code-display.component';
import {MatStepperModule} from '@angular/material/stepper';
import {STEPPER_GLOBAL_OPTIONS, StepperOrientation} from '@angular/cdk/stepper';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ],
  standalone: true,
  imports: [
    StockCarouselComponent,
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    StockCodeDisplayComponent,
    MatDividerModule,
    MatProgressBarModule,
    MatStepperModule
  ]
})
export class HomeComponent implements OnInit {

  stepperOrientation: StepperOrientation = 'horizontal';

  constructor(private store: Store<AppState>, private deviceService: DeviceDetectorService) {
    if (deviceService.isMobile()){
      this.stepperOrientation = 'vertical';
    }

    this.store.dispatch(addTitle({ currentTitle: 'Home' }));
  }

  ngOnInit() {
  }

}
