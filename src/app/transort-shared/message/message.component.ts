import {FormControl} from '@angular/forms';
import {Component, Input} from '@angular/core';

@Component({
   selector: 'app-message',
   template: `
      <div *ngIf="hasError()" class="ui-message ui-messages-error">
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
   `]
})

export class MessageComponent {

   @Input() control: FormControl;
   @Input() form: any;
   @Input() label: string;

   hasError(): boolean {
      return this.control.errors !== null && this.control.enabled && (this.form.submitted  || this.control.dirty || this.control.touched);
   }
}
