import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from 'ng2-translate';
import {AuthService} from '../../../../security/auth.service';
import {ErroManipuladorService} from '../../../../core/erro-manipulador.service';
import {ToastyService} from 'ng2-toasty';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../../../environments/environment';
import {ClasseDespesaService} from '../classe-despesa.service';
import {ClasseDespesaFiltro} from '../../../../core/model/ClasseDespesaFiltro';

@Component({
   selector: 'app-classe-despesa-pesquisar',
   templateUrl: './classe-despesa-pesquisar.component.html',
   styleUrls: ['./classe-despesa-pesquisar.component.css']
})
export class ClasseDespesaPesquisarComponent implements OnInit {

   classeDespesa = [];
   traduzir: any;
   classeDespesaFiltro: ClasseDespesaFiltro;
   showFilter: boolean;
   classeDespesaSelecionada = null;
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
               private classeDespesaService: ClasseDespesaService,
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
      this.classeDespesaFiltro = new ClasseDespesaFiltro();

      this.env = environment;
      this.setLoading(true);
      this.translate.get('app').subscribe(s => {
         this.traduzir = s;
         this.title.setTitle(this.traduzir['classe-despesa']['lista']);

         this.COLS = [
            {
               field: 'descricao',
               header: this.traduzir['classe-despesa']['campos']['descricao'],
               hidden: false,
               class: ''
            },
            {
               field: 'inativo',
               header: this.traduzir['classe-despesa']['campos']['inativo'],
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
      this.classeDespesaFiltro = new ClasseDespesaFiltro();
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
      this.classeDespesaSelecionada = null;
      this.classeDespesaService.findAll(lazyLoad, this.classeDespesaFiltro).then(result => {
         this.totalRecords = result.totalElements;
         this.classeDespesa = result.content;
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
      this.router.navigateByUrl(this.traduzir['classe-despesa']['link-pagina'] + `/${this.classeDespesaSelecionada.key}`);
   }

   /**
    * Opens the popup to confirm the deletion of the registry
    *
    * @constructor
    */
   ConfirmDeletion() {
      this.confirmation.confirm({
         message: this.traduzir['acoes']['confirmar-exclusao'],
         accept: () => {
            this.delete();
         }
      });
   }

   /**
    * Deletes the selected record
    */
   delete() {
      this.loading = true;
      this.classeDespesaService.delete(this.classeDespesaSelecionada.key)
         .then(() => {
            this.grid.first = 0;
            this.findAll(this.filterGrid.nativeElement, this.grid);
            this.toasty.success(this.traduzir['acoes']['deletar_sucesso']);
            this.loading = false;
         })
         .catch(
            error => {
               this.errorHandler.handle(error);
               this.loading = false;
            }
         );
   }
}
