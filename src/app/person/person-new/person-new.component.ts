import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../security/auth.service';
import {ErroManipuladorService} from '../../core/erro-manipulador.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from 'ng2-translate';
import {ToastyService} from 'ng2-toasty';
import {PersonService} from '../person.service';
import {EstadoCivilService} from '../../estado-civil/estado-civil.service';

@Component({
   selector: 'app-person-new',
   templateUrl: './person-new.component.html',
   styleUrls: ['./person-new.component.css']
})
export class PersonNewComponent implements OnInit {

   form: FormGroup;
   bankTranslate: any;
   loading: boolean;
   dataAtual: any;
   estadoCivilList;
   sexos: any;

   ocultarSelecaoTipoPessoa: boolean;


   constructor(private router: Router,
               private activatedRoute: ActivatedRoute,
               private translate: TranslateService,
               private title: Title,
               private personService: PersonService,
               private estadoCivilService: EstadoCivilService,
               private toasty: ToastyService,
               public auth: AuthService,
               private errorHandler: ErroManipuladorService,
               private formBuild: FormBuilder) {
   }

   ngOnInit() {
      this.dataAtual = new Date();
      this.configForm();
      this.showLoading(true);
      this.translate.get('person').subscribe(s => {
         this.bankTranslate = s;

         this.sexos = [
            {label: this.bankTranslate['labels']['masculino'], value: 'M'},
            {label: this.bankTranslate['labels']['feminino'], value: 'F'},
         ];

         const isEditing = this.activatedRoute.snapshot.params['key'];

         this.carregarEstadosCivis();
         this.ocultarSelecaoTipoPessoa = false;
         if (isEditing) {
            this.ocultarSelecaoTipoPessoa = true;
            this.title.setTitle(s['actions']['edit']);

            this.personService.findOne(isEditing)
               .then(response => {

                  if (response['tipo'] === 'FISICA') {
                     this.form.removeControl('pessoaJuridica');
                  } else {
                     this.form.removeControl('pessoaFisica');
                  }

                  if (response['pessoaFisica'] && !response['pessoaFisica']['estadoCivil']) {
                     response['pessoaFisica']['estadoCivil'] = {key: null};
                  }

                  this.form.patchValue(response);
                  this.showLoading(false);
               })
               .catch(error => {
                  this.errorHandler.handle(error);
                  this.title.setTitle(s['actions']['add']);
                  this.showLoading(false);
               });
         } else {
            this.title.setTitle(s['actions']['add']);
            this.showLoading(false);
         }
      });
   }

   configForm() {
      this.form = this.formBuild.group({
         key: [null],
         nome: [
            null, [
               Validators.required,
               Validators.minLength(5),
               Validators.maxLength(250)
            ]
         ],
         tipo: ['FISICA'],
         email: [
            null, [
               Validators.maxLength(250)
            ]
         ],
         site: [
            null, [
               Validators.minLength(5),
               Validators.maxLength(250)
            ]
         ],
         cliente: [false],
         estudante: [false],
         fornecedor: [false],
         colaborador: [false],
         transportadora: [false],
         pessoaJuridica: this.formBuild.group({
            cnpj: [
               null, [
                  Validators.required,
                  Validators.minLength(18),
                  Validators.maxLength(18)
               ]
            ],
            fantasia: [
               null, [Validators.maxLength(250)]
            ],
            inscricaoMunicipal: [
               null, [Validators.maxLength(50)]
            ],
            inscricaoEstadual: [
               null, [Validators.maxLength(50)]
            ],
            tipoRegime: [
               null, [Validators.maxLength(20)]
            ],
            crt: [
               null, [Validators.maxLength(50)]
            ],
            suframa: [
               null, [Validators.maxLength(50)]
            ],
         }),
         pessoaFisica: this.formBuild.group({
            cpf: [
               null, [
                  Validators.required,
                  Validators.minLength(14),
                  Validators.maxLength(14)
               ]
            ],
            rg: [
               null, [
                  Validators.maxLength(15)
               ]
            ],
            orgaoRg: [
               null, [
                  Validators.maxLength(6)
               ]
            ],
            dataEmissaoRg: [null],
            dataNascimento: [null],
            sexo: [null, Validators.required],
            naturalidade: [
               null, [
                  Validators.maxLength(250)
               ]
            ],
            nacionalidade: [
               null, [
                  Validators.maxLength(250)
               ]
            ],
            tipoSangue: [
               null, [
                  Validators.maxLength(5)
               ]
            ],
            cnhNumero: [
               null, [
                  Validators.maxLength(30)
               ]
            ],
            cnhCategoria: [
               null, [
                  Validators.maxLength(2)
               ]
            ],
            cnhVencimento: [null],
            tituloEleitoralNumero: [
               null, [
                  Validators.maxLength(30)
               ]
            ],
            tituloEleitoralZona: [
               null, [
                  Validators.maxLength(3)
               ]
            ],
            tituloEleitoralSecao: [
               null, [
                  Validators.maxLength(10)
               ]
            ],
            reservistaNumero: [
               null, [
                  Validators.maxLength(30)
               ]
            ],
            reservistaCategoria: [
               null, [
                  Validators.maxLength(50)
               ]
            ],
            nomeMae: [
               null, [
                  Validators.maxLength(250)
               ]
            ],
            nomePai: [
               null, [
                  Validators.maxLength(250)
               ]
            ],
            estadoCivil: this.formBuild.group({
               key: [null]
            })
         }),
         // listaPessoaEndereco: this.formBuild.array([this.createPessoaEndereco()]),
         listaPessoaEndereco: [[]],
         listaPessoaTelefone: [[]],
         listaPessoaContato: [[]],
         listaPessoaAuditoria: [[]]
      });
   }

   createPessoaEndereco(): FormGroup {
      return this.formBuild.group({
         key: [null],
         logradouro: [
            null, [
               Validators.maxLength(150)
            ]
         ],
         numero: [
            null, [
               Validators.maxLength(15)
            ]
         ],
         complemento: [
            null, [
               Validators.maxLength(80)
            ]
         ],
         bairro: [
            null, [
               Validators.maxLength(100)
            ]
         ],
         cep: [
            null, [
               Validators.maxLength(8)
            ]
         ],
         principal: [false],
         entrega: [false],
         cobranca: [false],
         correspondencia: [false],
         cidade: this.formBuild.group({
            key: [null, Validators.required]
         })
      });
   }

   createPessoaTelefone(): FormGroup {
      return this.formBuild.group({
         key: [null],
         telefoneTipo: [
            null, [
               Validators.required
            ]
         ],
         numero: [
            null, [
               Validators.maxLength(14)
            ]
         ],
         observacao: [
            null, [
               Validators.maxLength(250)
            ]
         ]
      });
   }

   createPessoaContato(): FormGroup {
      return this.formBuild.group({
         key: [null],
         nome: [
            null, [
               Validators.maxLength(150)
            ]
         ],
         email: [
            null, [
               Validators.maxLength(250)
            ]
         ],
         foneComercial: [
            null, [
               Validators.maxLength(14)
            ]
         ],
         foneResidencial: [
            null, [
               Validators.maxLength(14)
            ]
         ],
         foneCelular: [
            null, [
               Validators.maxLength(14)
            ],
         ],
         inativo: [false]
      });
   }

   createPessoaAuditoria(): FormGroup {
      return this.formBuild.group({
         key: [null],
         dataAlteracao: [null],
         objetoAlterado: [null]
      });
   }

   carregarEstadosCivis() {
      this.estadoCivilService.findAll({'rows': 100, 'first': 0, 'sortOrder': 1, 'sortField': 'nome'}, null)
         .then(estadoCivilList => {
            this.estadoCivilList = estadoCivilList.content.map(p => ({label: p.nome, value: p.key}));
         })
         .catch(error => {
            this.errorHandler.handle(error);
         });
   }

   showLoading(value: boolean) {
      this.loading = value;
   }

   save() {
      console.log(this.form);

      this.ocultarSelecaoTipoPessoa = true;
      if (this.form.get('tipo').value === 'FISICA') {
         this.form.removeControl('pessoaJuridica');
      } else {
         this.form.removeControl('pessoaFisica');
      }

      if (this.form.valid) {
         this.showLoading(true);

         if (this.form.get('key').value) {
            this.personService.update(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.bankTranslate['actions']['update_success']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/persons');
                  }
               ).catch(error => {
               this.errorHandler.handle(error);
               this.showLoading(false);
            });
         } else {
            this.personService.save(this.form.value)
               .then(
                  response => {
                     this.toasty.success(this.bankTranslate['actions']['add_success']);
                     this.showLoading(false);
                     this.router.navigateByUrl('/persons');
                  }
               ).catch(erro => {
               this.errorHandler.handle(erro);
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
      this.router.navigateByUrl('/persons');
   }
}

