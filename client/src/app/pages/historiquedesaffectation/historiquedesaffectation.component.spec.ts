import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriquedesaffectationComponent } from './historiquedesaffectation.component';

describe('HistoriquedesaffectationComponent', () => {
  let component: HistoriquedesaffectationComponent;
  let fixture: ComponentFixture<HistoriquedesaffectationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoriquedesaffectationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoriquedesaffectationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
