import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControleKmPesquisaComponent} from './controle-km-pesquisa/controle-km-pesquisa.component';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {TransportSharedModule} from '../transport-shared/transport-share.module';
import {CoreModule} from '../core/core.module';
import {
   CalendarModule,
   DataTableModule, DialogModule,
   DropdownModule,
   InputMaskModule,
   InputTextareaModule,
   InputTextModule,
   KeyFilterModule,
   MessagesModule,
   ProgressBarModule,
   TooltipModule
} from 'primeng/primeng';
import {TranslateModule, TranslateService} from 'ng2-translate';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from 'primeng/shared';
import {LoadingModule} from 'ngx-loading';
import {MessageModule} from 'primeng/message';
import {PanelModule} from 'primeng/panel';
import {ControleKmNovoComponent} from './controle-km-novo/controle-km-novo.component';

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
      MessagesModule,
      ButtonModule,
      PanelModule,
      TooltipModule,
      ProgressBarModule,
      InputTextareaModule,

      CalendarModule,
      KeyFilterModule,
      InputMaskModule,
      DialogModule
   ],
   declarations: [ControleKmPesquisaComponent, ControleKmNovoComponent],
   providers: [
      TranslateService
   ]
})
export class ControleKmModule {
}
