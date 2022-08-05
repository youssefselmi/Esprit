import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogaffectationTableauCHComponent } from './dialogaffectation-tableau-ch.component';

describe('DialogaffectationTableauCHComponent', () => {
  let component: DialogaffectationTableauCHComponent;
  let fixture: ComponentFixture<DialogaffectationTableauCHComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogaffectationTableauCHComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogaffectationTableauCHComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
