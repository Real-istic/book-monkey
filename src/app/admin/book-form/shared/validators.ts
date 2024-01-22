import { isFormArray, ValidatorFn } from '@angular/forms';

export const atLeastOneValue: ValidatorFn = (control) => {
  if (!isFormArray(control)) {
    return null;
  }
  if (control.controls.some(el => !!el.value)) {
    return null;
  } else {
    return { atleastonevalue: true };
  }
}
