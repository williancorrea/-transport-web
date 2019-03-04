import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from 'ng2-translate';
import {Title} from '@angular/platform-browser';
import {ToastyService} from 'ng2-toasty';
import {AuthService} from '../../../../security/auth.service';
import {ErroManipuladorService} from '../../../../core/erro-manipulador.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ClasseDespesaService} from '../classe-despesa.service';
import {BaseFormComponent} from '../../../../transport-shared/base-form/base-form.component';

@Component({
   selector: 'app-classe-despesa-novo',
   templateUrl: './classe-despesa-novo.component.html',
   styleUrls: ['./classe-despesa-novo.component.css']
})
export class ClasseDespesaNovoComponent extends BaseFormComponent implements OnInit {

   traduzir: any;

   constructor(private router: Router,
               private activatedRoute: ActivatedRoute,
               private translate: TranslateService,
               private title: Title,
               private classeDespesaService: ClasseDespesaService,
               private toasty: ToastyService,
               public auth: AuthService,
               private errorHandler: ErroManipuladorService,
               private formBuild: FormBuilder) {
      super();
   }

   ngOnInit() {
      this.configForm();
      this.mostrarModalCarregando(true);
      this.translate.get('app').subscribe(s => {
         this.traduzir = s;

         const isEditing = this.activatedRoute.snapshot.params['key'];
         if (isEditing) {
            this.title.setTitle(this.traduzir['classe-despesa']['acoes']['editar']);

            this.classeDespesaService.findOne(isEditing)
               .then(response => {
                  // this.bank = response;
                  this.form.patchValue(response);
                  this.mostrarModalCarregando(false);
               })
               .catch(error => {
                  this.errorHandler.handle(error);
                  this.title.setTitle(this.traduzir['classe-despesa']['acoes']['adicionar']);
                  this.mostrarModalCarregando(false);
               });
         } else {
            this.title.setTitle(this.traduzir['classe-despesa']['acoes']['adicionar']);
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
               Validators.minLength(2),
               Validators.maxLength(150)
            ]
         ],
         inativo: [null]
      });
   }

   save() {
      if (this.form.valid) {
         this.mostrarModalCarregando(true);
         if (this.form.get('key').value) {
            this.classeDespesaService.update(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.traduzir['classe-despesa']['acoes']['atualizar_sucesso']);
                     this.mostrarModalCarregando(false);
                     this.router.navigateByUrl(this.traduzir['classe-despesa']['link-pagina']);
                  }
               ).catch(error => {
               this.errorHandler.handle(error);
               this.mostrarModalCarregando(false);
            });
         } else {
            this.classeDespesaService.save(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.traduzir['classe-despesa']['acoes']['atualizar_sucesso']);
                     this.mostrarModalCarregando(false);
                     this.router.navigateByUrl(this.traduzir['classe-despesa']['link-pagina']);
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
      this.router.navigateByUrl(this.traduzir['classe-despesa']['link-pagina']);
   }


   salvar() {
      // METODO ABSTRATO DA CLASSE BASE-FORM
   }
}
