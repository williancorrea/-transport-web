import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from 'ng2-translate';
import {Title} from '@angular/platform-browser';
import {BancoService} from '../banco.service';
import {ErroManipuladorService} from '../../../../core/erro-manipulador.service';
import {ToastyService} from 'ng2-toasty';
import {AuthService} from '../../../../security/auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseFormComponent} from '../../../../transport-shared/base-form/base-form.component';

@Component({
   selector: 'app-bank-new',
   templateUrl: './banco-novo.component.html',
   styleUrls: ['./banco-novo.component.css']
})
export class BancoNovoComponent extends BaseFormComponent implements OnInit {


   translateBanco: any;


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
      this.configurarForm();
      this.mostrarModalCarregando(true);
      this.translate.get('banco').subscribe(s => {
         this.translateBanco = s;

         const editando = this.activatedRoute.snapshot.params['key'];

         if (editando) {
            this.titulo.setTitle(s['editar']);

            this.bankService.findOne(editando).then(response => {
               // this.bank = response;
               this.form.patchValue(response);
               this.mostrarModalCarregando(false);
            }).catch(error => {
               this.errorHandler.handle(error);
               this.titulo.setTitle(s['adicionar']);
               this.mostrarModalCarregando(false);
            });
         } else {
            this.titulo.setTitle(s['adicionar']);
            this.mostrarModalCarregando(false);
         }
      });
   }

   configurarForm() {
      this.form = this.formBuild.group({
         key: [null],
         codigo: [null, Validators.maxLength(10)],
         nome: [
            null, [
               Validators.required,
               Validators.minLength(5),
               Validators.maxLength(150)
            ]
         ],
         url: [null, Validators.maxLength(150)],
         inativo: [false]
      });
   }

   save() {
      if (this.form.valid) {
         this.mostrarModalCarregando(true);
         if (this.form.get('key').value) {
            this.bankService.update(this.form.value).then(response => {
               this.toasty.success(this.translateBanco['atualizar']);
               this.mostrarModalCarregando(false);
               this.router.navigateByUrl('/bancos');
            }).catch(error => {
               this.errorHandler.handle(error);
               this.mostrarModalCarregando(false);
            });
         } else {
            this.bankService.save(this.form.value).then(response => {
               this.toasty.success(this.translateBanco['adicionado']);
               this.mostrarModalCarregando(false);
               this.router.navigateByUrl('/bancos');
            }).catch(erro => {
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
      this.router.navigateByUrl('/bancos');
   }


   salvar() {
      // METODO ABSTRATO DA CLASSE BASE-FORM
   }
}
