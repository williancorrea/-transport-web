import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from 'ng2-translate';
import {Title} from '@angular/platform-browser';
import {Bank} from '../../core/model/bank';
import {BankService} from '../bank.service';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {ToastyService} from 'ng2-toasty';
import {AuthService} from '../../security/auth.service';

@Component({
   selector: 'app-bank-new',
   templateUrl: './bank-new.component.html',
   styleUrls: ['./bank-new.component.css']
})
export class BankNewComponent implements OnInit {

   bank: Bank;
   bankTranslate: any;
   loading: boolean;

   constructor(private router: Router,
               private activatedRoute: ActivatedRoute,
               private translate: TranslateService,
               private title: Title,
               private bankService: BankService,
               private toasty: ToastyService,
               private auth: AuthService,
               private errorHandler: ErrorHandlerService) {
      this.bank = new Bank();
   }

   ngOnInit() {
      this.showLoading(true);
      this.translate.get('bank').subscribe(s => {
         this.bankTranslate = s;

         const isEditing = this.activatedRoute.snapshot.params['key'];
         if (isEditing) {
            this.title.setTitle(s['edit_bank']);

            this.bankService.findOne(isEditing)
               .then(response => {
                  this.bank = response;
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

   showLoading(value: boolean) {
      this.loading = value;
   }

   save(form) {
      if (form.valid) {
         this.showLoading(true);
         if (this.bank.key) {
            this.bankService.update(this.bank)
               .then(
                  response => {
                     this.toasty.success(this.bankTranslate['update_success']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/banks');
                  }
               ).catch(erro => {
               this.errorHandler.handle(erro);
               this.showLoading(false);
            });
         } else {
            this.bankService.save(this.bank)
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
      }
   }

   cancel() {
      this.router.navigateByUrl('/banks');
   }


}
