import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoptupComponent } from './dialogoptup.component';

describe('DialogoptupComponent', () => {
  let component: DialogoptupComponent;
  let fixture: ComponentFixture<DialogoptupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogoptupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogoptupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
