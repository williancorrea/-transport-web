import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from 'ng2-translate';
import {Title} from '@angular/platform-browser';
import {BankService} from '../bank.service';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {ToastyService} from 'ng2-toasty';
import {AuthService} from '../../security/auth.service';
import {FormBuilder, Validators} from '@angular/forms';
import {BaseFormComponent} from '../../transport-shared/base-form/base-form.component';

@Component({
   selector: 'app-bank-new',
   templateUrl: './bank-new.component.html',
   styleUrls: ['./bank-new.component.css']
})
export class BankNewComponent extends BaseFormComponent implements OnInit {


   bankTranslate: any;


   constructor(private router: Router,
               private activatedRoute: ActivatedRoute,
               private translate: TranslateService,
               private title: Title,
               private bankService: BankService,
               private toasty: ToastyService,
               public auth: AuthService,
               private errorHandler: ErrorHandlerService,
               private formBuild: FormBuilder) {
      super();
   }

   ngOnInit() {
      this.configForm();
      this.showLoading(true);
      this.translate.get('bank').subscribe(s => {
         this.bankTranslate = s;

         const isEditing = this.activatedRoute.snapshot.params['key'];
         if (isEditing) {
            this.title.setTitle(s['edit_bank']);

            this.bankService.findOne(isEditing)
               .then(response => {
                  // this.bank = response;
                  this.form.patchValue(response);
                  this.showLoading(false);
               })
               .catch(error => {
                  this.errorHandler.handle(error);
                  this.title.setTitle(s['add_bank']);
                  this.showLoading(false);
               });
         } else {
            this.title.setTitle(s['add_bank']);
            this.showLoading(false);
         }
      });
   }

   configForm() {
      this.form = this.formBuild.group({
         key: [null],
         code: [null, Validators.maxLength(10)],
         name: [
            null, [
               Validators.required,
               Validators.minLength(5),
               Validators.maxLength(150)
            ]
         ],
         url: [null, Validators.maxLength(150)]
      });
   }

   save() {
      if (this.form.valid) {
         this.showLoading(true);
         if (this.form.get('key').value) {
            this.bankService.update(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.bankTranslate['update_success']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/banks');
                  }
               ).catch(error => {
               this.errorHandler.handle(error);
               this.showLoading(false);
            });
         } else {
            this.bankService.save(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.bankTranslate['add_success']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/banks');
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
      this.router.navigateByUrl('/banks');
   }


   salvar() {
      // METODO ABSTRATO DA CLASSE BASE-FORM
   }
}
