import {Component, OnInit} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {ActivatedRoute, Router} from '@angular/router';
import {ErroManipuladorService} from '../../core/erro-manipulador.service';
import {AuthService} from '../../security/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {ToastyService} from 'ng2-toasty';
import {ProductUnitService} from '../product-unit.service';

@Component({
   selector: 'app-product-unit-new',
   templateUrl: './product-unit-new.component.html',
   styleUrls: ['./product-unit-new.component.css']
})
export class ProductUnitNewComponent implements OnInit {

   form: FormGroup;
   bankTranslate: any;
   loading: boolean;

   constructor(private router: Router,
               private activatedRoute: ActivatedRoute,
               private translate: TranslateService,
               private title: Title,
               private productUnitService: ProductUnitService,
               private toasty: ToastyService,
               public auth: AuthService,
               private errorHandler: ErroManipuladorService,
               private formBuild: FormBuilder) {
   }

   ngOnInit() {
      this.configForm();
      this.showLoading(true);
      this.translate.get('product_unit').subscribe(s => {
         this.bankTranslate = s;

         const isEditing = this.activatedRoute.snapshot.params['key'];
         if (isEditing) {
            this.title.setTitle(s['actions']['edit']);

            this.productUnitService.findOne(isEditing)
               .then(response => {
                  // this.bank = response;
                  this.form.patchValue(response);
                  this.showLoading(false);
               })
               .catch(error => {
                  this.errorHandler.handle(error);
                  this.title.setTitle(s['actions']['add']);
                  this.showLoading(false);
               });
         } else {
            this.title.setTitle(s['actions']['add']);
            this.showLoading(false);
         }
      });
   }

   configForm() {
      this.form = this.formBuild.group({
         key: [null],
         initials: [null,
            [
               Validators.minLength(1),
               Validators.maxLength(10),
            ]
         ],
         name: [
            null, [
               Validators.required,
               Validators.minLength(5),
               Validators.maxLength(150)
            ]
         ],
         canFraction: [false]
      });
   }

   showLoading(value: boolean) {
      this.loading = value;
   }

   save() {
      if (this.form.valid) {
         this.showLoading(true);
         if (this.form.get('key').value) {
            this.productUnitService.update(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.bankTranslate['actions']['update_success']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/product-units');
                  }
               ).catch(error => {
               this.errorHandler.handle(error);
               this.showLoading(false);
            });
         } else {
            this.productUnitService.save(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.bankTranslate['actions']['add_success']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/product-units');
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
      this.router.navigateByUrl('/product-units');
   }
}
