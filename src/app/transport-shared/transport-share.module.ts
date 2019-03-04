import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from 'ng2-translate';
import {MessageComponent} from './message/message.component';
import {WCLabelComponent} from './wcLabel/wc-label.component';
import {BaseFormComponent} from './base-form/base-form.component';

@NgModule({
   imports: [
      CommonModule,

      TranslateModule
   ],
   declarations: [
      MessageComponent,
      WCLabelComponent,
      BaseFormComponent
   ],
   exports: [
      TranslateModule,
      MessageComponent,
      WCLabelComponent,
      BaseFormComponent
   ]
})
export class TransportSharedModule {
   // static forRoot(): ModuleWithProviders {
   //    return {
   //       ngModule: TransportSharedModule
   //    };
   // }
}
