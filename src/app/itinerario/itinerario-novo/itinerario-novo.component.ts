import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../security/auth.service';
import {TranslateService} from 'ng2-translate';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ItinerarioService} from '../../itinerario/itinerario.service';
import {ToastyService} from 'ng2-toasty';

@Component({
   selector: 'app-itinerario-novo',
   templateUrl: './itinerario-novo.component.html',
   styleUrls: ['./itinerario-novo.component.css']
})
export class ItinerarioNovoComponent implements OnInit {

   form: FormGroup;
   translateObj: any;
   loading: boolean;

   constructor(private router: Router,
               private activatedRoute: ActivatedRoute,
               private translate: TranslateService,
               private title: Title,
               private itinerarioService: ItinerarioService,
               private toasty: ToastyService,
               public auth: AuthService,
               private errorHandler: ErrorHandlerService,
               private formBuild: FormBuilder) {
   }

   ngOnInit() {
      this.configForm();
      this.showLoading(true);
      this.translate.get('itinerario').subscribe(s => {
         this.translateObj = s;

         const isEditing = this.activatedRoute.snapshot.params['key'];
         if (isEditing) {
            this.title.setTitle(s['acoes']['editar']);

            this.itinerarioService.findOne(isEditing)
               .then(response => {
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
         codigo: [
            null, [
               Validators.minLength(1),
               Validators.maxLength(15)
            ]
         ],
         nome: [
            null, [
               Validators.required,
               Validators.minLength(5),
               Validators.maxLength(150)
            ]
         ],
         descricao: [null, Validators.maxLength(512)],
         validoAte: [null, Validators.required],
         ativo: [true]
      });
   }

   showLoading(value: boolean) {
      this.loading = value;
   }

   save() {
      if (this.form.valid) {
         this.showLoading(true);
         if (this.form.get('key').value) {
            this.itinerarioService.update(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.translateObj['acoes']['atualizar_sucesso']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/itinerario');
                  }
               ).catch(error => {
               this.errorHandler.handle(error);
               this.showLoading(false);
            });
         } else {
            this.itinerarioService.save(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.translateObj['acoes']['adicionar_sucesso']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/itinerario');
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
      this.router.navigateByUrl('/itinerario');
   }

}
