import {Component, OnInit} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {Router} from '@angular/router';
import {LazyLoadEvent, Message} from 'primeng/api';
import {Bank} from '../../core/model/bank';

@Component({
   selector: 'app-bank-search',
   templateUrl: './bank-search.component.html',
   styleUrls: ['./bank-search.component.css']
})
export class BankSearchComponent implements OnInit {

   banks = [];
   selectedBank: Bank;

   tableCollumnsName: any[];
   loading: boolean;


   constructor(private router: Router,
               private translate: TranslateService) {
   }

   ngOnInit() {
      this.setLoading(true);

      this.banks.push({id: 1, code: '104', name: 'Caixa Economica Federal', url: 'www.caixafederal.com.br'});
      this.banks.push({id: 2, code: '001', name: 'Banco do Brasil SA', url: 'www.bb.com.br'});
      this.banks.push({id: 3, code: '223', name: 'Bradesco SA', url: 'www.bradesco.com.br'});

      // this.selectedBank = {id: 2, code: '001', name: 'Banco do Brasil SA', url: 'www.bb.com.br'}

      this.translate.get('bank').subscribe(s => {
         this.tableCollumnsName = [
            {field: 'id', header: s.fields.code, hidden: true},
            {field: 'code', header: s.fields.code, sortable: true, style: {'width': '15%'}},
            {field: 'name', header: s.fields.name, sortable: true},
            {field: 'url', header: s.fields.url, sortable: true}
         ];
      });

      this.setLoading(false);
   }

   setLoading(loading) {
      this.loading = loading;
   }

   loadBank(event: LazyLoadEvent) {
      this.setLoading(true);
      //in a real application, make a remote request to load data using state metadata from event
      //event.first = First row offset
      //event.rows = Number of rows per page
      //event.sortField = Field name to sort with
      //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
      //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

      console.log('lazyloading', event);

      this.setLoading(false);
   }


   findAll(filter, dataTable) {
      this.setLoading(true);
      filter.value = '';
      this.selectedBank = null;

      console.log('efetua uma nova busca');

      this.loadBank(
         {
            filters: dataTable.filters,
            first: dataTable.first,
            globalFilter: dataTable.globalFilter,
            multiSortMeta: dataTable.multiSortMeta,
            rows: dataTable.rows,
            sortField: dataTable.sortField,
            sortOrder: dataTable.sortOrder
         }
      );
   }

   edit() {
      console.log('Editar o item selecionado', this.selectedBank);
   }

   delete() {
      console.log('Deletar o item selecionado', this.selectedBank);
   }
}
