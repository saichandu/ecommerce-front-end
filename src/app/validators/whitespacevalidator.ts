import {FormControl, ValidationErrors} from '@angular/forms'

export class Whitespacevalidator {
  
  static validate(control: FormControl): ValidationErrors {
    
    if (control.value != null && control.value.trim().length == 0) {
        return {'whitespace': true};
    } else {    
      return {};
    }
  }
}
