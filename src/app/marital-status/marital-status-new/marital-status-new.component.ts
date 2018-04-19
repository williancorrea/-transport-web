import {Component, OnInit} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {AuthService} from '../../security/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MaritalStatusService} from '../../marital-status/marital-status.service';
import {Title} from '@angular/platform-browser';
import {ToastyService} from 'ng2-toasty';

@Component({
   selector: 'app-marital-status-new',
   templateUrl: './marital-status-new.component.html',
   styleUrls: ['./marital-status-new.component.css']
})
export class MaritalStatusNewComponent implements OnInit {

   form: FormGroup;
   translateObj: any;
   loading: boolean;

   constructor(private router: Router,
               private activatedRoute: ActivatedRoute,
               private translate: TranslateService,
               private title: Title,
               private maritalStatusService: MaritalStatusService,
               private toasty: ToastyService,
               public auth: AuthService,
               private errorHandler: ErrorHandlerService,
               private formBuild: FormBuilder) {
   }

   ngOnInit() {
      this.configForm();
      this.showLoading(true);
      this.translate.get('marital-status').subscribe(s => {
         this.translateObj = s;

         const isEditing = this.activatedRoute.snapshot.params['key'];
         if (isEditing) {
            this.title.setTitle(s['actions']['edit']);

            this.maritalStatusService.findOne(isEditing)
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
            this.maritalStatusService.update(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.translateObj['actions']['update_success']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/marital-status');
                  }
               ).catch(error => {
               this.errorHandler.handle(error);
               this.showLoading(false);
            });
         } else {
            this.maritalStatusService.save(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.translateObj['actions']['add_success']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/marital-status');
                  }
               ).catch(erro => {
               this.errorHandler.handle(erro);
               this.showLoading(false);
            });
         }
      }
   }

   cancel() {
      this.router.navigateByUrl('/marital-status');
   }
}
