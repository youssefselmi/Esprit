import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UPWEBComponent } from './upweb.component';

describe('UPWEBComponent', () => {
  let component: UPWEBComponent;
  let fixture: ComponentFixture<UPWEBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UPWEBComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UPWEBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
