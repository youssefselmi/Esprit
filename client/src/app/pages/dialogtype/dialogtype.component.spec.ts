import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogtypeComponent } from './dialogtype.component';

describe('DialogtypeComponent', () => {
  let component: DialogtypeComponent;
  let fixture: ComponentFixture<DialogtypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogtypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogtypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
