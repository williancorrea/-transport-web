import {Component, OnInit, ViewChild} from '@angular/core';
import {CentroDeCustoFiltro} from '../../core/model/CentroDeCustoFiltro';
import {Router} from '@angular/router';
import {TranslateService} from 'ng2-translate';
import {AuthService} from '../../security/auth.service';
import {ErroManipuladorService} from '../../core/erro-manipulador.service';
import {ToastyService} from 'ng2-toasty';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../environments/environment';
import {CentroDeCustoService} from '../centro-de-custo.service';

@Component({
   selector: 'app-centro-de-custo-pesquisar',
   templateUrl: './centro-de-custo-pesquisar.component.html',
   styleUrls: ['./centro-de-custo-pesquisar.component.css']
})
export class CentroDeCustoPesquisarComponent implements OnInit {

   centroDeCusto = [];
   centroDeCustoFiltro: CentroDeCustoFiltro;
   showFilter: boolean;
   centroDeCustoSelecionada = null;
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
               private centroDeCustoService: CentroDeCustoService,
               public auth: AuthService,
               private errorHandler: ErroManipuladorService,
               private toasty: ToastyService,
               private confirmation: ConfirmationService,
               private title: Title) {
   }

   /**
    * Run the information as soon as the page finishes rendering
    */
   ngOnInit() {
      this.showFilter = false;
      this.centroDeCustoFiltro = new CentroDeCustoFiltro();

      this.env = environment;
      this.setLoading(true);
      this.translate.get('centro-de-custo').subscribe(s => {
         this.title.setTitle(s['lista']);

         this.COLS = [
            {
               field: ['classeDespesa']['descricao'],
               header: s['campos']['classe-despesa'],
               hidden: false,
               class: ''
            },
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
      this.centroDeCustoFiltro = new CentroDeCustoFiltro();
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
      this.centroDeCustoSelecionada = null;
      this.centroDeCustoService.findAll(lazyLoad, this.centroDeCustoFiltro).then(result => {
         this.totalRecords = result.totalElements;
         this.centroDeCusto = result.content;
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
      this.router.navigateByUrl(`centroDeCusto/${this.centroDeCustoSelecionada.key}`);
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
      this.translate.get('centro-de-custo').subscribe(s => {
         this.centroDeCustoService.delete(this.centroDeCustoSelecionada.key)
            .then(() => {
               this.grid.first = 0;
               this.findAll(this.filterGrid.nativeElement, this.grid);
               this.toasty.success(s['acoes']['deletar_sucesso']);
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
