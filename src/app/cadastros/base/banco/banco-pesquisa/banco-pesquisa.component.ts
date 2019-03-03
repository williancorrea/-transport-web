import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {Router} from '@angular/router';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {BancoService} from '../banco.service';
import {ToastyService} from 'ng2-toasty';
import {AuthService} from '../../../../security/auth.service';
import {ErroManipuladorService} from '../../../../core/erro-manipulador.service';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../../../environments/environment';
import {BancoFiltro} from '../bancoFiltro';

@Component({
   selector: 'app-bank-search',
   templateUrl: './banco-pesquisa.component.html',
   styleUrls: ['./banco-pesquisa.component.css']
})
export class BancoPesquisaComponent implements OnInit {

   bancos = [];
   bancoFiltro: BancoFiltro;
   mostrarFiltros: boolean;
   bancoSelecionado = null;
   loading: boolean;
   totalRecords = 0;
   env: any;
   COLUNAS: any;

   /*
    * Binds com os item da pagina html
    */
   @ViewChild('dataTable') grid;
   @ViewChild('globalFilter') filterGrid;


   constructor(private router: Router,
               private translate: TranslateService,
               private bankService: BancoService,
               public auth: AuthService,
               private errorHandler: ErroManipuladorService,
               private toasty: ToastyService,
               private confirmation: ConfirmationService,
               private title: Title) {
   }

   /**
    * Executar as informações assim que a página terminar de renderizar
    */
   ngOnInit() {
      this.mostrarFiltros = false;
      this.bancoFiltro = new BancoFiltro();

      this.env = environment;
      this.setLoading(true);
      this.translate.get('banco').subscribe(s => {
         this.title.setTitle(s['lista']);

         this.COLUNAS = [
            {
               field: 'key',
               header: '',
               hidden: true,
               class: ''
            },
            {
               field: 'codigo',
               header: s['campos']['codigo'],
               hidden: false,
               class: 'datatable-collum-field-code'
            },
            {
               field: 'nome',
               header: s['campos']['nome'],
               hidden: false,
               class: ''
            },
            {
               field: 'url',
               header: s['campos']['url'],
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
    * Atribui o valor para ativar ou desativar o ícone mostradoTelaCarregando na tabela de dados
    *
    * @param loading
    */
   setLoading(loading) {
      this.loading = loading;
   }

   /**
    * Mostrar mais filtros com campos individuais
    *
    * @param {boolean} value
    */
   showFilterFields(value: boolean) {
      this.mostrarFiltros = value;
      this.bancoFiltro = new BancoFiltro();
      if (this.filterGrid) {
         this.filterGrid.nativeElement.value = '';
      }

   }

   /**
    * Filtrar por campos individuais
    *
    * @param dataTable
    */
   filterFields(dataTable) {
      this.setFilterDataTable(null, dataTable);
   }


   /**
    * Carregar Lazy loading de acordo com as informações passadas nos filtros
    *
    * @param {LazyLoadEvent} lazyLoad
    */
   loadBank(lazyLoad: LazyLoadEvent) {
      this.setLoading(true);
      this.bancoSelecionado = null;
      this.bankService.findAll(lazyLoad, this.bancoFiltro).then(result => {
         this.totalRecords = result.totalElements;
         this.bancos = result.content;
         this.setLoading(false);
      })
         .catch(error => {
            this.setLoading(false);
            this.errorHandler.handle(error);
         });
   }

   /**
    * Recarrega todos os registros do DataTable
    *
    * @param filtro
    * @param dataTable
    */
   findAll(filtro, dataTable) {
      this.setLoading(true);
      if (filtro) {
         filtro.value = '';
      }

      this.grid.first = 0;

      this.showFilterFields(false);
      this.setFilterDataTable(filtro, dataTable);
   }

   /**
    * Atribui valores ao DataTable lazy-loading
    *
    * @param filtro
    * @param dataTable
    */
   setFilterDataTable(filtro, dataTable) {
      this.loadBank(
         {
            filters: dataTable.filters,
            first: 0,
            globalFilter: filtro && filtro.value ? filtro.value : '',
            multiSortMeta: dataTable.multiSortMeta,
            rows: dataTable.rows,
            sortField: dataTable.sortField,
            sortOrder: dataTable.sortOrder
         }
      );
   }

   /**
    * Redireciona você para a tela de edição de dados
    */
   edit() {
      this.router.navigateByUrl(`bancos/${this.bancoSelecionado.key}`);
   }

   /**
    * Abre o pop-up para confirmar a exclusão do registro
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
    * Exclui o registro selecionado
    */
   delete() {
      this.loading = true;
      this.translate.get('banco').subscribe(s => {
         this.bankService.delete(this.bancoSelecionado.key)
            .then(() => {
               this.grid.first = 0;
               this.findAll(this.filterGrid.nativeElement, this.grid);
               this.toasty.success(s['excluir']);
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
