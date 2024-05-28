import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
const TEXT = 'text';
const PASSWORD = 'password';
@Component({
  selector: 'app-password-plus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-plus.component.html',
  styleUrls: ['./password-plus.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordPlusComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordPlusComponent implements ControlValueAccessor {

  @Input() placeholder = '';
  @Output() keyUpPassword = new EventEmitter<string>();

  isFieldTextType = false;
  value = '';

  private onChange: (value: string) => void = () => {
    // This function will be provided by Angular's forms API.
  };
  private onTouched: () => void = () => {
    // This function will be provided by Angular's forms API.
  };

  get fieldTypePassword(): string {
    return this.isFieldTextType ? TEXT : PASSWORD;
  }

  toggleTypeInput(): void {
    this.isFieldTextType = !this.isFieldTextType;
  }

  writeValue(value: string): void {
    if (value !== this.value) {
      this.value = value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  handleInputInteraction(): void {
    this.onTouched();
  }
  
  updateValue(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.value = value;
    this.onChange(value);
    this.onTouched();
    this.keyUpPassword.emit(value);
  }

}
