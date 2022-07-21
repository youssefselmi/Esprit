import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MecatroniqueComponent } from './mecatronique.component';

describe('MecatroniqueComponent', () => {
  let component: MecatroniqueComponent;
  let fixture: ComponentFixture<MecatroniqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MecatroniqueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MecatroniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
