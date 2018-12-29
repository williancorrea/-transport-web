import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../security/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ErroManipuladorService} from '../../core/erro-manipulador.service';
import {TranslateService} from 'ng2-translate';
import {Title} from '@angular/platform-browser';
import {ToastyService} from 'ng2-toasty';
import {TypeRelationshipService} from '../type-relationship.service';

@Component({
   selector: 'app-type-relationship-new',
   templateUrl: './type-relationship-new.component.html',
   styleUrls: ['./type-relationship-new.component.css']
})
export class TypeRelationshipNewComponent implements OnInit {

   form: FormGroup;
   translateObj: any;
   loading: boolean;

   constructor(private router: Router,
               private activatedRoute: ActivatedRoute,
               private translate: TranslateService,
               private title: Title,
               private typeRelationshipService: TypeRelationshipService,
               private toasty: ToastyService,
               public auth: AuthService,
               private errorHandler: ErroManipuladorService,
               private formBuild: FormBuilder) {
   }

   ngOnInit() {
      this.configForm();
      this.showLoading(true);
      this.translate.get('type-relationship').subscribe(s => {
         this.translateObj = s;

         const isEditing = this.activatedRoute.snapshot.params['key'];
         if (isEditing) {
            this.title.setTitle(s['actions']['edit']);

            this.typeRelationshipService.findOne(isEditing)
               .then(response => {
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
         code: [
            null, [
               Validators.required,
               Validators.minLength(1),
               Validators.maxLength(3)
            ]
         ],
         name: [
            null, [
               Validators.required,
               Validators.minLength(5),
               Validators.maxLength(150)
            ]
         ],
         description: [
            null, [
               Validators.required,
               Validators.minLength(1),
               Validators.maxLength(512),
            ]
         ]
      });
   }

   showLoading(value: boolean) {
      this.loading = value;
   }

   save() {
      if (this.form.valid) {
         this.showLoading(true);
         if (this.form.get('key').value) {
            this.typeRelationshipService.update(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.translateObj['actions']['update_success']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/types-of-relationships');
                  }
               ).catch(error => {
               this.errorHandler.handle(error);
               this.showLoading(false);
            });
         } else {
            this.typeRelationshipService.save(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.translateObj['actions']['add_success']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/types-of-relationships');
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
      this.router.navigateByUrl('/types-of-relationships');
   }
}
