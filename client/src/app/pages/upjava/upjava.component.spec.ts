import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UPJAVAComponent } from './upjava.component';

describe('UPJAVAComponent', () => {
  let component: UPJAVAComponent;
  let fixture: ComponentFixture<UPJAVAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UPJAVAComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UPJAVAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
