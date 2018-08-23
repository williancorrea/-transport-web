import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
   selector: 'app-base-form',
   template: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit {

   form: FormGroup;
   loading: boolean;

   constructor() {
   }

   ngOnInit() {
   }

   abstract salvar();

   resetarForm() {
      this.form.reset();
   }

   getCampo(campo: string) {
      return this.form.get(campo);
   }

   showLoading(value: boolean) {
      this.loading = value;
   }
}
