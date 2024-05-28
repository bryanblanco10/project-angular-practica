import { TestBed } from '@angular/core/testing';

import { LoadingOverlayService } from '../loading-overlay.service';

describe('LoadingOverlayService', () => {
  let service: LoadingOverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingOverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit false as the default value for isLoading$', (done) => {
    service.isLoading$.subscribe(isLoading => {
      expect(isLoading).toBe(false);
      done(); // Asegura que el suscriptor se ha completado.
    });
  });

  it('should emit true when showLoadingOverlay is called', (done) => {
    service.showLoadingOverlay();

    service.isLoading$.subscribe(isLoading => {
      expect(isLoading).toBe(true);
      done();
    });
  })

  it('should emit false when hideLoadingOverlay is called', (done) => {
    service.showLoadingOverlay();

    service.hideLoadingOverlay();

    service.isLoading$.subscribe(isLoading => {
      expect(isLoading).toBe(false);
      done();
    });
  })
});
