import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogaffectationComponent } from './dialogaffectation.component';

describe('DialogaffectationComponent', () => {
  let component: DialogaffectationComponent;
  let fixture: ComponentFixture<DialogaffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogaffectationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogaffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
