import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemRegistration } from './item-registration';

describe('ItemRegistration', () => {
  let component: ItemRegistration;
  let fixture: ComponentFixture<ItemRegistration>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemRegistration],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemRegistration);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
