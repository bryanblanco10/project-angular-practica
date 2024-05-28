import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqModalComponent } from './faq-modal.component';
import { FaqComponent } from '../faq.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { By } from '@angular/platform-browser';

describe('FaqModalComponent', () => {
  let component: FaqModalComponent;
  let fixture: ComponentFixture<FaqModalComponent>;
  let activeModalSpy: jasmine.SpyObj<NgbActiveModal>;

  beforeEach(() => {
    const ngModalMock = jasmine.createSpyObj('NgbActiveModal', ['dismiss']);

    TestBed.configureTestingModule({
      imports: [FaqModalComponent, FaqComponent],
      providers: [
        { provide: NgbActiveModal, useValue: ngModalMock  }
      ],
    });

    fixture = TestBed.createComponent(FaqModalComponent);
    component = fixture.componentInstance;
    activeModalSpy = TestBed.inject(NgbActiveModal) as jasmine.SpyObj<NgbActiveModal>;
    fixture.detectChanges();
  });

  it('should create FaqModalComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should call dismiss method of _activeModal when dismiss is called', () => {
    component.dismiss();
    expect(activeModalSpy.dismiss).toHaveBeenCalled();
  });

  it('should call dismiss method when clicked on close button', () => {
    spyOn(component, 'dismiss');
    const closeButton = fixture.debugElement.nativeElement.querySelector('.modal-header button');
    closeButton.click();
    expect(component.dismiss).toHaveBeenCalled();
  });

  it('should call dismiss method when clicked on CERRAR button', () => {
    spyOn(component, 'dismiss');
    const closeButton = fixture.debugElement.nativeElement.querySelector('.modal-footer .btn');
    closeButton.click();
    expect(component.dismiss).toHaveBeenCalled();
  });

  it('should pass hasBackground input to FaqComponent', () => {
    const faqComponent = fixture.debugElement.query(By.directive(FaqComponent)).componentInstance;
    expect(faqComponent.hasBackground).toBe(false);
  });

});
