import { TestBed } from '@angular/core/testing';

import { GtmService } from '../gtm.service';
import { WindowRefService } from '../window-ref.service';

describe('GtmService', () => {
  let service: GtmService;
  let windowRefMock: { nativeWindow: { dataLayer?: unknown[] } };

  beforeEach(() => {
    windowRefMock = {
      nativeWindow: { dataLayer: [] }
    };
    TestBed.configureTestingModule({
      providers: [
        GtmService,
        { provide: WindowRefService, useValue: windowRefMock }
      ]
    });
    service = TestBed.inject(GtmService);
  });

  it('should be created GtmService', () => {
    expect(service).toBeTruthy();
  });

  it('should push data to dataLayer when sendDataToGTM is called', () => {
    const dummyData = { event: 'testEvent', data: 'testData' };

    service.sendDataToGTM(dummyData);

    expect(windowRefMock.nativeWindow.dataLayer?.length).toBe(1);
    expect(windowRefMock.nativeWindow.dataLayer?.[0]).toEqual(dummyData);
  });
});
