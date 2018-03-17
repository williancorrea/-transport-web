import {Component, OnInit} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {Router} from '@angular/router';

@Component({
   selector: 'app-bank-search',
   templateUrl: './bank-search.component.html',
   styleUrls: ['./bank-search.component.css']
})
export class BankSearchComponent implements OnInit {

   // banks = bank[];
   banks = [];
   selectedBank: any;

   tableCollumnsName: any[];

   constructor(private router: Router,
               private translate: TranslateService) {
   }

   ngOnInit() {

      this.banks.push({code: '104', name: 'Caixa Economica Federal', url: 'www.caixafederal.com.br'});
      this.banks.push({code: '001', name: 'Banco do Brasil SA', url: 'www.bb.com.br'});
      this.banks.push({code: '223', name: 'Bradesco SA', url: 'www.bradesco.com.br'});

      this.translate.get('bank').subscribe(s => {
         this.tableCollumnsName = [
            {field: 'code', header: s.fields.code, width: '20%' },
            {field: 'name', header: s.fields.name, width: '40%'},
            {field: 'url', header: s.fields.url, width: '40%'}
         ];
      });

   }

}
