/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { StockTypeChipComponent } from './stock-type-chip.component';

describe('StockTypeChipComponent', () => {
  let component: StockTypeChipComponent;
  let fixture: ComponentFixture<StockTypeChipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTypeChipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTypeChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
