import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloppementwebetmobileComponent } from './developpementwebetmobile.component';

describe('DeveloppementwebetmobileComponent', () => {
  let component: DeveloppementwebetmobileComponent;
  let fixture: ComponentFixture<DeveloppementwebetmobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloppementwebetmobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloppementwebetmobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
