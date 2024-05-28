import { TestBed } from '@angular/core/testing';
import { environment as ENV } from '@environments/environment';
import { CountryService } from '../country.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  Country,
  Department,
  DialCode,
  District,
  State,
  StateSOA,
  ResponseSoaApi
} from '@models/interfaces';

describe('CountryService', () => {
  let service: CountryService;
  let httpMock: HttpTestingController;
  const api = `${ENV.webApi}/v2/country`;
  const soaApi = `${ENV.soaApiBaseUrl}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryService],
    });
    service = TestBed.inject(CountryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created CountryService', () => {
    expect(service).toBeTruthy();
  });

  describe('#getCountriesLite method', () => {
    it('should send a get request and return a Country[]', (done) => {
      const dummyResponse: Country[] = [
        {
          id: '1',
          code: 'CO',
          languageId: 0,
          name: 'Colombia',
        },
      ];

      service.getCountriesLite().subscribe((response) => {
        expect(response).toEqual(dummyResponse);
        done();
      });

      const req = httpMock.expectOne(`${api}/list/lite`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });
  });

  describe('#getStates method', () => {
    it('should send a get request and return a State[]', (done) => {
      const dummyResponse: State[] = [
        {
          id: '1',
          code: 'CA',
          nameEnglish: 'California',
          nameSpanish: 'California',
          countryId: 'us',
        },
      ];

      service.getStates('us').subscribe((response) => {
        expect(response.length).toBe(1);
        expect(response).toEqual(dummyResponse);
        done();
      });

      const req = httpMock.expectOne(`${api}/us/states?orderBy=nameEnglish`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });
  });

  describe('#getDepartments method', () => {
    it('should send a get request and return a Department[]', (done) => {
      const dummyResponse: Department[] = [
        {
          id: '1',
          code: 'CA',
          nameEnglish: 'California',
          nameSpanish: 'California',
          countryId: 'us',
          stateId: '1',
        },
      ];

      service.getDepartments('us').subscribe((response) => {
        expect(response.length).toBe(1);
        expect(response).toEqual(dummyResponse);
        done();
      });

      const req = httpMock.expectOne(
        `${api}/us/departments?orderBy=nameEnglish`
      );
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });
  });

  describe('#getDistricts method', () => {
    it('should send a get request and return a District[]', (done) => {
      const dummyResponse: District[] = [
        {
          id: '1',
          code: 'CA',
          nameEnglish: 'California',
          nameSpanish: 'California',
          countryId: 'us',
          stateId: '1',
          departmentId: '1',
        },
      ];

      service.getDistricts('1').subscribe((response) => {
        expect(response.length).toBe(1);
        expect(response).toEqual(dummyResponse);
        done();
      });

      const req = httpMock.expectOne(`${api}/1/districts?orderBy=nameEnglish`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });
  });

  describe('#getStateByCountry method', () => {
    it('should send a get request and return a ResponseSoaApi<StateSOA[]>', (done) => {
      const dummyResponse: ResponseSoaApi<StateSOA[]> = {
        success: true,
        errors: null,
        value: [
          {
            id: '1',
            value: 'California',
          },
        ],
      };

      service.getStateByCountry('1').subscribe((response) => {
        expect(response.value.length).toBe(1);
        expect(response).toEqual(dummyResponse);
        done();
      });

      const req = httpMock.expectOne(`${soaApi}Country/getStatesByCountry/1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });
  });

  describe('#getDialCodeByCountryId method', () => {
    it('should send a get request and return a ResponseSoaApi<DialCode>', (done) => {
      const dummyResponse: ResponseSoaApi<DialCode> = {
        success: true,
        errors: null,
        value: {
          dialCode: '+57',
          name: 'Colombia',
        },
      };

      service.getDialCodeByCountryId('1').subscribe((response) => {
        expect(response).toEqual(dummyResponse);
        done();
      });

      const req = httpMock.expectOne(`${soaApi}Country/getDialCode/1`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });
  });

  describe('#getDialCodes method', () => {
    it('should send a get request and return a ResponseSoaApi<DialCode[]>', (done) => {
      const dummyResponse: ResponseSoaApi<DialCode[]> = {
        success: true,
        errors: null,
        value: [
          {
            dialCode: '+57',
            name: 'Colombia',
          },
        ],
      };

      service.getDialCodes().subscribe((response) => {
        expect(response.value.length).toBe(1);
        expect(response).toEqual(dummyResponse);
        done();
      });

      const req = httpMock.expectOne(`${soaApi}Country/dialcodes/`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyResponse);
    });
  });
});
