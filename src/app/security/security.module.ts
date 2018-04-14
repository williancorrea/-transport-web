import {Http, RequestOptions} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {ButtonModule} from 'primeng/components/button/button';
import {InputTextModule} from 'primeng/components/inputtext/inputtext';

import {AuthGuard} from './auth.guard';
import {LogoutService} from './logout.service';
import {AuthService} from './auth.service';
import {TransportHttp} from './transport-http';
import {LoginFormComponent} from './login-form/login-form.component';
import {TransportSharedModule} from '../transort-shared/transport-share.module';
import {CoreModule} from '../core/core.module';
import {TranslateModule, TranslateService} from 'ng2-translate';
import {MessageModule} from 'primeng/message';
import {LoadingModule} from 'ngx-loading';

export function authHttpServiceFactory(auth: AuthService, http: Http, options: RequestOptions) {
   const config = new AuthConfig({
      globalHeaders: [
         {'Content-Type': 'application/json'}
      ]
   });

   return new TransportHttp(auth, config, http, options);
}

@NgModule({
   imports: [
      CommonModule,

      FormsModule,
      TranslateModule,
      TransportSharedModule,
      CoreModule,

      LoadingModule,
      MessageModule,
      InputTextModule,
      ButtonModule,
   ],
   declarations: [LoginFormComponent],
   providers: [
      {
         provide: AuthHttp,
         useFactory: authHttpServiceFactory,
         deps: [AuthService, Http, RequestOptions]
      },
      AuthGuard,
      TranslateService,
      LogoutService
   ]
})
export class SecurityModule {
}
