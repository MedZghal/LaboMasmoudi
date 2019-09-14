import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RowContentComponent } from './row-content.component';

describe('RowContentComponent', () => {
  let component: RowContentComponent;
  let fixture: ComponentFixture<RowContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RowContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RowContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
