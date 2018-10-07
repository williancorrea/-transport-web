import {Component, OnInit} from '@angular/core';
import {BaseFormComponent} from '../../transport-shared/base-form/base-form.component';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from 'ng2-translate';
import {Title} from '@angular/platform-browser';
import {ToastyService} from 'ng2-toasty';
import {AuthService} from '../../security/auth.service';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {FormBuilder, Validators} from '@angular/forms';
import {CentroDeCustoService} from '../centro-de-custo.service';
import {ClasseDespesaService} from '../../classe-despesa/classe-despesa.service';

@Component({
   selector: 'app-centro-de-custo-novo',
   templateUrl: './centro-de-custo-novo.component.html',
   styleUrls: ['./centro-de-custo-novo.component.css']
})
export class CentroDeCustoNovoComponent extends BaseFormComponent implements OnInit {

   bankTranslate: any;
   classeDespesaList: any;

   constructor(private router: Router,
               private activatedRoute: ActivatedRoute,
               private translate: TranslateService,
               private title: Title,
               private centroDeCustoService: CentroDeCustoService,
               private classeDespesaService: ClasseDespesaService,
               private toasty: ToastyService,
               public auth: AuthService,
               private errorHandler: ErrorHandlerService,
               private formBuild: FormBuilder) {
      super();
   }

   ngOnInit() {
      this.configForm();
      this.showLoading(true);
      this.translate.get('centro-de-custo').subscribe(s => {
         this.bankTranslate = s;

         this.carregarClasseDespesas();

         const isEditing = this.activatedRoute.snapshot.params['key'];
         if (isEditing) {
            this.title.setTitle(s['acoes']['editar']);

            this.centroDeCustoService.findOne(isEditing)
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
         classeDespesa: this.formBuild.group({
            key: [null, Validators.required]
         }),
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

   // TODO: MELHORAR O CARREGAMENTO DESTA PESQUIA
   carregarClasseDespesas() {
      this.classeDespesaService.findAll({'rows': 1000, 'first': 0, 'sortOrder': 1, 'sortField': 'descricao'}, null)
         .then(classeDespesaList => {
            this.classeDespesaList = classeDespesaList.content.map(p => ({
               label: p.descricao,
               value: p.key
            }));
         })
         .catch(error => {
            this.errorHandler.handle(error);
         });
   }

   save() {
      if (this.form.valid) {
         this.showLoading(true);
         if (this.form.get('key').value) {
            this.centroDeCustoService.update(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.bankTranslate['acoes']['atualizar_sucesso']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/centroDeCusto');
                  }
               ).catch(error => {
               this.errorHandler.handle(error);
               this.showLoading(false);
            });
         } else {
            this.centroDeCustoService.save(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.bankTranslate['acoes']['atualizar_sucesso']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/centroDeCusto');
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
      this.router.navigateByUrl('/centroDeCusto');
   }


   salvar() {
      // METODO ABSTRATO DA CLASSE BASE-FORM
   }
}
