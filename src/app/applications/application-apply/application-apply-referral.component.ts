import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'careers-application-apply-referral',
  template: `
    <h5>How did you hear about us?</h5>
    <p>
      <small>Maximum {{ MAX_LENGTH }} words.</small>
      <small [ngStyle]="wordsCount > MAX_LENGTH && { color: 'red' }" *ngIf="wordsCount > 0">
        Current count {{ wordsCount }}</small
      >
    </p>
    <ckeditor
      [editor]="editor"
      (change)="valueChanges()"
      [name]="name"
      [(ngModel)]="value"
      [disabled]="disabled"
    ></ckeditor>
  `,
  styles: [':host { text-align: left; }'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ApplicationApplyReferralComponent), multi: true }
  ]
})
export class ApplicationApplyReferralComponent implements ControlValueAccessor {
  public editor = ClassicEditor;
  public disabled = false;
  public value = '';
  public MAX_LENGTH = 20;

  @Input()
  public name: string;

  public get wordsCount(): number {
    return this.value && this.value.length > 0 ? this.value.split(' ').length : 0;
  }

  private propagateChange = (_: any) => {};

  public writeValue(obj: any): void {
    this.value = obj || '';
  }

  public registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  public registerOnTouched(fn: any): void {}

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  valueChanges() {
    if (!this.value || this.wordsCount <= this.MAX_LENGTH) {
      this.propagateChange(this.value);
    }
  }
}
