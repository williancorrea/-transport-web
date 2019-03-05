import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from 'ng2-translate';
import {Title} from '@angular/platform-browser';
import {BancoService} from '../../base/banco/banco.service';
import {ToastyService} from 'ng2-toasty';
import {AuthService} from '../../../security/auth.service';
import {ErroManipuladorService} from '../../../core/erro-manipulador.service';
import {FormBuilder} from '@angular/forms';
import {BaseFormComponent} from '../../../transport-shared/base-form/base-form.component';

@Component({
   selector: 'app-permissoes-de-acesso',
   templateUrl: './permissoes-de-acesso.component.html',
   styleUrls: ['./permissoes-de-acesso.component.css']
})
export class PermissoesDeAcessoComponent extends BaseFormComponent implements OnInit {

   traduzir: any;
   permissoes = new Map();

   constructor(private router: Router,
               private activatedRoute: ActivatedRoute,
               private translate: TranslateService,
               private titulo: Title,
               private bankService: BancoService,
               private toasty: ToastyService,
               public auth: AuthService,
               private errorHandler: ErroManipuladorService,
               private formBuild: FormBuilder) {
      super();
   }

   ngOnInit() {
      this.mostrarModalCarregando(true);
      this.translate.get('app').subscribe(s => {
         this.traduzir = s;

         this.permissoes = new Map([
            ['ROLE_ACESSAR_URI_BANCO', true],
            ['ROLE_LISTAR_BANCO', false],
            ['ROLE_SALVAR_BANCO', true],
            ['ROLE_ATUALIZAR_BANCO', false],
            ['ROLE_DELETAR_BANCO', true],

            ['ROLE_ACESSAR_URI_CLASSE-DESPESA', false],
            ['ROLE_LISTAR_CLASSE-DESPESA', true],
            ['ROLE_SALVAR_CLASSE-DESPESA', false],
            ['ROLE_ATUALIZAR_CLASSE-DESPESA', true],
            ['ROLE_DELETAR_CLASSE-DESPESA', true]
         ]);

         this.mostrarModalCarregando(false);
      });
   }

   manipuladorMudanca(e, permissao) {
      this.mostrarModalCarregando(true);
      console.log(permissao, e.target.checked);


      this.mostrarModalCarregando(false);
   }

}
