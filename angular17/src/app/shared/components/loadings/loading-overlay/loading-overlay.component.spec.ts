import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LoadingOverlayComponent } from './loading-overlay.component';
import { LoadingOverlayService } from '@utils/loading-overlay.service';

describe('LoadingOverlayComponent', () => {
  let component: LoadingOverlayComponent;
  let fixture: ComponentFixture<LoadingOverlayComponent>;
  let service: LoadingOverlayService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [LoadingOverlayComponent],
      providers: [LoadingOverlayService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingOverlayComponent);
    component = fixture.componentInstance;
    // Obtener una instancia del servicio
    service = TestBed.inject(LoadingOverlayService);
  });

  it('should create LoadingOverlayComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display the loading overlay when isLoading$ emits true', fakeAsync(() => {
    service.showLoadingOverlay();
    // Espera la detección de cambios asincrónica
    tick();
    fixture.detectChanges();

    const loadingElement = fixture.nativeElement.querySelector('#loading');
    expect(loadingElement).not.toBeNull();
  }));

  it('should not display the loading overlay when isLoading$ emits false', fakeAsync(() => {
    service.hideLoadingOverlay();

    tick();
    fixture.detectChanges();

    const loadingElement = fixture.nativeElement.querySelector('#loading');
    expect(loadingElement).toBeNull();
  }));

});
