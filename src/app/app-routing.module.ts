import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {DashboardDemoComponent} from './dashboard/dashboarddemo.component';
import {AuthGuard} from './security/auth.guard';
import {AccessDeniedComponent} from './core/access-denied.component';
import {PageNotFoundComponent} from './core/page-not-found.component';
import {ErroComponent} from './core/erro.component';
import {LoginFormComponent} from './security/login-form/login-form.component';
import {BancoPesquisaComponent} from './cadastros/base/banco/banco-pesquisa/banco-pesquisa.component';
import {BancoNovoComponent} from './cadastros/base/banco/banco-novo/banco-novo.component';
import {ProductUnitSearchComponent} from './product-unit/product-unit-search/product-unit-search.component';
import {ProductUnitNewComponent} from './product-unit/product-unit-new/product-unit-new.component';
import {EstadoCivilPesquisarComponent} from './estado-civil/estado-civil-pesquisar/estado-civil-pesquisar.component';
import {EstadoCivilNovoComponent} from './estado-civil/estado-civil-novo/estado-civil-novo.component';
import {VeiculoPesquisaComponent} from './veiculo/veiculo-pesquisa/veiculo-pesquisa.component';
import {VeiculoNovoComponent} from './veiculo/veiculo-novo/veiculo-novo.component';
import {ItinerarioPesquisaComponent} from './itinerario/itinerario-pesquisa/itinerario-pesquisa.component';
import {ItinerarioNovoComponent} from './itinerario/itinerario-novo/itinerario-novo.component';
import {PersonSearchComponent} from './person/person-search/person-search.component';
import {PersonNewComponent} from './person/person-new/person-new.component';
import {ControleKmPesquisaComponent} from './controle-km/controle-km-pesquisa/controle-km-pesquisa.component';
import {ControleKmNovoComponent} from './controle-km/controle-km-novo/controle-km-novo.component';
import {ClasseDespesaPesquisarComponent} from './cadastros/base/classe-despesa/classe-despesa-pesquisar/classe-despesa-pesquisar.component';
import {ClasseDespesaNovoComponent} from './cadastros/base/classe-despesa/classe-despesa-novo/classe-despesa-novo.component';
import {CentroDeCustoPesquisarComponent} from './centro-de-custo/centro-de-custo-pesquisar/centro-de-custo-pesquisar.component';
import {CentroDeCustoNovoComponent} from './centro-de-custo/centro-de-custo-novo/centro-de-custo-novo.component';
import {TipoPagamentoPesquisarComponent} from './tipo-pagamento/tipo-pagamento-pesquisar/tipo-pagamento-pesquisar.component';
import {TipoPagamentoNovoComponent} from './tipo-pagamento/tipo-pagamento-novo/tipo-pagamento-novo.component';

const routes: Routes = [
   // {path: 'bancos', loadChildren: 'app/cadastros/base/banco/banco.module#BancoModule'},

   {path: 'bancos', component: BancoPesquisaComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LISTAR_BANCO']}},
   {path: 'bancos/novo', component: BancoNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SALVAR_BANCO']}},
   {path: 'bancos/:key', component: BancoNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ATUALIZAR_BANCO']}},


   {path: 'product-units', component: ProductUnitSearchComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LIST_PRODUCT-UNIT']}},
   {path: 'product-units/new', component: ProductUnitNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SAVE_PRODUCT-UNIT']}},
   {path: 'product-units/:key', component: ProductUnitNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_UPDATE_PRODUCT-UNIT']}},

   {path: 'cadastros/base/classe-despesa', component: ClasseDespesaPesquisarComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LISTAR_CLASSE-DESPESA']}},
   {path: 'cadastros/base/classe-despesa/novo', component: ClasseDespesaNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SALVAR_CLASSE-DESPESA']}},
   {path: 'cadastros/base/classe-despesa/:key', component: ClasseDespesaNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ATUALIZAR_CLASSE-DESPESA']}},

   // {path: 'types-of-relationships', component: TypeRelationshipSearchComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LIST_TYPE-RELATIONSHIP']}},
   // {path: 'types-of-relationships/new', component: TypeRelationshipNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SAVE_TYPE-RELATIONSHIP']}},
   // {path: 'types-of-relationships/:key', component: TypeRelationshipNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_UPDATE_TYPE-RELATIONSHIP']}},

   // {path: 'levels-of-education', component: LevelOfEducationSearchComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LIST_LEVEL-OF-EDUCATION']}},
   // {path: 'levels-of-education/new', component: LevelOfEducationNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SAVE_LEVEL-OF-EDUCATION']}},
   // {path: 'levels-of-education/:key', component: LevelOfEducationNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_UPDATE_LEVEL-OF-EDUCATION']}},

   {path: 'estado-civil', component: EstadoCivilPesquisarComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LISTAR_ESTADO_CIVIL']}},
   {path: 'estado-civil/novo', component: EstadoCivilNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SALVAR_ESTADO_CIVIL']}},
   {
      path: 'estado-civil/:key',
      component: EstadoCivilNovoComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_ATUALIZAR_ESTADO_CIVIL']}
   },

   {
      path: 'veiculo',
      component: VeiculoPesquisaComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_LISTAR_VEICULO']}
   },
   {
      path: 'veiculo/novo',
      component: VeiculoNovoComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_SALVAR_VEICULO']}
   },
   {
      path: 'veiculo/:key',
      component: VeiculoNovoComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_ATUALIZAR_VEICULO']}
   },

   {
      path: 'itinerario',
      component: ItinerarioPesquisaComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_LISTAR_ITINERARIO']}
   },
   {
      path: 'itinerario/novo',
      component: ItinerarioNovoComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_SALVAR_ITINERARIO']}
   },
   {
      path: 'itinerario/:key',
      component: ItinerarioNovoComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_ATUALIZAR_ITINERARIO']}
   },

   {path: 'persons', component: PersonSearchComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LIST_PERSON']}},
   {path: 'persons/new', component: PersonNewComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SAVE_PERSON']}},
   {
      path: 'persons/:key',
      component: PersonNewComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_UPDATE_PERSON']}
   },

   {
      path: 'controleKm',
      component: ControleKmPesquisaComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_LISTAR_CONTROLE-KM']}
   },
   {
      path: 'controleKm/novo',
      component: ControleKmNovoComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_SALVAR_CONTROLE-KM']}
   },
   {
      path: 'controleKm/:key',
      component: ControleKmNovoComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_ATUALIZAR_CONTROLE-KM']}
   },


   {
      path: 'centroDeCusto',
      component: CentroDeCustoPesquisarComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_LISTAR_CENTRO-DE-CUSTO']}
   },
   {
      path: 'centroDeCusto/novo',
      component: CentroDeCustoNovoComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_SALVAR_CENTRO-DE-CUSTO']}
   },
   {
      path: 'centroDeCusto/:key',
      component: CentroDeCustoNovoComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_ATUALIZAR_CENTRO-DE-CUSTO']}
   },

   {
      path: 'tipoPagamento',
      component: TipoPagamentoPesquisarComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_LISTAR_TIPO-PAGAMENTO']}
   },
   {
      path: 'tipoPagamento/novo',
      component: TipoPagamentoNovoComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_SALVAR_TIPO-PAGAMENTO']}
   },
   {
      path: 'tipoPagamento/:key',
      component: TipoPagamentoNovoComponent,
      canActivate: [AuthGuard],
      data: {roles: ['ROLE_ATUALIZAR_TIPO-PAGAMENTO']}
   },


   {
      path: '',
      component: DashboardDemoComponent,
      pathMatch: 'full',
      canActivate: [AuthGuard],
      data: {
         roles: [
            'ROLE_LISTAR_BANCO',
            'ROLE_LIST_PRODUCT-UNIT'
         ]
      }
   },

   {path: 'access-denied', component: AccessDeniedComponent},
   {path: 'page-not-found', component: PageNotFoundComponent},
   {path: 'erro', component: ErroComponent},
   {path: 'login', component: LoginFormComponent},

   {path: '**', redirectTo: 'page-not-found'}
];


@NgModule({
   imports: [
      CommonModule,
      RouterModule.forRoot(routes)
   ],
   declarations: [],
   exports: [RouterModule]
})
export class AppRoutingModule {
}
