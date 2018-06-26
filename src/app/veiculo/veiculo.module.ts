import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VeiculoPesquisaComponent} from './veiculo-pesquisa/veiculo-pesquisa.component';
import {TableModule} from 'primeng/table';
import {
   DataTableModule,
   DropdownModule, InputMask, InputMaskModule,
   InputTextareaModule,
   InputTextModule,
   ProgressBarModule,
   TooltipModule
} from 'primeng/primeng';
import {LoadingModule} from 'ngx-loading';
import {SharedModule} from 'primeng/shared';
import {CoreModule} from '../core/core.module';
import {TranslateModule, TranslateService} from 'ng2-translate';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TransportSharedModule} from '../transort-shared/transport-share.module';
import {MessageModule} from 'primeng/message';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import { VeiculoNovoComponent } from './veiculo-novo/veiculo-novo.component';

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
      DropdownModule,
      MessageModule,
      ButtonModule,
      PanelModule,
      TooltipModule,
      ProgressBarModule,
      InputTextareaModule,
      InputMaskModule
   ],
   declarations: [VeiculoPesquisaComponent, VeiculoNovoComponent],
   exports: [],
   providers: [
      TranslateService
   ]
})
export class VeiculoModule {
}
