import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnotherCounter } from './another-counter';

describe('AnotherCounter', () => {
  let component: AnotherCounter;
  let fixture: ComponentFixture<AnotherCounter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnotherCounter],
    }).compileComponents();

    fixture = TestBed.createComponent(AnotherCounter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
