import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BankSearchComponent} from './bank-search/bank-search.component';
import {BankNewComponent} from './bank-new/bank-new.component';
import {TranslateModule, TranslateService} from 'ng2-translate';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {MessageModule} from 'primeng/message';
import {DataTableModule, DropdownModule, InputTextModule} from 'primeng/primeng';
import {SharedModule} from 'primeng/shared';
import {PanelModule} from 'primeng/panel';
import {TransportShareModule} from '../transort-share/transport-share.module';
import {CoreModule} from '../core/core.module';

@NgModule({
   imports: [
      CommonModule,

      TranslateModule,
      TransportShareModule,
      CoreModule,

      DataTableModule,
      SharedModule,
      TableModule,
      InputTextModule,
      ButtonModule,
      DropdownModule,
      MessageModule,
      ButtonModule,
      PanelModule
   ],
   declarations: [
      BankSearchComponent,
      BankNewComponent
   ],
   exports: [
      BankSearchComponent,
      BankNewComponent
   ],
   providers: [
      TranslateService
   ]
})

export class BankModule {
}
