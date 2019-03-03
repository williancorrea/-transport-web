import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import 'rxjs/add/operator/toPromise';
import {AppComponent} from './app.component';
import {AppMenuComponent, AppSubMenuComponent} from './app.menu.component';
import {AppMenuLateralComponent} from './app.menu-lateral.component';
import {AppSideBarTabContentComponent} from './app.sidebartabcontent.component';
import {AppTopbarComponent} from './app.topbar.component';
import {AppRodapeComponent} from './app.rodape.component';
import {DashboardDemoComponent} from './dashboard/dashboarddemo.component';


import {BancoModule} from './cadastros/base/banco/banco.module';


import {Http} from '@angular/http';
import {MyMissingTranslationHandler} from './missingtemplate.component';
import {MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateService, TranslateStaticLoader} from 'ng2-translate';
import {CoreModule} from './core/core.module';
import {SecurityModule} from './security/security.module';
import {ToastyModule} from 'ng2-toasty';
import {ProductUnitModule} from './product-unit/product-unit.module';
import {TypeRelationshipModule} from './type-relationship/type-relationship.module';
import {ANIMATION_TYPES, LoadingModule} from 'ngx-loading';
import {LevelOfEducationModule} from './level-of-education/level-of-education.module';
import {EstadoCivilModule} from './estado-civil/estado-civil.module';
import {PersonModule} from './person/person.module';
import {VeiculoModule} from './veiculo/veiculo.module';
import {ItinerarioModule} from './itinerario/itinerario.module';
import {ControleKmModule} from './controle-km/controle-km.module';
import {ClasseDespesaModule} from './classe-despesa/classe-despesa.module';
import {CentroDeCustoModule} from './centro-de-custo/centro-de-custo.module';
import {TipoPagamentoModule} from './tipo-pagamento/tipo-pagamento.module';
import {AppRoutingModule} from './app-routing.module';

export function HttpLoaderFactory(http: Http) {
   return new TranslateStaticLoader(http, '/assets/i18n', '.json');
}

@NgModule({
   imports: [
      BrowserModule,
      BrowserAnimationsModule,

      FormsModule,

      HttpClientModule,

      TranslateModule.forRoot({
         provide: TranslateLoader,
         useFactory: HttpLoaderFactory,
         deps: [Http]
      }),

      ToastyModule.forRoot(),
      CoreModule,
      SecurityModule,
      AppRoutingModule,

      LoadingModule.forRoot({
         animationType: ANIMATION_TYPES.wanderingCubes,
         backdropBackgroundColour: 'rgba(0,0,0,0.2)',
         backdropBorderRadius: '0px',
         primaryColour: 'green',
         secondaryColour: 'red',
         tertiaryColour: 'blue',
         fullScreenBackdrop: true
      }),

      BancoModule,

      ProductUnitModule,
      TypeRelationshipModule,
      LevelOfEducationModule,
      EstadoCivilModule,
      PersonModule,
      VeiculoModule,
      ItinerarioModule,
      ControleKmModule,
      ClasseDespesaModule,
      CentroDeCustoModule,
      TipoPagamentoModule
   ],
   declarations: [
      AppComponent,
      AppMenuComponent,
      AppSubMenuComponent,
      AppMenuLateralComponent,
      AppSideBarTabContentComponent,
      AppTopbarComponent,
      AppRodapeComponent,
      DashboardDemoComponent,
   ],
   providers: [
      TranslateService,
      {provide: LocationStrategy, useClass: HashLocationStrategy},
      {provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler},
   ],
   bootstrap: [AppComponent]
})
export class AppModule {
}
