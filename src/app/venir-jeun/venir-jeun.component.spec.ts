import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenirJeunComponent } from './venir-jeun.component';

describe('VenirJeunComponent', () => {
  let component: VenirJeunComponent;
  let fixture: ComponentFixture<VenirJeunComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenirJeunComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenirJeunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
