import { TestBed } from '@angular/core/testing';

import { WebRedirectService } from '../web-redirect.service';

describe('WebRedirectService', () => {
  let service: WebRedirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebRedirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
