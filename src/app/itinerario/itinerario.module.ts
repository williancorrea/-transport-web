import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateModule, TranslateService} from 'ng2-translate';
import {TransportSharedModule} from '../transort-shared/transport-share.module';
import {SharedModule} from 'primeng/shared';
import {RouterModule} from '@angular/router';
import {
   CalendarModule,
   DataTableModule,
   DropdownModule, FieldsetModule, InputMaskModule,
   InputTextareaModule,
   InputTextModule, KeyFilterModule,
   ProgressBarModule,
   TooltipModule
} from 'primeng/primeng';
import {TableModule} from 'primeng/table';
import {MessageModule} from 'primeng/message';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {CoreModule} from '../core/core.module';
import {PanelModule} from 'primeng/panel';
import {LoadingModule} from 'ngx-loading';
import { ItinerarioPesquisaComponent } from './itinerario-pesquisa/itinerario-pesquisa.component';
import { ItinerarioNovoComponent } from './itinerario-novo/itinerario-novo.component';

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
      InputTextareaModule,

      CalendarModule,
      KeyFilterModule,
      InputMaskModule,
   ],
   declarations: [ItinerarioPesquisaComponent, ItinerarioNovoComponent],
   providers: [
      TranslateService
   ]
})
export class ItinerarioModule {
}
