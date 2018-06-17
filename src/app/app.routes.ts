import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {DashboardDemoComponent} from './dashboard/dashboarddemo.component';
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
import {ProductUnitSearchComponent} from './product-unit/product-unit-search/product-unit-search.component';
import {ProductUnitNewComponent} from './product-unit/product-unit-new/product-unit-new.component';
import {TypeRelationshipSearchComponent} from './type-relationship/type-relationship-search/type-relationship-search.component';
import {TypeRelationshipNewComponent} from './type-relationship/type-relationship-new/type-relationship-new.component';
import {LevelOfEducationNewComponent} from './level-of-education/level-of-education-new/level-of-education-new.component';
import {LevelOfEducationSearchComponent} from './level-of-education/level-of-education-search/level-of-education-search.component';
import {EstadoCivilPesquisarComponent} from './estado-civil/estado-civil-pesquisar/estado-civil-pesquisar.component';
import {EstadoCivilNovoComponent} from './estado-civil/estado-civil-novo/estado-civil-novo.component';
import {PersonSearchComponent} from './person/person-search/person-search.component';
import {PersonNewComponent} from './person/person-new/person-new.component';
import {VeiculoPesquisaComponent} from './veiculo/veiculo-pesquisa/veiculo-pesquisa.component';
import {VeiculoNovoComponent} from './veiculo/veiculo-novo/veiculo-novo.component';
import {ItinerarioPesquisaComponent} from './itinerario/itinerario-pesquisa/itinerario-pesquisa.component';
import {ItinerarioNovoComponent} from './itinerario/itinerario-novo/itinerario-novo.component';

export const routes: Routes = [
   {
      path: '',
      component: DashboardDemoComponent,
      pathMatch: 'full',
      canActivate: [AuthGuard],
      data: {
         roles: [
            'ROLE_LIST_BANK',
            'ROLE_LIST_PRODUCT-UNIT',
            'ROLE_LIST_TYPE-RELATIONSHIP',
            'ROLE_LIST_LEVEL-OF-EDUCATION',
            'ROLE_LISTAR_ESTADO_CIVIL',
            'ROLE_LIST_PERSON'
         ]
      }
   },

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

   {path: 'product-units', component: ProductUnitSearchComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LIST_PRODUCT-UNIT']}},
   {path: 'product-units/new', component: ProductUnitNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SAVE_PRODUCT-UNIT']}},
   {path: 'product-units/:key', component: ProductUnitNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_UPDATE_PRODUCT-UNIT']}},

   {path: 'types-of-relationships', component: TypeRelationshipSearchComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LIST_TYPE-RELATIONSHIP']}},
   {path: 'types-of-relationships/new', component: TypeRelationshipNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SAVE_TYPE-RELATIONSHIP']}},
   {path: 'types-of-relationships/:key', component: TypeRelationshipNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_UPDATE_TYPE-RELATIONSHIP']}},

   {path: 'levels-of-education', component: LevelOfEducationSearchComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LIST_LEVEL-OF-EDUCATION']}},
   {path: 'levels-of-education/new', component: LevelOfEducationNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SAVE_LEVEL-OF-EDUCATION']}},
   {path: 'levels-of-education/:key', component: LevelOfEducationNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_UPDATE_LEVEL-OF-EDUCATION']}},

   {path: 'estado-civil', component: EstadoCivilPesquisarComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LISTAR_ESTADO_CIVIL']}},
   {path: 'estado-civil/novo', component: EstadoCivilNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SALVAR_ESTADO_CIVIL']}},
   {path: 'estado-civil/:key', component: EstadoCivilNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ATUALIZAR_ESTADO_CIVIL']}},

   {path: 'veiculo', component: VeiculoPesquisaComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LISTAR_VEICULO']}},
   {path: 'veiculo/novo', component: VeiculoNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SALVAR_VEICULO']}},
   {path: 'veiculo/:key', component: VeiculoNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ATUALIZAR_VEICULO']}},

   {path: 'itinerario', component: ItinerarioPesquisaComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LISTAR_ITINERARIO']}},
   {path: 'itinerario/novo', component: ItinerarioNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SALVAR_ITINERARIO']}},
   {path: 'itinerario/:key', component: ItinerarioNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ATUALIZAR_ITINERARIO']}},

   {path: 'persons', component: PersonSearchComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LIST_PERSON']}},
   {path: 'persons/new', component: PersonNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SAVE_PERSON']}},
   {path: 'persons/:key', component: PersonNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_UPDATE_PERSON']}},

   {path: '**', redirectTo: 'page-not-found'}

];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
