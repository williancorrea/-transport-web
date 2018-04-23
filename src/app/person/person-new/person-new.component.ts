import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../security/auth.service';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from 'ng2-translate';
import {ToastyService} from 'ng2-toasty';
import {PersonService} from '../person.service';

@Component({
   selector: 'app-person-new',
   templateUrl: './person-new.component.html',
   styleUrls: ['./person-new.component.css']
})
export class PersonNewComponent implements OnInit {

   form: FormGroup;
   bankTranslate: any;
   loading: boolean;

   constructor(private router: Router,
               private activatedRoute: ActivatedRoute,
               private translate: TranslateService,
               private title: Title,
               private personService: PersonService,
               private toasty: ToastyService,
               public auth: AuthService,
               private errorHandler: ErrorHandlerService,
               private formBuild: FormBuilder) {
   }

   ngOnInit() {
      this.configForm();
      this.showLoading(true);
      this.translate.get('person').subscribe(s => {
         this.bankTranslate = s;

         const isEditing = this.activatedRoute.snapshot.params['key'];
         if (isEditing) {
            this.title.setTitle(s['actions']['edit']);

            this.personService.findOne(isEditing)
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
         name: [
            null, [
               Validators.required,
               Validators.minLength(5),
               Validators.maxLength(150)
            ]
         ],
         type: ['PHYSICAL']
      });
   }

   showLoading(value: boolean) {
      this.loading = value;
   }

   save() {
      if (this.form.valid) {
         this.showLoading(true);
         if (this.form.get('key').value) {
            this.personService.update(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.bankTranslate['actions']['update_success']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/persons');
                  }
               ).catch(error => {
               this.errorHandler.handle(error);
               this.showLoading(false);
            });
         } else {
            this.personService.save(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.bankTranslate['actions']['add_success']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/persons');
                  }
               ).catch(erro => {
               this.errorHandler.handle(erro);
               this.showLoading(false);
            });
         }
      }
   }

   cancel() {
      this.router.navigateByUrl('/persons');
   }
}

