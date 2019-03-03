import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BancoPesquisaComponent} from './banco-pesquisa/banco-pesquisa.component';
import {BancoNovoComponent} from './banco-novo/banco-novo.component';
import {AuthGuard} from '../../../security/auth.guard';


const routes: Routes = [
   {path: '', component: BancoPesquisaComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_LISTAR_BANCO']}},
   {path: 'novo', component: BancoNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_SALVAR_BANCO']}},
   {path: ':key', component: BancoNovoComponent, canActivate: [AuthGuard], data: {roles: ['ROLE_ATUALIZAR_BANCO']}},
];


@NgModule({
   imports: [
      CommonModule,
      RouterModule.forChild(routes)
   ],
   declarations: [],
   exports: [RouterModule]
})
export class BancoRoutingModule {
}
