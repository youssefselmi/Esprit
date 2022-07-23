import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowclassesComponent } from './showclasses.component';

describe('ShowclassesComponent', () => {
  let component: ShowclassesComponent;
  let fixture: ComponentFixture<ShowclassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowclassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowclassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
