import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogupComponent } from './dialogup.component';

describe('DialogupComponent', () => {
  let component: DialogupComponent;
  let fixture: ComponentFixture<DialogupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
