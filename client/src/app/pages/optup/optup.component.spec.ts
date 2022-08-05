import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptupComponent } from './optup.component';

describe('OptupComponent', () => {
  let component: OptupComponent;
  let fixture: ComponentFixture<OptupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
