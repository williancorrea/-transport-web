import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {AuthService} from '../../security/auth.service';
import {ErroManipuladorService} from '../../core/erro-manipulador.service';
import {Title} from '@angular/platform-browser';
import {ToastyService} from 'ng2-toasty';
import {ControleKmService} from '../controle-km.service';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {ControleKmFiltro} from '../../core/model/ControleKmFiltro';

import * as moment from 'moment';
import {ItinerarioService} from '../../itinerario/itinerario.service';
import {PersonService} from '../../person/person.service';
import {VeiculoService} from '../../veiculo/veiculo.service';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
   selector: 'app-controle-km-pesquisa',
   templateUrl: './controle-km-pesquisa.component.html',
   styleUrls: ['./controle-km-pesquisa.component.css']
})
export class ControleKmPesquisaComponent implements OnInit {

   controleKmList = [];
   controleKmFiltro: ControleKmFiltro;
   controleKmSelecionado = null;
   mostarFiltros: boolean;
   mostrarTelaCarregando: boolean;
   mostrarJanelaEdicao: boolean;
   totalRegistros = 0;

   veiculoList: any;
   itinerarioList: any;
   pessoaList: any;

   variaveisAmbiente: any;
   COLUNAS: any;


   // Variaveis modal edicao
   form: FormGroup;
   translateObj: any;
   loading: boolean;
   msgs: any;

   kmSaidaMinimo: any;
   kmChegadaMaximo: any;


   /*
    * Binds com itens da pagina HTML
    */
   @ViewChild('dataTable') tabelaBind;
   @ViewChild('globalFilter') filtroGlobalBind;
   @ViewChild('f') formBind;


   constructor(private router: Router,
               private traduzir: TranslateService,
               private controleKmService: ControleKmService,
               public auth: AuthService,
               private manipuladorErros: ErroManipuladorService,
               private toasty: ToastyService,
               private confirmacao: ConfirmationService,
               private veiculoService: VeiculoService,
               private itinerarioService: ItinerarioService,
               private pessoaService: PersonService,
               private titulo: Title,
               private formBuild: FormBuilder) {
   }

   /**
    * Executar as informações assim que a página terminar de renderizar
    */
   ngOnInit() {
      this.mostarFiltros = false;
      this.mostrarJanelaEdicao = false;
      this.configForm();
      this.controleKmFiltro = new ControleKmFiltro();

      this.variaveisAmbiente = environment;

      this.setMostrarTelaCarregando(true);
      this.traduzir.get('controleKm').subscribe(s => {
         this.translateObj = s;
         this.titulo.setTitle(s['lista']);

         this.COLUNAS = [
            {field: 'key', header: '', hidden: true, class: ''},
            {
               field: 'dataHoraSaida',
               header: s['campos']['dataHoraSaida'],
               hidden: false,
               class: 'datatable-coluna_data',
               sort: true
            },
            {
               field: 'dataHoraChegada',
               header: s['campos']['dataHoraChegada'],
               hidden: false,
               class: 'datatable-coluna_data',
               sort: true
            },
            {field: 'kmSaida', header: s['campos']['kmSaida'], hidden: false, class: 'datatable-coluna_km', sort: true},
            {
               field: 'kmChegada',
               header: s['campos']['kmChegada'],
               hidden: false,
               class: 'datatable-coluna_km',
               sort: true
            },
            {
               field: 'kmTotal',
               header: s['campos']['kmTotal'],
               hidden: false,
               class: 'datatable-coluna_total',
               sort: false
            },
            {
               field: 'kmNaoInformado',
               header: s['campos']['kmNaoInformado2'],
               hidden: false,
               class: 'datatable-coluna_km_nao_informado',
               sort: false
            }
            // {field: 'veiculo.placa', header: s['campos']['veiculo'], hidden: false, class: ''}
            // {field: 'codigo', header: s['campos']['codigo'], hidden: false, class: 'datatable-collum-field-name'},
            // {field: 'pessoa', header: s['campos']['motorista'], hidden: false, class: ''},
            // {field: 'veiculo', header: s['campos']['veiculo'], hidden: false, class: ''},
            // {field: 'validoAte', header: s['campos']['validoAte'], hidden: false, class: 'datatable-collum-field-name'}
         ];
      });

      this.carregarVeiculos();
      this.carregarItinerarios();
      this.carregarMotoristas();
   }

   // TODO: VERIFICAR A PESQUISA POR PLACA E FROTA
   carregarVeiculos() {
      this.veiculoService.findAll({'rows': 100, 'first': 0, 'sortOrder': 1, 'sortField': 'frota'}, null)
         .then(veiculoList => {
            this.veiculoList = veiculoList.content.map(p => ({label: p.frota + ' - ' + p.placa, value: p.key}));
         })
         .catch(error => {
            this.manipuladorErros.handle(error);
         });
   }

   // TODO: VERIFICAR A PESQUISA POR NOME
   carregarItinerarios() {
      this.itinerarioService.findAll({'rows': 100, 'first': 0, 'sortOrder': 1, 'sortField': 'nome'}, null)
         .then(veiculoList => {
            this.itinerarioList = veiculoList.content.map(p => ({label: p.nome, value: p.key}));
         })
         .catch(error => {
            this.manipuladorErros.handle(error);
         });
   }

   // TODO: BUSCAR SOMENTE OS MOTORISTAS E COLABORADORES
   carregarMotoristas() {
      this.pessoaService.findAll({'rows': 100, 'first': 0, 'sortOrder': 1, 'sortField': 'nome'}, null)
         .then(veiculoList => {
            this.pessoaList = veiculoList.content.map(p => ({label: p.nome, value: p.key}));
         })
         .catch(error => {
            this.manipuladorErros.handle(error);
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
      this.controleKmFiltro = new ControleKmFiltro();
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
      this.controleKmSelecionado = null;
      this.controleKmService.findAll(lazyLoad, this.controleKmFiltro).then(result => {
         this.totalRegistros = result.totalElements;
         this.controleKmList = result.content;
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
      this.msgs = null;
      this.setMostrarTelaCarregando(true);
      this.traduzir.get('controleKm').subscribe(s => {
         this.controleKmService.delete(this.controleKmSelecionado.key)
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

   adicionar() {
      this.kmChegadaMaximo = '';
      this.kmSaidaMinimo = '';
      this.msgs = null;
      this.configForm();

      this.form.reset();
      this.formBind['submitted'] = false;

      this.mostrarJanelaEdicao = true;
   }

   /**
    * Redireciona para a tela de edicao de dados
    */
   edit() {
      this.form.patchValue(this.controleKmSelecionado);
      this.mostrarJanelaEdicao = true;
   }

   cancel() {
      this.mostrarJanelaEdicao = false;
      this.configForm();
   }

   // SALVAR OU  EDITAR DADOS
   setMensagensErro(msg) {
      this.msgs = [{severity: 'warn', summary: '', detail: msg}];
   }

   configForm() {
      this.form = this.formBuild.group({
         key: [null],
         pessoa: this.formBuild.group({
            key: [null, Validators.required]
         }),
         veiculo: this.formBuild.group({
            key: [null, Validators.required]
         }),
         itinerario: this.formBuild.group({
            key: [null, Validators.required]
         }),
         dataHoraSaida: [null, Validators.required],
         dataHoraChegada: [null, Validators.required],
         origem: [
            null, [
               Validators.required,
               Validators.minLength(3),
               Validators.maxLength(150)
            ]
         ],
         destino: [
            null, [
               Validators.required,
               Validators.minLength(3),
               Validators.maxLength(150)
            ]
         ],
         obs: [null, Validators.maxLength(512)],
         kmSaida: [
            null, [
               Validators.required,
               Validators.minLength(1),
               Validators.maxLength(30)
            ]
         ],
         kmChegada: [
            null, [
               Validators.required,
               Validators.minLength(1),
               Validators.maxLength(30)
            ]
         ]
      });



      // this.form = new FormGroup({
      //    key: new FormControl(null),
      //    pessoa: new FormGroup({
      //       key: new FormControl([null, Validators.required])
      //    }),
      //    veiculo: new FormGroup({
      //       key: new FormControl([null, Validators.required])
      //    }),
      //    itinerario: new FormGroup({
      //       key: new FormControl([null, Validators.required])
      //    }),
      //    dataHoraSaida: new FormControl([null, Validators.required]),
      //    dataHoraChegada: new FormControl([null, Validators.required]),
      //    origem: new FormControl([
      //       null, [
      //          Validators.required,
      //          Validators.minLength(3),
      //          Validators.maxLength(150)
      //       ], {updateOn: 'blur'}
      //    ]),
      //    destino: new FormControl([
      //       null, [
      //          Validators.required,
      //          Validators.minLength(3),
      //          Validators.maxLength(150)
      //       ]
      //    ]),
      //    obs: new FormControl([null, Validators.maxLength(512)]),
      //    kmSaida: new FormControl([
      //       null, [
      //          Validators.required,
      //          Validators.minLength(1),
      //          Validators.maxLength(30)
      //       ]
      //    ]),
      //    kmChegada: new FormControl([
      //       null, [
      //          Validators.required,
      //          Validators.minLength(1),
      //          Validators.maxLength(30)
      //       ]
      //    ])
      // }, {updateOn: 'blur'});
   }

   carregarKmSaidaMinimo() {
      this.kmSaidaMinimo = '';
      if (moment(this.form.get('dataHoraSaida').value, 'DD/MM/YYYY HH:mm').isValid() && this.form.get('veiculo').get('key').status === 'VALID') {
         this.controleKmService.buscarKmMinimoASerInformado(this.form.get('dataHoraSaida').value, this.form.get('veiculo').get('key').value)
            .then(response => {
               this.kmSaidaMinimo = Number(response) > 0 ? response : '';
            })
            .catch(error => {
               this.setMensagensErro(this.manipuladorErros.handle(error));
            });
      }
   }

   carregarKmChegadaMaximo() {
      this.kmChegadaMaximo = '';
      if (moment(this.form.get('dataHoraChegada').value, 'DD/MM/YYYY HH:mm').isValid() && this.form.get('veiculo').get('key').status === 'VALID') {
         this.controleKmService.buscarKmMaximoASerInformado(this.form.get('dataHoraChegada').value, this.form.get('veiculo').get('key').value)
            .then(response => {
               this.kmChegadaMaximo = Number(response) > 0 ? response : '';
            })
            .catch(error => {
               this.setMensagensErro(this.manipuladorErros.handle(error));
            });
      }
   }

   salvar() {
      if (this.form.valid) {
         this.setMostrarTelaCarregando(true);
         if (this.form.get('key').value) {
            this.controleKmService.update(this.form.value)
               .then(
                  response => {
                     this.mostrarJanelaEdicao = false;
                     this.toasty.success(this.translateObj['acoes']['atualizar_sucesso']);

                     this.tabelaBind.first = 0;
                     if (this.mostarFiltros) {
                        this.filterFields(this.tabelaBind);
                     } else {
                        this.buscarTodos(this.filtroGlobalBind.nativeElement, this.tabelaBind);
                     }
                  }
               ).catch(error => {
               this.setMensagensErro(this.manipuladorErros.handle(error));
               this.setMostrarTelaCarregando(false);
            });
         } else {
            this.controleKmService.save(this.form.value)
               .then(
                  response => {
                     this.mostrarJanelaEdicao = false;
                     this.toasty.success(this.translateObj['acoes']['adicionar_sucesso']);

                     this.tabelaBind.first = 0;
                     if (this.mostarFiltros) {
                        this.filterFields(this.tabelaBind);
                     } else {
                        this.buscarTodos(this.filtroGlobalBind.nativeElement, this.tabelaBind);
                     }
                  }
               ).catch(error => {
               this.setMensagensErro(this.manipuladorErros.handle(error));
               this.setMostrarTelaCarregando(false);
            });
         }
      } else {
         this.traduzir.get('validation').subscribe(s => {
            this.toasty.warning(s['form_invalid']);
            this.setMensagensErro(s['form_invalid']);
         });
      }
   }


}
