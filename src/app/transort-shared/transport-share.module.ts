import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule} from 'ng2-translate';
import {MessageComponent} from './message/message.component';

@NgModule({
   imports: [
      CommonModule,

      TranslateModule,
   ],
   declarations: [
      MessageComponent
   ],
   exports: [
      MessageComponent
   ]
})
export class TransportSharedModule {
}
