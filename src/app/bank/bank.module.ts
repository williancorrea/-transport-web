import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BankSearchComponent} from './bank-search/bank-search.component';
import {BankNewComponent} from './bank-new/bank-new.component';
import {TranslateModule, TranslateService} from 'ng2-translate';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {MessageModule} from 'primeng/message';
import {DataTableModule, DropdownModule, InputTextModule, ProgressBarModule, TooltipModule} from 'primeng/primeng';
import {SharedModule} from 'primeng/shared';
import {PanelModule} from 'primeng/panel';
import {TransportSharedModule} from '../transort-shared/transport-share.module';
import {CoreModule} from '../core/core.module';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoadingModule} from 'ngx-loading';

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
      ProgressBarModule
   ],
   declarations: [
      BankSearchComponent,
      BankNewComponent
   ],
   exports: [],
   providers: [
      TranslateService
   ]
})

export class BankModule {
}
