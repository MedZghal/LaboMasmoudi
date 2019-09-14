import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDsPatientModalComponent } from './add-ds-patient-modal.component';

describe('AddDsPatientModalComponent', () => {
  let component: AddDsPatientModalComponent;
  let fixture: ComponentFixture<AddDsPatientModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDsPatientModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDsPatientModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
