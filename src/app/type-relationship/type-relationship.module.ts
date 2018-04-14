import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TypeRelationshipNewComponent} from './type-relationship-new/type-relationship-new.component';
import {TypeRelationshipSearchComponent} from './type-relationship-search/type-relationship-search.component';
import {RouterModule} from '@angular/router';
import {DataTableModule, DropdownModule, InputTextareaModule, InputTextModule, ProgressBarModule, TooltipModule} from 'primeng/primeng';
import {MessageModule} from 'primeng/message';
import {CoreModule} from '../core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TranslateModule, TranslateService} from 'ng2-translate';
import {TransportSharedModule} from '../transort-shared/transport-share.module';
import {SharedModule} from 'primeng/shared';
import {PanelModule} from 'primeng/panel';
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
   declarations: [
      TypeRelationshipNewComponent,
      TypeRelationshipSearchComponent
   ],
   exports: [
      TypeRelationshipNewComponent,
      TypeRelationshipSearchComponent
   ],
   providers: [
      TranslateService
   ]
})
export class TypeRelationshipModule {
}
