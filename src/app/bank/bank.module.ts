import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BankSearchComponent} from './bank-search/bank-search.component';
import {BankNewComponent} from './bank-new/bank-new.component';
import {DataTableModule} from 'primeng/primeng';
import {TranslateModule, TranslateService} from 'ng2-translate';
import {TableModule} from 'primeng/table';

@NgModule({
   imports: [
      CommonModule,
      DataTableModule,
      TableModule,

      TranslateModule
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
