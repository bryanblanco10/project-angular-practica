import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FeatureFlagService } from '../feature-flag.service';
import { FeatureFlagStatus } from '@models/interfaces';
import { environment as ENV } from '@environments/environment';

describe('FeatureFlagService', () => {
  let service: FeatureFlagService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FeatureFlagService]
    });
    service = TestBed.inject(FeatureFlagService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Asegurarse de que no hay peticiones pendientes
  });

  it('should retrieve all feature statuses', () => {
    const dummyFlags: FeatureFlagStatus[] = [
      { feature: 'Feature1', status: true },
      { feature: 'Feature2', status: false }
    ];

    service.getAllFeaturesStatus().subscribe(flags => {
      expect(flags.length).toBe(2);
      expect(flags).toEqual(dummyFlags);
    });

    const api = `${ENV.webApi}/v2/EnableFeatures`;
    const request = httpMock.expectOne(`${api}/GetAllFeaturesStatus/`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyFlags);

  });
});
