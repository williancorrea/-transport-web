import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from 'ng2-translate';
import {Title} from '@angular/platform-browser';
import {Bank} from '../../core/model/bank';
import {BankService} from '../bank.service';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {ToastyService} from 'ng2-toasty';

@Component({
   selector: 'app-bank-new',
   templateUrl: './bank-new.component.html',
   styleUrls: ['./bank-new.component.css']
})
export class BankNewComponent implements OnInit {

   bank: Bank;
   bankTranslate: any;

   constructor(private router: Router,
               private activatedRoute: ActivatedRoute,
               private translate: TranslateService,
               private title: Title,
               private bankService: BankService,
               private toasty: ToastyService,
               private errorHandler: ErrorHandlerService) {
      this.bank = new Bank();
   }

   ngOnInit() {
      this.translate.get('bank').subscribe(s => {
         this.bankTranslate = s;

         const isEditing = this.activatedRoute.snapshot.params['key'];
         if (isEditing) {
            this.title.setTitle(s['edit_bank']);

            this.bankService.findOne(isEditing)
               .then(response => {
                  console.log(response);
                  this.bank = response;
               })
               .catch(error => {
                  this.errorHandler.handle(error);
                  this.title.setTitle(s['add_bank']);
               });
         } else {
            this.title.setTitle(s['add_bank']);
         }
      });
   }

   save() {
      if (this.bank.key) {
         this.bankService.update(this.bank)
            .then(
               response => {
                  this.toasty.success(this.bankTranslate['update_success']);

                  this.router.navigateByUrl('/banks');
               }
            ).catch(erro => this.errorHandler.handle(erro));
      } else {
         this.bankService.save(this.bank)
            .then(
               response => {
                  this.toasty.success(this.bankTranslate['add_success']);
                  this.router.navigateByUrl('/banks');
               }
            ).catch(erro => this.errorHandler.handle(erro));
      }
   }

   cancel() {
      this.router.navigateByUrl('/banks');
   }


}
