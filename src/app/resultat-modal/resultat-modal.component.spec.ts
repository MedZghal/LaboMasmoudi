import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatModalComponent } from './resultat-modal.component';

describe('ResultatModalComponent', () => {
  let component: ResultatModalComponent;
  let fixture: ComponentFixture<ResultatModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultatModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
