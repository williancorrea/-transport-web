import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from 'ng2-translate';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {Title} from '@angular/platform-browser';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {environment} from '../../../environments/environment';
import {AuthService} from '../../security/auth.service';
import {ToastyService} from 'ng2-toasty';
import {ProductUnitService} from '../product-unit.service';
import {ProductUnitFilters} from '../../core/model/productUnitFilters';

@Component({
   selector: 'app-product-unit-search',
   templateUrl: './product-unit-search.component.html',
   styleUrls: ['./product-unit-search.component.css']
})
export class ProductUnitSearchComponent implements OnInit {

   productUnits = [];
   productUnitFilters: ProductUnitFilters;
   showFilter: boolean;
   selectedProductUnit = null;
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
               private productUnitService: ProductUnitService,
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
      this.productUnitFilters = new ProductUnitFilters();

      this.env = environment;
      this.setLoading(true);
      this.translate.get('product_unit').subscribe(s => {
         this.title.setTitle(s['list_of_product_unit']);

         this.COLS = [
            {
               field: 'key',
               header: '',
               hidden: true,
               class: ''
            },
            {
               field: 'initials',
               header: s['fields']['initials'],
               hidden: false,
               class: 'datatable-collum-field-initials'
            },
            {
               field: 'name',
               header: s['fields']['name'],
               hidden: false,
               class: ''
            },
            {
               field: 'canFraction',
               header: s['fields']['canFraction'],
               hidden: false,
               class: ''
            }
         ];
      });
   }

   /**
    * Assigns the value to enable or disable the mostrarTelaCarregando icon in the datatable
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
      this.productUnitFilters = new ProductUnitFilters();
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
      this.selectedProductUnit = null;
      this.productUnitService.findAll(lazyLoad, this.productUnitFilters).then(result => {
            this.totalRecords = result.totalElements;
            this.productUnits = result.content;
            this.setLoading(false);
         })
         .catch(error => {
            this.setLoading(false);
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
      this.router.navigateByUrl(`product-units/${this.selectedProductUnit.key}`);
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
      this.translate.get('product_unit').subscribe(s => {
         this.productUnitService.delete(this.selectedProductUnit.key)
            .then(() => {
               this.grid.first = 0;
               this.findAll(this.filterGrid.nativeElement, this.grid);
               this.toasty.success(s['actions']['delete_success']);
               this.setLoading(false);
            })
            .catch(
               error => {
                  this.errorHandler.handle(error);
                  this.setLoading(false);
               }
            );
      });
   }

}
