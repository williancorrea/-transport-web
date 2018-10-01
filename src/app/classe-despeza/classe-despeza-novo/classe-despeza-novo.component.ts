import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from 'ng2-translate';
import {Title} from '@angular/platform-browser';
import {ToastyService} from 'ng2-toasty';
import {AuthService} from '../../security/auth.service';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {FormBuilder, Validators} from '@angular/forms';
import {ClasseDespezaService} from '../classe-despeza.service';
import {BaseFormComponent} from '../../transport-shared/base-form/base-form.component';

@Component({
  selector: 'app-classe-despeza-novo',
  templateUrl: './classe-despeza-novo.component.html',
  styleUrls: ['./classe-despeza-novo.component.css']
})
export class ClasseDespezaNovoComponent extends BaseFormComponent  implements OnInit {

   bankTranslate: any;

   constructor(private router: Router,
               private activatedRoute: ActivatedRoute,
               private translate: TranslateService,
               private title: Title,
               private classeDespezaService: ClasseDespezaService,
               private toasty: ToastyService,
               public auth: AuthService,
               private errorHandler: ErrorHandlerService,
               private formBuild: FormBuilder) {
      super();
   }

   ngOnInit() {
      this.configForm();
      this.showLoading(true);
      this.translate.get('classe-despeza').subscribe(s => {
         this.bankTranslate = s;

         const isEditing = this.activatedRoute.snapshot.params['key'];
         if (isEditing) {
            this.title.setTitle(s['acoes']['editar']);

            this.classeDespezaService.findOne(isEditing)
               .then(response => {
                  // this.bank = response;
                  this.form.patchValue(response);
                  this.showLoading(false);
               })
               .catch(error => {
                  this.errorHandler.handle(error);
                  this.title.setTitle(s['acoes']['adicionar']);
                  this.showLoading(false);
               });
         } else {
            this.title.setTitle(s['acoes']['adicionar']);
            this.showLoading(false);
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
         inativo: [null]
      });
   }

   save() {
      if (this.form.valid) {
         this.showLoading(true);
         if (this.form.get('key').value) {
            this.classeDespezaService.update(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.bankTranslate['acoes']['atualizar_sucesso']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/classeDespeza');
                  }
               ).catch(error => {
               this.errorHandler.handle(error);
               this.showLoading(false);
            });
         } else {
            this.classeDespezaService.save(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.bankTranslate['acoes']['atualizar_sucesso']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/classeDespeza');
                  }
               ).catch(erro => {
               this.errorHandler.handle(erro);
               this.showLoading(false);
            });
         }
      } else {
         this.translate.get('validation').subscribe(s => {
            this.toasty.warning(s['form_invalid']);
         });
      }
   }

   cancel() {
      this.router.navigateByUrl('/classeDespeza');
   }


   salvar() {
      // METODO ABSTRATO DA CLASSE BASE-FORM
   }
}
