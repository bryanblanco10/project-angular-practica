/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownPlus } from '@models/interfaces';
import { ClickOutsideDirective } from '@directives/click-outside.directive';
import { CheckElementIsVisibleDirective } from './directives/check-element-is-visible.directive';

@Component({
  selector: 'app-dropdown-plus',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective, CheckElementIsVisibleDirective],
  templateUrl: './dropdown-plus.component.html',
  styleUrls: ['./dropdown-plus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: DropdownPlusComponent,
    },
  ],
})
export class DropdownPlusComponent<T extends DropdownPlus> implements ControlValueAccessor {
  @Input() label!: string;
  @Input() options!: T[];

  @ContentChild('optionTemplate', { static: false })  optionTemplateRef!: TemplateRef<any> | null;

  showOptions = false;
  picked!: T | null;
  touched = false;
  classElementIsNotVisible = 'select-body-top';
  onChange = (_picked: T) => {
     // This function will be provided by Angular's forms API.
  };
  onTouched = () => {
     // This function will be provided by Angular's forms API.
  };

  writeValue(picked: T): void {
    this.picked = picked;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  toggleShowOptions(): void {
    this.showOptions = !this.showOptions;
  }

  closeOptions(): void {
    this.showOptions = false;
    this.onChange(this.picked as T);
    this.markAsTouched();
  }

  selectOption(option: T): void {
    this.picked = option;
    this.closeOptions();
  }

  private markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }
}
