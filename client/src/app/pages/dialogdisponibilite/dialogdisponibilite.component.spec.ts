import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogdisponibiliteComponent } from './dialogdisponibilite.component';

describe('DialogdisponibiliteComponent', () => {
  let component: DialogdisponibiliteComponent;
  let fixture: ComponentFixture<DialogdisponibiliteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogdisponibiliteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogdisponibiliteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
