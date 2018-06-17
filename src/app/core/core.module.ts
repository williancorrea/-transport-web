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
import {AccessDeniedComponent} from './access-denied.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {BankService} from '../bank/bank.service';
import {TranslateModule} from 'ng2-translate';
import {ButtonModule} from 'primeng/button';
import {ProductUnitService} from '../product-unit/product-unit.service';
import {TypeRelationshipService} from '../type-relationship/type-relationship.service';
import {LevelOfEducationService} from '../level-of-education/level-of-education.service';
import {EstadoCivilService} from '../estado-civil/estado-civil.service';
import {PersonService} from '../person/person.service';
import {VeiculoService} from '../veiculo/veiculo.service';
import {ItinerarioService} from '../itinerario/itinerario.service';


@NgModule({
   imports: [
      CommonModule,
      HttpModule,
      RouterModule,
      TranslateModule,
      ButtonModule,

      ConfirmDialogModule,
   ],
   declarations: [
      PageNotFoundComponent,
      AccessDeniedComponent
   ],
   exports: [
      ToastyModule,
      ConfirmDialogModule
   ],
   providers: [
      ErrorHandlerService,
      AuthService,

      BankService,
      ProductUnitService,
      TypeRelationshipService,
      LevelOfEducationService,
      EstadoCivilService,
      PersonService,
      VeiculoService,
      ItinerarioService,

      ConfirmationService,
      JwtHelper,
      Title,
      {provide: LOCALE_ID, useValue: 'pt-BR'}
   ]
})
export class CoreModule {
}
