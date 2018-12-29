import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from 'ng2-translate';
import {AuthService} from '../../security/auth.service';
import {ErroManipuladorService} from '../../core/erro-manipulador.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ToastyService} from 'ng2-toasty';
import {ControleKmService} from '../controle-km.service';
import {VeiculoService} from '../../veiculo/veiculo.service';
import {ItinerarioService} from '../../itinerario/itinerario.service';
import {PersonService} from '../../person/person.service';

import * as moment from 'moment';

@Component({
   selector: 'app-controle-km-novo',
   templateUrl: './controle-km-novo.component.html',
   styleUrls: ['./controle-km-novo.component.css']
})
export class ControleKmNovoComponent implements OnInit {

   form: FormGroup;
   translateObj: any;
   loading: boolean;

   veiculoList: any;
   itinerarioList: any;
   pessoaList: any;
   msgs: any;

   kmSaidaMinimo: any;
   kmChegadaMaximo: any;

   constructor(private router: Router,
               private activatedRoute: ActivatedRoute,
               private translate: TranslateService,
               private title: Title,
               private controleKmService: ControleKmService,
               private veiculoService: VeiculoService,
               private itinerarioService: ItinerarioService,
               private pessoaService: PersonService,
               private toasty: ToastyService,
               public auth: AuthService,
               private errorHandler: ErroManipuladorService,
               private formBuild: FormBuilder) {
   }

   ngOnInit() {
      this.msgs = [];
      this.configForm();
      this.showLoading(true);
      this.translate.get('controleKm').subscribe(s => {
         this.translateObj = s;

         this.carregarVeiculos();
         this.carregarItinerarios();
         this.carregarMotoristas();

         const isEditing = this.activatedRoute.snapshot.params['key'];
         if (isEditing) {
            this.title.setTitle(s['acoes']['editar']);

            this.controleKmService.findOne(isEditing)
               .then(response => {
                  this.form.patchValue(response);
                  this.showLoading(false);
               })
               .catch(error => {
                  this.setMensagensErro(this.errorHandler.handle(error));
                  this.title.setTitle(s['acoes']['adicionar']);
                  this.showLoading(false);
               });
         } else {
            this.title.setTitle(s['acoes']['adicionar']);
            this.showLoading(false);
         }
      });
   }

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
   }

   carregarKmSaidaMinimo() {
      this.kmSaidaMinimo = '';
      if (moment(this.form.get('dataHoraSaida').value, 'DD/MM/YYYY HH:mm').isValid() && this.form.get('veiculo').get('key').status === 'VALID') {
         this.controleKmService.buscarKmMinimoASerInformado(this.form.get('dataHoraSaida').value, this.form.get('veiculo').get('key').value)
            .then(response => {
               this.kmSaidaMinimo = Number(response) > 0 ? '( ' + response + ' )' : '';
            })
            .catch(error => {
               this.setMensagensErro(this.errorHandler.handle(error));
            });
      }
   }

   carregarKmChegadaMaximo() {
      console.log('entrou no metodo');
      this.kmChegadaMaximo = '';
      if (moment(this.form.get('dataHoraChegada').value, 'DD/MM/YYYY HH:mm').isValid() && this.form.get('veiculo').get('key').status === 'VALID') {
         this.controleKmService.buscarKmMaximoASerInformado(this.form.get('dataHoraChegada').value, this.form.get('veiculo').get('key').value)
            .then(response => {
               this.kmChegadaMaximo = Number(response) > 0 ?  '( ' + response + ' )' : '';
            })
            .catch(error => {
               this.setMensagensErro(this.errorHandler.handle(error));
            });
      }
   }

   // TODO: VERIFICAR A PESQUISA POR PLACA E FROTA
   carregarVeiculos() {
      this.veiculoService.findAll({'rows': 100, 'first': 0, 'sortOrder': 1, 'sortField': 'frota'}, null)
         .then(veiculoList => {
            this.veiculoList = veiculoList.content.map(p => ({label: p.frota + ' - ' + p.placa, value: p.key}));
         })
         .catch(error => {
            this.setMensagensErro(this.errorHandler.handle(error));
         });
   }

   // TODO: VERIFICAR A PESQUISA POR NOME
   carregarItinerarios() {
      this.itinerarioService.findAll({'rows': 100, 'first': 0, 'sortOrder': 1, 'sortField': 'nome'}, null)
         .then(veiculoList => {
            this.itinerarioList = veiculoList.content.map(p => ({label: p.nome, value: p.key}));
         })
         .catch(error => {
            this.setMensagensErro(this.errorHandler.handle(error));
         });
   }

   // TODO: BUSCAR SOMENTE OS MOTORISTAS E COLABORADORES
   carregarMotoristas() {
      this.pessoaService.findAll({'rows': 100, 'first': 0, 'sortOrder': 1, 'sortField': 'nome'}, null)
         .then(veiculoList => {
            this.pessoaList = veiculoList.content.map(p => ({label: p.nome, value: p.key}));
         })
         .catch(error => {
            this.setMensagensErro(this.errorHandler.handle(error));
         });
   }

   showLoading(value: boolean) {
      this.loading = value;
   }

   save() {
      // console.log(this.form);

      if (this.form.valid) {
         this.showLoading(true);
         if (this.form.get('key').value) {
            this.controleKmService.update(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.translateObj['acoes']['atualizar_sucesso']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/controleKm');
                  }
               ).catch(error => {
               this.setMensagensErro(this.errorHandler.handle(error));
               // this.setMensagensErro(error.json()[0].userMessage);
               this.showLoading(false);
            });
         } else {
            this.controleKmService.save(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.translateObj['acoes']['adicionar_sucesso']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/controleKm');
                  }
               ).catch(error => {
               this.setMensagensErro(this.errorHandler.handle(error));
               this.showLoading(false);
            });
         }
      } else {
         this.translate.get('validation').subscribe(s => {
            this.toasty.warning(s['form_invalid']);
         });
      }
   }

   cancel() {
      this.router.navigateByUrl('/controleKm');
   }

}
