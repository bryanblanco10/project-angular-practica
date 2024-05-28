import { TestBed } from '@angular/core/testing';

import { DomManipulateService } from '../dom-manipulate.service';
import { Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

describe('DomManipulateService', () => {
  let service: DomManipulateService;
  let documentMock: Document;
  let rendererFactory: RendererFactory2;
  let rendererMock: jasmine.SpyObj<RendererFactory2>;
  let renderer2Mock: jasmine.SpyObj<Renderer2>;

  beforeEach(() => {

    renderer2Mock = jasmine.createSpyObj('Renderer2', ['addClass', 'removeClass']);
    rendererMock = jasmine.createSpyObj('RendererFactory2', ['createRenderer']);
    documentMock = jasmine.createSpyObj('Document', ['querySelectorAll']);

    (rendererMock.createRenderer as jasmine.Spy).and.returnValue(renderer2Mock);
    (documentMock.querySelectorAll as jasmine.Spy).and.returnValue({ length: 0 });

    TestBed.configureTestingModule({
      providers: [
        DomManipulateService,
        { provide: RendererFactory2, useValue: rendererMock },
        { provide: DOCUMENT, useValue: documentMock },
      ],
    });

    service = TestBed.inject(DomManipulateService);
    documentMock = TestBed.inject(DOCUMENT);
    rendererFactory = TestBed.inject(RendererFactory2);

  });

  it('should be created DomManipulateService', () => {
    expect(service).toBeTruthy();
  });

  describe('#addBodyClass', () => {
    it('should add class to body', () => {
      service.addBodyClass('test-class');
      expect(renderer2Mock.addClass).toHaveBeenCalledWith(documentMock.body, 'test-class');
    });
  });

  describe('#removeBodyClass', () => {
    it('should remove class from body', () => {
      service.removeBodyClass('test-class');
      expect(renderer2Mock.removeClass).toHaveBeenCalledWith(documentMock.body, 'test-class');
    });
  });

  describe('goToTop', () => {
    it('should scroll to top', () => {
      spyOn(window, 'scroll');
      service.goToTop();
      expect((window.scroll as any)).toHaveBeenCalledWith({ top: 0, left: 0, behavior: 'smooth' });
    });
  });

});
