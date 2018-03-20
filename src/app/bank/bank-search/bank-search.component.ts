import {Component, OnInit} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {Router} from '@angular/router';
import {ConfirmationService, LazyLoadEvent, Message} from 'primeng/api';
import {Bank} from '../../core/model/bank';
import {BankService} from '../bank.service';
import {ToastyService} from 'ng2-toasty';
import {AuthService} from '../../security/auth.service';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {Title} from '@angular/platform-browser';

@Component({
   selector: 'app-bank-search',
   templateUrl: './bank-search.component.html',
   styleUrls: ['./bank-search.component.css']
})
export class BankSearchComponent implements OnInit {

   banks = [];
   selectedBank = null;

   tableCollumnsName: any[];
   loading: boolean;
   totalRecords = 0;


   constructor(private router: Router,
               private translate: TranslateService,
               private bankService: BankService,
               private auth: AuthService,
               private errorHandler: ErrorHandlerService,
               private toasty: ToastyService,
               private confirmation: ConfirmationService,
               private title: Title) {
   }

   ngOnInit() {
      this.setLoading(true);
      this.translate.get('bank').subscribe(s => {
         this.title.setTitle(s['list_of_banks']);

         // this.tableCollumnsName = [
         //    {field: 'id', header: s.fields.code, hidden: true},
         //    {field: 'code', header: s.fields.code, sortable: true, style: {'width': '15%'}},
         //    {field: 'name', header: s.fields.name, sortable: true},
         //    {field: 'url', header: s.fields.url, sortable: true}
         // ];
      });
   }

   setLoading(loading) {
      this.loading = loading;
   }

   loadBank(lazyLoad: LazyLoadEvent) {
      this.setLoading(true);
      this.selectedBank = null;
      this.bankService.findAll(lazyLoad).then(result => {
            this.banks = result.content;
            this.totalRecords = result.totalElements;
            this.setLoading(false);
         })
         .catch(error => {
            this.errorHandler.handle(error);
         });
   }

   findAll(filter, dataTable) {
      this.setLoading(true);
      if (filter) {
         filter.value = '';
      }
      this.loadBank(
         {
            filters: dataTable.filters,
            first: dataTable.first,
            globalFilter: filter.value,
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

   ConfirmDeletion() {
      this.translate.get('actions').subscribe(s => {
         this.confirmation.confirm({
            message: s['confirm-deletion'],
            accept: () => {
               this.delete();
            }
         });
      });
   }

   delete() {
      console.log('Deletar o item selecionado', this.selectedBank);

      // this.lancamentoService.excluir(lancamento.codigo)
      //    .then(() => {
      //       if (this.grid.first === 0) {
      //          this.pesquisar();
      //       } else {
      //          this.grid.first = 0;
      //       }
      //
            this.toasty.success('Lançamento excluído com sucesso!');
      //    })
      //    .catch(erro => this.errorHandler.handle(erro));
   }
}
