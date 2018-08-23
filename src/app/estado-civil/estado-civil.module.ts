import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TransportSharedModule} from '../transport-shared/transport-share.module';
import {TableModule} from 'primeng/table';
import {TranslateModule, TranslateService} from 'ng2-translate';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PanelModule} from 'primeng/panel';
import {DataTableModule, DropdownModule, InputTextareaModule, InputTextModule, ProgressBarModule, TooltipModule} from 'primeng/primeng';
import {MessageModule} from 'primeng/message';
import {SharedModule} from 'primeng/shared';
import {LoadingModule} from 'ngx-loading';
import {CoreModule} from '../core/core.module';
import {ButtonModule} from 'primeng/button';
import {RouterModule} from '@angular/router';
import {EstadoCivilPesquisarComponent} from './estado-civil-pesquisar/estado-civil-pesquisar.component';
import {EstadoCivilNovoComponent} from './estado-civil-novo/estado-civil-novo.component';

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
      InputTextareaModule
   ],
   declarations: [EstadoCivilPesquisarComponent, EstadoCivilNovoComponent],
   exports: [],
   providers: [
      TranslateService
   ]
})
export class EstadoCivilModule {
}
