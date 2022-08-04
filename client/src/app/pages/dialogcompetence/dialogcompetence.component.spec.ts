import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogcompetenceComponent } from './dialogcompetence.component';

describe('DialogcompetenceComponent', () => {
  let component: DialogcompetenceComponent;
  let fixture: ComponentFixture<DialogcompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogcompetenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogcompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
