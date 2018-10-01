import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from 'ng2-translate';
import {AuthService} from '../../security/auth.service';
import {ErrorHandlerService} from '../../core/error-handler.service';
import {ToastyService} from 'ng2-toasty';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';
import {ClasseDespezaService} from '../classe-despeza.service';
import {ClasseDespezaFiltro} from '../../core/model/ClasseDespezaFiltro';

@Component({
   selector: 'app-classe-despeza-pesquisar',
   templateUrl: './classe-despeza-pesquisar.component.html',
   styleUrls: ['./classe-despeza-pesquisar.component.css']
})
export class ClasseDespezaPesquisarComponent implements OnInit {

   classeDespeza = [];
   classeDespezaFiltro: ClasseDespezaFiltro;
   showFilter: boolean;
   classeDespezaSelecionada = null;
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
               private classeDespezaService: ClasseDespezaService,
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
      this.classeDespezaFiltro = new ClasseDespezaFiltro();

      this.env = environment;
      this.setLoading(true);
      this.translate.get('classe-despeza').subscribe(s => {
         this.title.setTitle(s['lista']);

         this.COLS = [
            {
               field: 'descricao',
               header: s['campos']['descricao'],
               hidden: false,
               class: ''
            },
            {
               field: 'inativo',
               header: s['campos']['inativo'],
               hidden: false,
               class: 'datatable-collum-field-code'
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
      this.classeDespezaFiltro = new ClasseDespezaFiltro();
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
      this.classeDespezaSelecionada = null;
      this.classeDespezaService.findAll(lazyLoad, this.classeDespezaFiltro).then(result => {
         this.totalRecords = result.totalElements;
         this.classeDespeza = result.content;
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
      this.router.navigateByUrl(`classeDespeza/${this.classeDespezaSelecionada.key}`);
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
      this.loading = true;
      this.translate.get('classe-despeza').subscribe(s => {
         this.classeDespezaService.delete(this.classeDespezaSelecionada.key)
            .then(() => {
               this.grid.first = 0;
               this.findAll(this.filterGrid.nativeElement, this.grid);
               this.toasty.success(s['delete_success']);
               this.loading = false;
            })
            .catch(
               error => {
                  this.errorHandler.handle(error);
                  this.loading = false;
               }
            );
      });
   }
}
