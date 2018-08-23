import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LevelOfEducationSearchComponent} from './level-of-education-search/level-of-education-search.component';
import {LevelOfEducationNewComponent} from './level-of-education-new/level-of-education-new.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PanelModule} from 'primeng/panel';
import {DataTableModule, DropdownModule, InputTextareaModule, InputTextModule, ProgressBarModule, TooltipModule} from 'primeng/primeng';
import {CoreModule} from '../core/core.module';
import {MessageModule} from 'primeng/message';
import {TranslateModule, TranslateService} from 'ng2-translate';
import {TransportSharedModule} from '../transport-shared/transport-share.module';
import {ButtonModule} from 'primeng/button';
import {SharedModule} from 'primeng/shared';
import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
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
      ProgressBarModule,
      InputTextareaModule
   ],
   declarations: [
      LevelOfEducationSearchComponent,
      LevelOfEducationNewComponent
   ],
   exports: [],
   providers: [
      TranslateService
   ]
})
export class LevelOfEducationModule {
}
