import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {Router} from '@angular/router';
import {ConfirmationService, LazyLoadEvent, Message} from 'primeng/api';
import {Bank} from '../../core/model/bank';
import {BankService} from '../bank.service';
import {ToastyService} from 'ng2-toasty';
import {AuthService} from '../../security/auth.service';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';
import {BankFilters} from '../../core/model/bankFilters';

@Component({
   selector: 'app-bank-search',
   templateUrl: './bank-search.component.html',
   styleUrls: ['./bank-search.component.css']
})
export class BankSearchComponent implements OnInit {

   banks = [];
   bankFilters: BankFilters;
   showFilter: boolean;
   selectedBank = null;
   loading: boolean;
   totalRecords = 0;
   env: any;

   /*
    * Binds with items on html page
    */
   @ViewChild('dataTable') grid;
   @ViewChild('globalFilter') filterGrid;


   constructor(private router: Router,
               private translate: TranslateService,
               private bankService: BankService,
               private auth: AuthService,
               private errorHandler: ErrorHandlerService,
               private toasty: ToastyService,
               private confirmation: ConfirmationService,
               private title: Title) {
   }

   /**
    * Run the information as soon as the page finishes rendering
    */
   ngOnInit() {
      this.showFilter = false;
      this.bankFilters = new BankFilters();

      this.env = environment;
      this.setLoading(true);
      this.translate.get('bank').subscribe(s => {
         this.title.setTitle(s['list_of_banks']);
      });
   }

   /**
    * Assigns the value to enable or disable the loading icon in the datatable
    *
    * @param loading
    */
   setLoading(loading) {
      this.loading = loading;
   }

   /**
    * Show more filters with individual fields
    *
    * @param {boolean} value
    */
   showFilterFields(value: boolean) {
      this.showFilter = value;
      this.bankFilters = new BankFilters();
      if (this.filterGrid) {
         this.filterGrid.nativeElement.value = '';
      }

   }

   /**
    * Filter through individual fields
    *
    * @param dataTable
    */
   filterFields(dataTable) {
      this.setFilterDataTable(null, dataTable);
   }


   /**
    * Load lazy datatable according to the information passed in the filters
    *
    * @param {LazyLoadEvent} lazyLoad
    */
   loadBank(lazyLoad: LazyLoadEvent) {
      this.setLoading(true);
      this.selectedBank = null;
      this.bankService.findAll(lazyLoad, this.bankFilters).then(result => {
            this.totalRecords = result.totalElements;
            this.banks = result.content;
            this.setLoading(false);
         })
         .catch(error => {
            this.errorHandler.handle(error);
         });
   }

   /**
    * Reloads all DataTable records
    *
    * @param filter
    * @param dataTable
    */
   findAll(filter, dataTable) {
      this.setLoading(true);
      if (filter) {
         filter.value = '';
      }

      this.showFilterFields(false);
      this.setFilterDataTable(filter, dataTable);
   }

   /**
    * Assigns values to DataTable LazyLoading
    *
    * @param filter
    * @param dataTable
    */
   setFilterDataTable(filter, dataTable) {
      if (this.grid.first === 0) {
         this.loadBank(
            {
               filters: dataTable.filters,
               first: 0,
               globalFilter: filter && filter.value ? filter.value : '',
               multiSortMeta: dataTable.multiSortMeta,
               rows: dataTable.rows,
               sortField: dataTable.sortField,
               sortOrder: dataTable.sortOrder
            }
         );
      } else {
         this.grid.first = 0;
      }
   }

   /**
    * Redirects you to the data edit screen
    */
   edit() {
      this.router.navigateByUrl(`banks/${this.selectedBank.key}`);
   }

   /**
    * Opens the popup to confirm the deletion of the registry
    *
    * @constructor
    */
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

   /**
    * Deletes the selected record
    */
   delete() {
      this.translate.get('bank').subscribe(s => {
         this.bankService.delete(this.selectedBank.key)
            .then(() => {
               if (this.grid.first === 0) {
                  this.findAll(this.filterGrid.nativeElement, this.grid);
               } else {
                  this.filterGrid.nativeElement.value = '';
                  this.grid.first = 0;
               }
               this.toasty.success(s['delete_success']);
            })
            .catch(
               error => this.errorHandler.handle(error)
            );
      });
   }
}
