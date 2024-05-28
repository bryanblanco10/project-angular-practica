import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { normalizeText } from '@helpers/text-utils.helper';

@Component({
  selector: 'app-checkbox-plus',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox-plus.component.html',
  styleUrls: ['./checkbox-plus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: CheckboxPlusComponent
    }
  ],
})
export class CheckboxPlusComponent implements ControlValueAccessor {

  @Input() classType!: string;
  @Input() set label(value: string) {
    if (value) {
      this._id = normalizeText(value);
      this._label = value;
    }
  }

  get label(): string {
    return this._label;
  }

  state!: boolean;
  touched = false;
  disabled = false;
  onChange = (_state: boolean) => {
    // This function will be provided by Angular's forms API.
  };
  onTouched = () => {
    // This function will be provided by Angular's forms API.
  };

  private _id!: string;
  private _label!: string;

  get id(): string {
    return this._id;
  }

  writeValue(state: boolean): void {
    this.state = state;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }

  toggleState(value: boolean): void {
    this.state = value;
    this.onChange(this.state);
    this.markAsTouched();
  }

}
