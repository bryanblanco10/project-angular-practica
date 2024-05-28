import { TestBed } from '@angular/core/testing';

import { WindowRefService } from '../window-ref.service';

describe('WindowRefService', () => {
  let service: WindowRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WindowRefService);
  });

  it('should be created WindowRefService', () => {
    expect(service).toBeTruthy();
  });

  it('should return the global window object', () => {
    expect(service.nativeWindow).toBe(window);
  });

});
