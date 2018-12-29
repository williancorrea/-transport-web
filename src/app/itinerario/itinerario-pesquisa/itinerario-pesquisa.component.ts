import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '../../security/auth.service';
import {TranslateService} from 'ng2-translate';
import {ErroManipuladorService} from '../../core/erro-manipulador.service';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {environment} from '../../../environments/environment';
import {Title} from '@angular/platform-browser';
import {ItinerarioFiltro} from '../../core/model/itinerarioFiltro';
import {Router} from '@angular/router';
import {ItinerarioService} from '../../itinerario/itinerario.service';
import {ToastyService} from 'ng2-toasty';

import * as moment from 'moment';

@Component({
   selector: 'app-itinerario-pesquisa',
   templateUrl: './itinerario-pesquisa.component.html',
   styleUrls: ['./itinerario-pesquisa.component.css']
})
export class ItinerarioPesquisaComponent implements OnInit {

   itinerarioList = [];
   itinerarioFiltro: ItinerarioFiltro;
   itinerarioSelecionado = null;
   mostarFiltros: boolean;
   mostrarTelaCarregando: boolean;
   totalRegistros = 0;

   variaveisAmbiente: any;
   COLUNAS: any;

   /*
    * Binds com itens da pagina HTML
    */
   @ViewChild('dataTable') tabelaBind;
   @ViewChild('globalFilter') filtroGlobalBind;


   constructor(private router: Router,
               private traduzir: TranslateService,
               private maritalStatusService: ItinerarioService,
               public auth: AuthService,
               private manipuladorErros: ErroManipuladorService,
               private toasty: ToastyService,
               private confirmacao: ConfirmationService,
               private titulo: Title) {
   }

   /**
    * Executar as informações assim que a página terminar de renderizar
    */
   ngOnInit() {
      this.mostarFiltros = false;
      this.itinerarioFiltro = new ItinerarioFiltro();

      this.variaveisAmbiente = environment;

      this.setMostrarTelaCarregando(true);
      this.traduzir.get('itinerario').subscribe(s => {
         this.titulo.setTitle(s['lista']);

         this.COLUNAS = [
            {field: 'key', header: '', hidden: true, class: ''},
            {field: 'codigo', header: s['campos']['codigo'], hidden: false, class: 'datatable-collum-field-name'},
            // {field: 'nome', header: s['campos']['nome'], hidden: false, class: ''},
            // {field: 'descricao', header: s['campos']['descricao'], hidden: false, class: ''},
            // {field: 'validoAte', header: s['campos']['validoAte'], hidden: false, class: 'datatable-collum-field-name'}
         ];
      });
   }

   formatarData(data) {
      return moment(data).utc().format('DD/MM/YYYY');
   }

   /**
    * Apresenta ou esconde a tela de carregando
    *
    * @param carregando
    */
   setMostrarTelaCarregando(carregando) {
      this.mostrarTelaCarregando = carregando;
   }

   /**
    * Mostra mais filtros com campos individuais
    *
    * @param {boolean} value
    */
   mostrarCamposFiltros(value: boolean) {
      this.mostarFiltros = value;
      this.itinerarioFiltro = new ItinerarioFiltro();
      if (this.filtroGlobalBind) {
         this.filtroGlobalBind.nativeElement.value = '';
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
    * Carregamento preguicoso de acordo com as informações passadas nos filtro
    *
    * @param {LazyLoadEvent} lazyLoad
    */
   loadBank(lazyLoad: LazyLoadEvent) {
      this.setMostrarTelaCarregando(true);
      this.itinerarioSelecionado = null;
      this.maritalStatusService.findAll(lazyLoad, this.itinerarioFiltro).then(result => {
         this.totalRegistros = result.totalElements;
         this.itinerarioList = result.content;
         this.setMostrarTelaCarregando(false);
      })
         .catch(error => {
            this.manipuladorErros.handle(error);
         });
   }

   /**
    * Recarrega todos os registros da tabelaBind
    *
    * @param filtro
    * @param dataTable
    */
   buscarTodos(filtro, dataTable) {
      this.setMostrarTelaCarregando(true);
      if (filtro) {
         filtro.value = '';
      }

      this.tabelaBind.first = 0;

      this.mostrarCamposFiltros(false);
      this.setFilterDataTable(filtro, dataTable);
   }

   /**
    * Atribui valores e filtros a Tabela
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
    * Redireciona para a tela de edicao de dados
    */
   edit() {
      this.router.navigateByUrl(`itinerario/${this.itinerarioSelecionado.key}`);
   }

   /**
    * Abre um popup para confirmar a exclusão de um registro
    *
    * @constructor
    */
   confirmarExclusao() {
      this.traduzir.get('actions').subscribe(s => {
         this.confirmacao.confirm({
            message: s['confirm-deletion'],
            accept: () => {
               this.excluir();
            }
         });
      });
   }

   /**
    * Deleta o registro selecionado
    */
   excluir() {
      this.setMostrarTelaCarregando(true);
      this.traduzir.get('itinerario').subscribe(s => {
         this.maritalStatusService.delete(this.itinerarioSelecionado.key)
            .then(() => {
               this.tabelaBind.first = 0;
               this.buscarTodos(this.filtroGlobalBind.nativeElement, this.tabelaBind);
               this.setMostrarTelaCarregando(false);
               this.toasty.success(s['acoes']['deletar_sucesso']);
            })
            .catch(
               error => {
                  this.setMostrarTelaCarregando(false);
                  this.manipuladorErros.handle(error);
               }
            );
      });
   }

}
