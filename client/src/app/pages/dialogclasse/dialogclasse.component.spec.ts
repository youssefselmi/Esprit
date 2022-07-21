import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogclasseComponent } from './dialogclasse.component';

describe('DialogclasseComponent', () => {
  let component: DialogclasseComponent;
  let fixture: ComponentFixture<DialogclasseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogclasseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogclasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
