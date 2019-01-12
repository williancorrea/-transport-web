import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from 'ng2-translate';
import {Title} from '@angular/platform-browser';
import {TipoPagamentoService} from '../../tipo-pagamento/tipo-pagamento.service';
import {ToastyService} from 'ng2-toasty';
import {AuthService} from '../../security/auth.service';
import {ErroManipuladorService} from '../../core/erro-manipulador.service';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseFormComponent} from '../../transport-shared/base-form/base-form.component';

@Component({
   selector: 'app-tipo-pagamento-novo',
   templateUrl: './tipo-pagamento-novo.component.html',
   styleUrls: ['./tipo-pagamento-novo.component.css']
})
export class TipoPagamentoNovoComponent extends BaseFormComponent implements OnInit {

   bankTranslate: any;

   constructor(private router: Router,
               private activatedRoute: ActivatedRoute,
               private translate: TranslateService,
               private title: Title,
               private tipoPagamentoService: TipoPagamentoService,
               private toasty: ToastyService,
               public auth: AuthService,
               private errorHandler: ErroManipuladorService,
               private formBuild: FormBuilder) {
      super();
   }

   ngOnInit() {
      this.configForm();
      this.mostrarModalCarregando(true);
      this.translate.get('tipo-pagamento').subscribe(s => {
         this.bankTranslate = s;

         const isEditing = this.activatedRoute.snapshot.params['key'];
         if (isEditing) {
            this.title.setTitle(s['acoes']['editar']);

            this.tipoPagamentoService.findOne(isEditing)
               .then(response => {
                  // this.bank = response;
                  this.form.patchValue(response);
                  this.mostrarModalCarregando(false);
               })
               .catch(error => {
                  this.errorHandler.handle(error);
                  this.title.setTitle(s['acoes']['adicionar']);
                  this.mostrarModalCarregando(false);
               });
         } else {
            this.title.setTitle(s['acoes']['adicionar']);
            this.mostrarModalCarregando(false);
         }
      });
   }

   configForm() {
      this.form = this.formBuild.group({
         key: [null],
         descricao: [
            null, [
               Validators.required,
               Validators.minLength(5),
               Validators.maxLength(150)
            ]
         ],
         naoPodeSerAlterado: [null],
         inativo: [null]
      });
   }

   save() {
      if (this.form.valid) {
         this.mostrarModalCarregando(true);
         if (this.form.get('key').value) {
            this.tipoPagamentoService.update(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.bankTranslate['acoes']['atualizar_sucesso']);
                     this.mostrarModalCarregando(false);
                     this.router.navigateByUrl('/tipoPagamento');
                  }
               ).catch(error => {
               this.errorHandler.handle(error);
               this.mostrarModalCarregando(false);
            });
         } else {
            this.tipoPagamentoService.save(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.bankTranslate['acoes']['atualizar_sucesso']);
                     this.mostrarModalCarregando(false);
                     this.router.navigateByUrl('/tipoPagamento');
                  }
               ).catch(erro => {
               this.errorHandler.handle(erro);
               this.mostrarModalCarregando(false);
            });
         }
      } else {
         this.translate.get('validation').subscribe(s => {
            this.toasty.warning(s['form_invalid']);
         });
      }
   }

   cancel() {
      this.router.navigateByUrl('/tipoPagamento');
   }


   salvar() {
      // METODO ABSTRATO DA CLASSE BASE-FORM
   }
}
