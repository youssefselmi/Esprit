import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogmoduleComponent } from './dialogmodule.component';

describe('DialogmoduleComponent', () => {
  let component: DialogmoduleComponent;
  let fixture: ComponentFixture<DialogmoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogmoduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogmoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
