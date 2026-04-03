import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnPushExample } from './on-push-example';

describe('OnPushExample', () => {
  let component: OnPushExample;
  let fixture: ComponentFixture<OnPushExample>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnPushExample],
    }).compileComponents();

    fixture = TestBed.createComponent(OnPushExample);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
