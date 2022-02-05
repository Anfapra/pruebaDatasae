import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayMontoComponent } from './display-monto.component';

describe('DisplayMontoComponent', () => {
  let component: DisplayMontoComponent;
  let fixture: ComponentFixture<DisplayMontoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayMontoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayMontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
