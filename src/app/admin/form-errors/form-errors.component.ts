import { Component, Input, inject } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'bm-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrl: './form-errors.component.css'
})
export class FormErrorsComponent {
  @Input() controlName?: string;
  @Input() messages: { [errorCode: string]: string } = {};
  private form = inject(FormGroupDirective);

  get errors(): string[] {
    if (!this.controlName) {
      return [];
    }

    const control = this.form.control.get(this.controlName);

    if (!control || !control.errors || !control.touched) {
      return [];
    }

    return Object.keys(control.errors).map(errorCode => {
      return this.messages[errorCode];
    })
  }
}
