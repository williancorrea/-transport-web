import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CentroDeCustoNovoComponent} from './centro-de-custo-novo/centro-de-custo-novo.component';
import {CentroDeCustoPesquisarComponent} from './centro-de-custo-pesquisar/centro-de-custo-pesquisar.component';
import {TranslateModule, TranslateService} from 'ng2-translate';
import {TransportSharedModule} from '../transport-shared/transport-share.module';
import {CoreModule} from '../core/core.module';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoadingModule} from 'ngx-loading';
import {
   ButtonModule,
   DataTableModule,
   DropdownModule, InputSwitchModule,
   InputTextModule,
   MessageModule, PanelModule, ProgressBarModule,
   SharedModule, TooltipModule
} from 'primeng/primeng';
import {TableModule} from 'primeng/table';

@NgModule({
   imports: [
      CommonModule,

      TranslateModule,
      TransportSharedModule,
      CoreModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,
      LoadingModule,

      DataTableModule,
      SharedModule,
      TableModule,
      InputTextModule,
      ButtonModule,
      DropdownModule,
      MessageModule,
      ButtonModule,
      PanelModule,
      TooltipModule,
      ProgressBarModule,
      InputSwitchModule
   ],
   declarations: [
      CentroDeCustoNovoComponent,
      CentroDeCustoPesquisarComponent
   ],
   exports: [],
   providers: [
      TranslateService
   ]
})
export class CentroDeCustoModule {
}
