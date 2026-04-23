import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupBusiness } from './setup-business';

describe('SetupBusiness', () => {
  let component: SetupBusiness;
  let fixture: ComponentFixture<SetupBusiness>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetupBusiness],
    }).compileComponents();

    fixture = TestBed.createComponent(SetupBusiness);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
