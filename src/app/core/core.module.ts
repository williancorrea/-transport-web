import {Title} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {NgModule, LOCALE_ID} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConfirmationService} from 'primeng/components/common/api';
import {ConfirmDialogModule} from 'primeng/components/confirmdialog/confirmdialog';
import {ToastyModule} from 'ng2-toasty';
import {JwtHelper} from 'angular2-jwt';

import {AuthService} from './../security/auth.service';
import {ErrorHandlerService} from './error-handler.service';
import {NaoAutorizadoComponent} from './nao-autorizado.component';
import {PaginaNaoEncontradaComponent} from './pagina-nao-encontrada.component';
import {BankService} from '../bank/bank.service';


@NgModule({
   imports: [
      CommonModule,
      HttpModule,
      RouterModule,

      ToastyModule.forRoot(),
      ConfirmDialogModule,
   ],
   declarations: [
      PaginaNaoEncontradaComponent,
      NaoAutorizadoComponent
   ],
   exports: [
      ToastyModule,
      ConfirmDialogModule
   ],
   providers: [
      ErrorHandlerService,
      AuthService,

      BankService,

      ConfirmationService,
      JwtHelper,
      Title,
      {provide: LOCALE_ID, useValue: 'pt-BR'}
   ]
})
export class CoreModule {
}
