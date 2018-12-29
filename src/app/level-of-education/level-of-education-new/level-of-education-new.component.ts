import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../security/auth.service';
import {ErroManipuladorService} from '../../core/erro-manipulador.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from 'ng2-translate';
import {ToastyService} from 'ng2-toasty';
import {LevelOfEducationService} from '../level-of-education.service';

@Component({
   selector: 'app-level-of-education-new',
   templateUrl: './level-of-education-new.component.html',
   styleUrls: ['./level-of-education-new.component.css']
})
export class LevelOfEducationNewComponent implements OnInit {

   form: FormGroup;
   translateObj: any;
   loading: boolean;

   constructor(private router: Router,
               private activatedRoute: ActivatedRoute,
               private translate: TranslateService,
               private title: Title,
               private levelOfEducationService: LevelOfEducationService,
               private toasty: ToastyService,
               public auth: AuthService,
               private errorHandler: ErroManipuladorService,
               private formBuild: FormBuilder) {
   }

   ngOnInit() {
      this.configForm();
      this.showLoading(true);
      this.translate.get('level-of-education').subscribe(s => {
         this.translateObj = s;

         const isEditing = this.activatedRoute.snapshot.params['key'];
         if (isEditing) {
            this.title.setTitle(s['actions']['edit']);

            this.levelOfEducationService.findOne(isEditing)
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
         ],
         degreeOfInstructionCaged: [null],
         degreeOfInstructionSefip: [null],
         degreeOfInstructionRais: [null]
      });
   }

   showLoading(value: boolean) {
      this.loading = value;
   }

   save() {
      if (this.form.valid) {
         this.showLoading(true);
         if (this.form.get('key').value) {
            this.levelOfEducationService.update(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.translateObj['actions']['update_success']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/levels-of-education');
                  }
               ).catch(error => {
               this.errorHandler.handle(error);
               this.showLoading(false);
            });
         } else {
            this.levelOfEducationService.save(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.translateObj['actions']['add_success']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/levels-of-education');
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
      this.router.navigateByUrl('/levels-of-education');
   }
}
