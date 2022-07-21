import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloppementbackendComponent } from './developpementbackend.component';

describe('DeveloppementbackendComponent', () => {
  let component: DeveloppementbackendComponent;
  let fixture: ComponentFixture<DeveloppementbackendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloppementbackendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloppementbackendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
