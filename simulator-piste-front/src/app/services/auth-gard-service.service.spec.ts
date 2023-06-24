import { TestBed } from '@angular/core/testing';

import { AuthGardServiceService } from './auth-gard-service.service';

describe('AuthGardServiceService', () => {
  let service: AuthGardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
