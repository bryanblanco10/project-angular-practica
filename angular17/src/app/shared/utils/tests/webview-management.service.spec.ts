import { TestBed } from '@angular/core/testing';

import { WebviewManagementService } from '../webview-management.service';

describe('WebviewManagementService', () => {
  let service: WebviewManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebviewManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
