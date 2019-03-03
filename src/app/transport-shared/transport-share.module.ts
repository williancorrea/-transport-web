import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule, TranslateService, TranslateStaticLoader} from 'ng2-translate';
import {MessageComponent} from './message/message.component';
import {WCLabelComponent} from './wcLabel/wc-label.component';
import {BaseFormComponent} from './base-form/base-form.component';
import {Http} from '@angular/http';
import {SharedModule} from 'primeng/shared';
import {HttpLoaderFactory} from '../app.module';

@NgModule({
   imports: [
      CommonModule,

      TranslateModule
      // TranslateModule.forRoot({
      //    provide: TranslateLoader,
      //    useFactory: HttpLoaderFactory,
      //    deps: [Http]
      // }),
   ],
   declarations: [
      MessageComponent,
      WCLabelComponent,
      BaseFormComponent
   ],
   exports: [
      // TranslateModule,
      MessageComponent,
      WCLabelComponent,
      BaseFormComponent
   ]
})
export class TransportSharedModule {
   // static forRoot(): ModuleWithProviders {
   //
   //    function translateLoader(http: Http) {
   //       return new TranslateStaticLoader(http, '/assets/i18n', '.json');
   //    }
   //
   //    return {
   //       ngModule: SharedModule,
   //       providers: [
   //          {
   //             provide: TranslateLoader,
   //             useFactory: translateLoader,
   //             deps: [Http]
   //          },
   //          TranslateService],
   //    };
   // }
}
