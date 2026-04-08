import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservablesDemo } from './observables-demo';

describe('ObservablesDemo', () => {
  let component: ObservablesDemo;
  let fixture: ComponentFixture<ObservablesDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservablesDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(ObservablesDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
