import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../security/auth.service';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {Router} from '@angular/router';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {environment} from '../../../environments/environment';
import {Title} from '@angular/platform-browser';
import {PersonFilters} from '../../core/model/personFilters';
import {TranslateService} from 'ng2-translate';
import {PersonService} from '../person.service';
import {ToastyService} from 'ng2-toasty';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.css']
})
export class PersonSearchComponent implements OnInit {

   persons = [];
   personFilters: PersonFilters;
   showFilter: boolean;
   selectedPerson = null;
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
               private personService: PersonService,
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
      this.personFilters = new PersonFilters();

      this.env = environment;
      this.setLoading(true);
      this.translate.get('person').subscribe(s => {
         this.title.setTitle(s['title']);

         this.COLS = [
            {
               field: 'key',
               header: '',
               hidden: true,
               class: ''
            },
            {
               field: 'nome',
               header: s['fields']['name'],
               hidden: false,
               class: ''
            },
            {
               field: 'cliente',
               header: s['fields']['client'],
               hidden: false,
               class: 'datatable-collum-field-boolean'
            },
            {
               field: 'estudante',
               header: s['fields']['student'],
               hidden: false,
               class: 'datatable-collum-field-boolean'
            },
            {
               field: 'fornecedor',
               header: s['fields']['provider'],
               hidden: false,
               class: 'datatable-collum-field-boolean'
            },
            {
               field: 'colaborador',
               header: s['fields']['collaborator'],
               hidden: false,
               class: 'datatable-collum-field-boolean'
            },
            {
               field: 'transportadora',
               header: s['fields']['shippingCompany'],
               hidden: false,
               class: 'datatable-collum-field-boolean'
            },
            {
               field: 'inativo',
               header: s['actions']['deleted'],
               hidden: true,
               class: 'datatable-collum-field-boolean'
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
      this.personFilters = new PersonFilters();
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
      this.selectedPerson = null;
      this.personService.findAll(lazyLoad, this.personFilters).then(result => {
            this.totalRecords = result.totalElements;
            this.persons = result.content;
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
      this.router.navigateByUrl(`persons/${this.selectedPerson.key}`);
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
      this.translate.get('person').subscribe(s => {
         this.personService.delete(this.selectedPerson.key)
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
