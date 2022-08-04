import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationTableauCHComponent } from './affectation-tableau-ch.component';

describe('AffectationTableauCHComponent', () => {
  let component: AffectationTableauCHComponent;
  let fixture: ComponentFixture<AffectationTableauCHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffectationTableauCHComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AffectationTableauCHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
