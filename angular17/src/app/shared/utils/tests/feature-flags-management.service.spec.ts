import { TestBed } from '@angular/core/testing';

import { FeatureFlagsManagementService } from '../feature-flags-management.service';
import { FeatureFlagService } from '@services/feature-flag.service';
import { of } from 'rxjs';

describe('FeatureFlagsManagementService', () => {
  let service: FeatureFlagsManagementService;
  let mockFeatureFlagService: jasmine.SpyObj<FeatureFlagService>;

  beforeEach(() => {
    mockFeatureFlagService = jasmine.createSpyObj('FeatureFlagService', ['getAllFeaturesStatus']);
    TestBed.configureTestingModule({
      providers: [
        FeatureFlagsManagementService,
        { provide: FeatureFlagService, useValue: mockFeatureFlagService }
      ]
    });
    service = TestBed.inject(FeatureFlagsManagementService);
  });

  it('should be created FeatureFlagsManagementService', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch feature status', (done) => {
    const mockFeatureStatus = [{ feature: 'feature1', status: true }, { feature: 'feature2', status: false }];

    // Configura el servicio espía para devolver un observable simulado
    mockFeatureFlagService.getAllFeaturesStatus.and.returnValue(of(mockFeatureStatus));

    service.getAllFeaturesStatus().subscribe(flags => {
      expect(flags).toEqual(mockFeatureStatus);
      done();
    });
  });

  it('should return feature status', () => {
    const mockFeatureStatus = [{ feature: 'feature1', status: true }, { feature: 'feature2', status: false }];
    service['_featureStatus'] = mockFeatureStatus; // Accede al miembro privado para configurar el estado

    expect(service.checkFeatureOn('feature1')).toBe(true);
    expect(service.checkFeatureOn('feature2')).toBe(false);
    expect(service.checkFeatureOn('nonExistentFeature')).toBe(false);
  });

  it('should get and cache feature status', () => {
    const mockFeatureStatus = [{ feature: 'feature1', status: true }, { feature: 'feature2', status: false }];

    mockFeatureFlagService.getAllFeaturesStatus.and.returnValue(of(mockFeatureStatus));

    // Llama a featureStatus$ dos veces y verifica que los datos se almacenan en caché
    service.featureStatus$.subscribe();
    service.featureStatus$.subscribe(flags => {
      expect(flags).toEqual(mockFeatureStatus);
    });

    // Verifica que getAllFeaturesStatus solo se llama una vez
    expect(mockFeatureFlagService.getAllFeaturesStatus).toHaveBeenCalledTimes(1);
  });
});
