import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeuresupComponent } from './heuresup.component';

describe('HeuresupComponent', () => {
  let component: HeuresupComponent;
  let fixture: ComponentFixture<HeuresupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeuresupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeuresupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
