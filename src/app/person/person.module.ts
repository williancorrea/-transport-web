import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PersonSearchComponent} from './person-search/person-search.component';
import {PersonNewComponent} from './person-new/person-new.component';
import {LoadingModule} from 'ngx-loading';
import {
   CheckboxModule,
   DataTableModule,
   DropdownModule,
   InputTextModule,
   ProgressBarModule,
   RadioButtonModule,
   TooltipModule
} from 'primeng/primeng';
import {MessageModule} from 'primeng/message';
import {SharedModule} from 'primeng/shared';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {TranslateModule, TranslateService} from 'ng2-translate';
import {TransportSharedModule} from '../transort-shared/transport-share.module';
import {CoreModule} from '../core/core.module';
import {ButtonModule} from 'primeng/button';
import {RouterModule} from '@angular/router';

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
      CheckboxModule,
      RadioButtonModule
   ],
   declarations: [
      PersonSearchComponent,
      PersonNewComponent
   ],
   exports: [],
   providers: [
      TranslateService
   ]
})
export class PersonModule {
}
