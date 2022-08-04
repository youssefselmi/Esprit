import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogenseignantComponent } from './dialogenseignant.component';

describe('DialogenseignantComponent', () => {
  let component: DialogenseignantComponent;
  let fixture: ComponentFixture<DialogenseignantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogenseignantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogenseignantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
