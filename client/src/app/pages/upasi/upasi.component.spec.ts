import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UPASIComponent } from './upasi.component';

describe('UPASIComponent', () => {
  let component: UPASIComponent;
  let fixture: ComponentFixture<UPASIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UPASIComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UPASIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
