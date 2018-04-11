import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PanelModule} from 'primeng/panel';
import {CheckboxModule, DataTableModule, DropdownModule, InputTextModule, ProgressBarModule, TooltipModule} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MessageModule} from 'primeng/message';
import {ButtonModule} from 'primeng/button';
import {CoreModule} from '../core/core.module';
import {TableModule} from 'primeng/table';
import {SharedModule} from 'primeng/shared';
import {RouterModule} from '@angular/router';
import {TransportSharedModule} from '../transort-shared/transport-share.module';
import {TranslateModule, TranslateService} from 'ng2-translate';
import {ProductUnitSearchComponent} from './product-unit-search/product-unit-search.component';
import { ProductUnitNewComponent } from './product-unit-new/product-unit-new.component';

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
      CheckboxModule
   ],
   declarations: [
      ProductUnitSearchComponent,
      ProductUnitNewComponent
   ],
   exports: [
      ProductUnitSearchComponent
   ],
   providers: [
      TranslateService
   ]
})
export class ProductUnitModule {
}
