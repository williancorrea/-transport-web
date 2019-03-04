import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BancoPesquisaComponent} from './banco-pesquisa/banco-pesquisa.component';
import {BancoNovoComponent} from './banco-novo/banco-novo.component';
import {TranslateModule, TranslateService} from 'ng2-translate';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {MessageModule} from 'primeng/message';
import {CheckboxModule, DataTableModule, InputTextModule, ProgressBarModule, TooltipModule} from 'primeng/primeng';
import {SharedModule} from 'primeng/shared';
import {PanelModule} from 'primeng/panel';
import {TransportSharedModule} from '../../../transport-shared/transport-share.module';
import {CoreModule} from '../../../core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoadingModule} from 'ngx-loading';
import {RouterModule} from '@angular/router';

@NgModule({
   imports: [
      CommonModule,

      TranslateModule,

      TransportSharedModule,
      CoreModule,

      SharedModule,

      RouterModule,
      // BancoRoutingModule,

      FormsModule,
      ReactiveFormsModule,
      LoadingModule,

      DataTableModule,
      TableModule,
      InputTextModule,
      ButtonModule,
      MessageModule,
      ButtonModule,
      PanelModule,
      TooltipModule,
      ProgressBarModule,
      CheckboxModule
   ],
   declarations: [
      BancoPesquisaComponent,
      BancoNovoComponent
   ],
   exports: [],
   providers: [
      TranslateService
   ]
})

export class BancoModule {
}
