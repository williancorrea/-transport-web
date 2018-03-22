import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {AppRoutes} from './app.routes';
import 'rxjs/add/operator/toPromise';

import {AccordionModule} from 'primeng/primeng';
import {AutoCompleteModule} from 'primeng/primeng';
import {BreadcrumbModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';
import {CarouselModule} from 'primeng/primeng';
import {ChartModule} from 'primeng/primeng';
import {CheckboxModule} from 'primeng/primeng';
import {ChipsModule} from 'primeng/primeng';
import {CodeHighlighterModule} from 'primeng/primeng';
import {ConfirmDialogModule} from 'primeng/primeng';
import {ColorPickerModule} from 'primeng/primeng';
import {ContextMenuModule} from 'primeng/primeng';
import {DataGridModule} from 'primeng/primeng';
import {DataListModule} from 'primeng/primeng';
import {DataScrollerModule} from 'primeng/primeng';
import {DataTableModule} from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import {DragDropModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {EditorModule} from 'primeng/primeng';
import {FieldsetModule} from 'primeng/primeng';
import {FileUploadModule} from 'primeng/primeng';
import {GalleriaModule} from 'primeng/primeng';
import {GMapModule} from 'primeng/primeng';
import {GrowlModule} from 'primeng/primeng';
import {InputMaskModule} from 'primeng/primeng';
import {InputSwitchModule} from 'primeng/primeng';
import {InputTextModule} from 'primeng/primeng';
import {InputTextareaModule} from 'primeng/primeng';
import {LightboxModule} from 'primeng/primeng';
import {ListboxModule} from 'primeng/primeng';
import {MegaMenuModule} from 'primeng/primeng';
import {MenuModule} from 'primeng/primeng';
import {MenubarModule} from 'primeng/primeng';
import {MessagesModule} from 'primeng/primeng';
import {MultiSelectModule} from 'primeng/primeng';
import {OrderListModule} from 'primeng/primeng';
import {OrganizationChartModule} from 'primeng/primeng';
import {OverlayPanelModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import {PanelModule} from 'primeng/primeng';
import {PanelMenuModule} from 'primeng/primeng';
import {PasswordModule} from 'primeng/primeng';
import {PickListModule} from 'primeng/primeng';
import {ProgressBarModule} from 'primeng/primeng';
import {RadioButtonModule} from 'primeng/primeng';
import {RatingModule} from 'primeng/primeng';
import {ScheduleModule} from 'primeng/primeng';
import {SelectButtonModule} from 'primeng/primeng';
import {SlideMenuModule} from 'primeng/primeng';
import {SliderModule} from 'primeng/primeng';
import {SpinnerModule} from 'primeng/primeng';
import {SplitButtonModule} from 'primeng/primeng';
import {StepsModule} from 'primeng/primeng';
import {TabMenuModule} from 'primeng/primeng';
import {TabViewModule} from 'primeng/primeng';
import {TerminalModule} from 'primeng/primeng';
import {TieredMenuModule} from 'primeng/primeng';
import {ToggleButtonModule} from 'primeng/primeng';
import {ToolbarModule} from 'primeng/primeng';
import {TooltipModule} from 'primeng/primeng';
import {TreeModule} from 'primeng/primeng';
import {TreeTableModule} from 'primeng/primeng';

import {AppComponent} from './app.component';
import {AppMenuComponent, AppSubMenuComponent} from './app.menu.component';
import {AppSideBarComponent} from './app.sidebar.component';
import {AppSideBarTabContentComponent} from './app.sidebartabcontent.component';
import {AppTopbarComponent} from './app.topbar.component';
import {AppFooterComponent} from './app.footer.component';
import {DashboardDemoComponent} from './demo/view/dashboarddemo.component';
import {SampleDemoComponent} from './demo/view/sampledemo.component';
import {FormsDemoComponent} from './demo/view/formsdemo.component';
import {DataDemoComponent} from './demo/view/datademo.component';
import {PanelsDemoComponent} from './demo/view/panelsdemo.component';
import {OverlaysDemoComponent} from './demo/view/overlaysdemo.component';
import {MenusDemoComponent} from './demo/view/menusdemo.component';
import {MessagesDemoComponent} from './demo/view/messagesdemo.component';
import {MiscDemoComponent} from './demo/view/miscdemo.component';
import {EmptyDemoComponent} from './demo/view/emptydemo.component';
import {ChartsDemoComponent} from './demo/view/chartsdemo.component';
import {FileDemoComponent} from './demo/view/filedemo.component';
import {UtilsDemoComponent} from './demo/view/utilsdemo.component';
import {DocumentationComponent} from './demo/view/documentation.component';

import {CarService} from './demo/service/carservice';
import {CountryService} from './demo/service/countryservice';
import {EventService} from './demo/service/eventservice';
import {NodeService} from './demo/service/nodeservice';
import {BankModule} from './bank/bank.module';


import {Http} from '@angular/http';
import {MyMissingTranslationHandler} from './missingtemplate.component';
import {
   MissingTranslationHandler, TranslateLoader, TranslateModule, TranslateStaticLoader, TranslateService
} from 'ng2-translate';
import {SharedModule} from 'primeng/shared';
import {CoreModule} from './core/core.module';
import {SecurityModule} from './security/security.module';
import {ToastyModule} from 'ng2-toasty';

export function HttpLoaderFactory(http: Http) {
   return new TranslateStaticLoader(http, '/assets/i18n', '.json');
}

@NgModule({
   imports: [
      BrowserModule,
      BrowserAnimationsModule,

      FormsModule,

      HttpClientModule,



      AccordionModule,
      AutoCompleteModule,
      BreadcrumbModule,
      ButtonModule,
      CalendarModule,
      CarouselModule,
      ChartModule,
      CheckboxModule,
      ChipsModule,
      CodeHighlighterModule,
      ConfirmDialogModule,
      SharedModule,
      ContextMenuModule,
      ColorPickerModule,
      DataGridModule,
      DataListModule,
      DataScrollerModule,
      DataTableModule,
      DialogModule,
      DragDropModule,
      DropdownModule,
      EditorModule,
      FieldsetModule,
      FileUploadModule,
      GalleriaModule,
      GMapModule,
      GrowlModule,
      InputMaskModule,
      InputSwitchModule,
      InputTextModule,
      InputTextareaModule,
      LightboxModule,
      ListboxModule,
      MegaMenuModule,
      MenuModule,
      MenubarModule,
      MessagesModule,
      MultiSelectModule,
      OrderListModule,
      OrganizationChartModule,
      OverlayPanelModule,
      PaginatorModule,
      PanelModule,
      PanelMenuModule,
      PasswordModule,
      PickListModule,
      ProgressBarModule,
      RadioButtonModule,
      RatingModule,
      ScheduleModule,
      SelectButtonModule,
      SlideMenuModule,
      SliderModule,
      SpinnerModule,
      SplitButtonModule,
      StepsModule,
      TabMenuModule,
      TabViewModule,
      TerminalModule,
      TieredMenuModule,
      ToggleButtonModule,
      ToolbarModule,
      TooltipModule,
      TreeModule,
      TreeTableModule,



      TranslateModule.forRoot({
         provide: TranslateLoader,
         useFactory: HttpLoaderFactory,
         deps: [Http]
      }),

      ToastyModule.forRoot(),
      CoreModule,
      SecurityModule,
      AppRoutes,
      BankModule
   ],
   declarations: [
      AppComponent,
      AppMenuComponent,
      AppSubMenuComponent,
      AppSideBarComponent,
      AppSideBarTabContentComponent,
      AppTopbarComponent,
      AppFooterComponent,
      DashboardDemoComponent,

      // TODO: REMOVER
      SampleDemoComponent,
      FormsDemoComponent,
      DataDemoComponent,
      PanelsDemoComponent,
      OverlaysDemoComponent,
      MenusDemoComponent,
      MessagesDemoComponent,
      MessagesDemoComponent,
      MiscDemoComponent,
      ChartsDemoComponent,
      EmptyDemoComponent,
      FileDemoComponent,
      UtilsDemoComponent,
      DocumentationComponent
   ],
   providers: [
      {provide: LocationStrategy, useClass: HashLocationStrategy},

      TranslateService,
      {provide: MissingTranslationHandler, useClass: MyMissingTranslationHandler},

      // TODO: REMOVER
      CarService, CountryService, EventService, NodeService
   ],
   bootstrap: [AppComponent]
})
export class AppModule {
}
