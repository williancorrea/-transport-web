import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {MaritalStatusFilters} from '../../core/model/maritalStatusFilters';
import {TranslateService} from 'ng2-translate';
import {AuthService} from '../../security/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {MaritalStatusService} from '../../marital-status/marital-status.service';
import {Title} from '@angular/platform-browser';
import {ToastyService} from 'ng2-toasty';

@Component({
   selector: 'app-marital-status-search',
   templateUrl: './marital-status-search.component.html',
   styleUrls: ['./marital-status-search.component.css']
})
export class MaritalStatusSearchComponent implements OnInit {

   list = [];
   maritalStatusFilters: MaritalStatusFilters;
   showFilter: boolean;
   selectedObj = null;
   loading: boolean;
   totalRecords = 0;
   env: any;
   COLS: any;

   /*
    * Binds with items on html page
    */
   @ViewChild('dataTable') grid;
   @ViewChild('globalFilter') filterGrid;


   constructor(private router: Router,
               private translate: TranslateService,
               private maritalStatusService: MaritalStatusService,
               public auth: AuthService,
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
      this.maritalStatusFilters = new MaritalStatusFilters();

      this.env = environment;
      this.setLoading(true);
      this.translate.get('marital-status').subscribe(s => {
         this.title.setTitle(s['list']);

         this.COLS = [
            {
               field: 'key',
               header: '',
               hidden: true,
               class: ''
            },
            {
               field: 'name',
               header: s['fields']['name'],
               hidden: false,
               class: 'datatable-collum-field-name'
            },
            {
               field: 'description',
               header: s['fields']['description'],
               hidden: false,
               class: ''
            }
         ];
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
      this.maritalStatusFilters = new MaritalStatusFilters();
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
      this.selectedObj = null;
      this.maritalStatusService.findAll(lazyLoad, this.maritalStatusFilters).then(result => {
            this.totalRecords = result.totalElements;
            this.list = result.content;
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

      this.grid.first = 0;

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
   }

   /**
    * Redirects you to the data edit screen
    */
   edit() {
      this.router.navigateByUrl(`marital-status/${this.selectedObj.key}`);
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
      this.setLoading(true);
      this.translate.get('marital-status').subscribe(s => {
         this.maritalStatusService.delete(this.selectedObj.key)
            .then(() => {
               this.grid.first = 0;
               this.findAll(this.filterGrid.nativeElement, this.grid);
               this.setLoading(false);
               this.toasty.success(s['actions']['delete_success']);
            })
            .catch(
               error => {
                  this.setLoading(false);
                  this.errorHandler.handle(error);
               }
            );
      });
   }
}
