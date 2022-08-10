import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogheuresupComponent } from './dialogheuresup.component';

describe('DialogheuresupComponent', () => {
  let component: DialogheuresupComponent;
  let fixture: ComponentFixture<DialogheuresupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogheuresupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogheuresupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
