import {Component} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
   selector: 'app-base-form',
   template: '<div></div>'
})
export class BaseFormComponent {

   form: FormGroup;
   loading: boolean;

   constructor() {
   }

   resetarForm() {
      this.form.reset();
   }

   getCampo(campo: string) {
      return this.form.get(campo);
   }

   mostrarModalCarregando(value: boolean) {
      this.loading = value;
   }
}
