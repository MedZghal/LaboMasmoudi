import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrelevementDomicileComponent } from './prelevement-domicile.component';

describe('PrelevementDomicileComponent', () => {
  let component: PrelevementDomicileComponent;
  let fixture: ComponentFixture<PrelevementDomicileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrelevementDomicileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrelevementDomicileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
