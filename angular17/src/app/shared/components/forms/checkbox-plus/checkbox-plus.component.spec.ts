import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CheckboxPlusComponent } from './checkbox-plus.component';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

describe('CheckboxPlusComponent', () => {
  let component: CheckboxPlusComponent;
  let fixture: ComponentFixture<CheckboxPlusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxPlusComponent, FormsModule, ReactiveFormsModule],
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: CheckboxPlusComponent,
          multi: true,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxPlusComponent);
    component = fixture.componentInstance;
  });

  describe('#Initialization', () => {
    it('should create CheckboxPlusComponent', () => {
      expect(component).toBeTruthy();
    });

    it('should have an initial state of undefined for the checkbox', () => {
      expect(component.state).toBeUndefined();
    });
  });

  describe('#Inputs', () => {
    it('should set _id and _label correctly when label input is provided', () => {
      component.label = 'Test Label';
      fixture.detectChanges();
      expect(component.id).toBe('testlabel'); // Assuming normalizeText works this way
      expect(component.label).toBe('Test Label');
    });
  });

  describe('#Behavior events', () => {
    it('should toggle its state when clicked', () => {
      fixture.detectChanges();
      /*
        debugElement: Acceso a la raíz del arbol de nodos de deupración (representación de Angular de los elementos y componentes de la vista).
        .query(By.css('input')): query es un método que busca un elemento dentro de debugElement con cierto criterio
        En este caso, está buscando el primer elemento input
      */
      const inputElem = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      inputElem.click();

      expect(component.state).toBe(true);
    });

    it('should call onChange when state is toggled', () => {
      spyOn(component, 'onChange');

      fixture.detectChanges();

      const inputElem = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      inputElem.click();

      expect(component.onChange).toHaveBeenCalledWith(true);
    });
  });

  describe('#Behavior styles', () => {
    it('should set label correctly', () => {
      component.label = 'Test Label';
      fixture.detectChanges();

      const labelElem = fixture.debugElement.query(
        By.css('.label-text')
      ).nativeElement;

      expect(labelElem.textContent).toContain('Test Label');
    });

    it('should add the correct CSS class based on classType input', () => {
      component.classType = 'testClass';
      fixture.detectChanges();
      const checkboxElem = fixture.debugElement.query(
        By.css('.checkbox-custom')
      ).nativeElement;
      expect(checkboxElem.classList).toContain('testClass');
    });
  });

  describe('setDisabledState method', () => {
    it('should enable the component when called with false', () => {
      component.setDisabledState(false);
      fixture.detectChanges();
      const inputElem = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      expect(inputElem.disabled).toBeFalse();
    });

    it('should disable the component when called with true', () => {
      component.setDisabledState(true);
      fixture.detectChanges();
      const inputElem = fixture.debugElement.query(
        By.css('input')
      ).nativeElement;
      expect(inputElem.disabled).toBeTrue();
    });
  });

  describe('#ControlValueAccessor implementation', () => {
    it('should set state correctly with writeValue', () => {
      component.writeValue(true);
      expect(component.state).toBeTrue();
    });

    it('should call onTouched if the component was not previously touched', () => {
      const onTouchedSpy = spyOn(component, 'onTouched');
      component.markAsTouched();
      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('should not call onTouched if the component was previously touched', () => {
      const onTouchedSpy = spyOn(component, 'onTouched');
      component.touched = true;
      component.markAsTouched();
      expect(onTouchedSpy).not.toHaveBeenCalled();
    });

    it('should set touched property to true', () => {
      component.markAsTouched();
      expect(component.touched).toBeTrue();
    });
  });
});
