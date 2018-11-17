import {FormControl} from '@angular/forms';
import {Component, Input} from '@angular/core';

@Component({
   selector: 'app-message',
   template: `
      <div *ngIf="temErro()" class="ui-message ui-messages-error">
         <p *ngIf="control.hasError('required')">{{'validation.required' | translate}}</p>
         <p *ngIf="control.hasError('minlength')">{{'validation.minlength' | translate}}
            {{control.errors?.minlength?.requiredLength }} {{'validation.character' | translate}}</p>
         <p *ngIf="control.hasError('maxlength')">{{'validation.maxlength' | translate}}
            {{control.errors?.maxlength?.requiredLength }} {{'validation.character' | translate}}</p>
         <p *ngIf="control.hasError('pattern')">{{'validation.pattern' | translate}}</p>
      </div>
   `,
   styles: [`
      .ui-messages-error {
         margin: 0;
         margin-top: 4px;
      }

      .ui-messages-error p {
         margin: 0px;
      }

      /*.wc-ui-messages-error {*/
      /*border: 0px;*/
      /*background: none;*/
      /*margin-top: -5px;*/
      /*color: #bf0000;*/
      /*font-weight: bold;*/
      /*font-size: 10px;*/
      /*position: absolute;*/
      /*}*/
   `]
})

export class MessageComponent {

   @Input() control: FormControl;
   @Input() form: any;
   @Input() label: string;

   temErro(): boolean {
      // console.log(this.control);
      // console.log(this.form);
      // return this.control.errors !== null && this.control.enabled && (this.form.submitted || (this.control.updateOn !== 'blur') || this.control.dirty || this.control.touched);

      if (this.form.submitted) {
         // this.control.markAsDirty();
         // this.control.markAsTouched();
      }
      return this.control.invalid && this.control.enabled && (this.control.dirty || this.form.submitted);
      // return this.control.invalid && this.control.enabled && (this.control.dirty || this.control.touched) && this.form.submitted;
   }
}
