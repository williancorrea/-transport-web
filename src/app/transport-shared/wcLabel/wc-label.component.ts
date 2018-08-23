import {Component, Input} from '@angular/core';

@Component({
   selector: 'app-wc-label',
   template: `
      <div>
         <span style="font-weight: bolder">{{label}}</span> <span class="requiredLabel">{{label_required}}</span>
      </div>
   `,
   styles: [`
      .teste {
        
      }
   `]
})

export class WCLabelComponent {

   @Input() label: string;
   @Input() label_required: string;
}
