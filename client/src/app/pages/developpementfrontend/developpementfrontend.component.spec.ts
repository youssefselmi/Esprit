import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloppementfrontendComponent } from './developpementfrontend.component';

describe('DeveloppementfrontendComponent', () => {
  let component: DeveloppementfrontendComponent;
  let fixture: ComponentFixture<DeveloppementfrontendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloppementfrontendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloppementfrontendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
