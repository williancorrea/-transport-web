import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from 'ng2-translate';

@Component({
   selector: 'app-bank-new',
   templateUrl: './bank-new.component.html',
   styleUrls: ['./bank-new.component.css']
})
export class BankNewComponent implements OnInit {

   constructor(private router: Router,
               private translate: TranslateService) {
   }

   ngOnInit() {
      this.translate.use('pt-BR');
   }

}
