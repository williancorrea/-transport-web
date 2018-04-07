import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
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
import {BankSearchComponent} from './bank/bank-search/bank-search.component';
import {AccessDeniedComponent} from './core/access-denied.component';
import {PageNotFoundComponent} from './core/page-not-found.component';
import {BankNewComponent} from './bank/bank-new/bank-new.component';
import {LoginFormComponent} from './security/login-form/login-form.component';
import {AuthGuard} from './security/auth.guard';

export const routes: Routes = [
   {path: '', component: DashboardDemoComponent, pathMatch: 'full'},

   {path: 'sample', component: SampleDemoComponent},
   {path: 'forms', component: FormsDemoComponent},
   {path: 'data', component: DataDemoComponent},
   {path: 'panels', component: PanelsDemoComponent},
   {path: 'overlays', component: OverlaysDemoComponent},
   {path: 'menus', component: MenusDemoComponent},
   {path: 'messages', component: MessagesDemoComponent},
   {path: 'misc', component: MiscDemoComponent},
   {path: 'empty', component: EmptyDemoComponent},
   {path: 'charts', component: ChartsDemoComponent},
   {path: 'file', component: FileDemoComponent},
   {path: 'utils', component: UtilsDemoComponent},
   {path: 'documentation', component: DocumentationComponent},

   {path: 'access-denied', component: AccessDeniedComponent},
   {path: 'page-not-found', component: PageNotFoundComponent},

   {path: 'login', component: LoginFormComponent},

   {path: 'banks', component: BankSearchComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LIST_BANK']}},
   {path: 'banks/new', component: BankNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SAVE_BANK']}},
   {path: 'banks/:key', component: BankNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_UPDATE_BANK']}},

   {path: '**', redirectTo: 'page-not-found'}

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
