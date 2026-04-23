import { TestBed } from '@angular/core/testing';

import { SetupBusinessService } from './setup-business-service';

describe('SetupBusinessService', () => {
  let service: SetupBusinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetupBusinessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
