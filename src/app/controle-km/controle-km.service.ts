import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {AuthHttp} from 'angular2-jwt';
import {ControleKmFiltro} from '../core/model/ControleKmFiltro';

import * as moment from 'moment';

@Injectable()
export class ControleKmService {

   apiUrl: string;

   constructor(private http: AuthHttp) {

      this.apiUrl = `${environment.apiUrl}/controle-km`;
   }

   /**
    * Lista todos os registro de acordo com os filtros passados por parametros
    *
    * @param filter
    * @param {BankFilters} controleKmFiltro
    * @returns {Promise<any>}
    */
   findAll(filter: any, controleKmFiltro: ControleKmFiltro) {
      /*
         in a real application, make a remote request to load data using state metadata from event
         event.first = First row offset
         event.rows = Number of rows per page
         event.sortField = Field name to sort with
         event.sortOrder = Sort order as number, 1 for asc and -1 for dec
         filters: FilterMetadata object having field as key and filter value, filter matchMode as value
      */

      const config = {
         params: {
            'size': filter.rows,
            'page': filter.first / filter.rows,
            'sortOrder': 'desc'
         }
      };
      config.params['sortField'] = 'dataHoraSaida';

      if (filter.globalFilter && filter.globalFilter.length > 0) {
         config.params['filtroGlobal'] = filter.globalFilter;
      }


      // if (controleKmFiltro) {
      //    if (controleKmFiltro.nome && controleKmFiltro.nome.length > 0) {
      //       config.params['nome'] = controleKmFiltro.nome;
      //    }
      //    if (controleKmFiltro.descricao && controleKmFiltro.descricao.length > 0) {
      //       config.params['descricao'] = controleKmFiltro.descricao;
      //    }
      //    if (controleKmFiltro.codigo && controleKmFiltro.codigo.length > 0) {
      //       config.params['codigo'] = controleKmFiltro.codigo;
      //    }
      //    if (controleKmFiltro.validoAte && controleKmFiltro.validoAte.length > 0) {
      //       config.params['validoAte'] = controleKmFiltro.validoAte;
      //    }
      // }

      return this.http.get(`${this.apiUrl}`, config)
         .toPromise()
         .then(response => {
            const lista = response.json();
            for (let i = 0; i < lista.content.length; i++) {
               if (lista.content[i]['dataHoraChegada']) {
                  lista.content[i]['dataHoraChegada'] = moment(lista.content[i]['dataHoraChegada'], 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm').toString();
               }
               if (lista.content[i]['dataHoraSaida']) {
                  lista.content[i]['dataHoraSaida'] = moment(lista.content[i]['dataHoraSaida'], 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm').toString();
               }
            }
            return lista;
         });
   }

   /**
    * Efetua a pesquisa de acordo com o chave passada por paramentro
    *
    * @param key
    * @returns {Promise<any>}
    */
   findOne(key) {
      return this.http.get(`${this.apiUrl}/${key}`)
         .toPromise()
         .then(response => {
            response = response.json();
            if (response['dataHoraChegada']) {
               response['dataHoraChegada'] = moment(response['dataHoraChegada'], 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm').toString();
            }
            if (response['dataHoraSaida']) {
               response['dataHoraSaida'] = moment(response['dataHoraSaida'], 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm').toString();
            }
            return response;
         });
   }

   buscarKmMinimoASerInformado(dataSaida: string, veiculoId: string) {
      const config = {
         params: {
            'veiculoId': veiculoId,
            'dataSaida': moment(dataSaida, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss').toString()
         }
      };
      return this.http.get(`${this.apiUrl}/kmMinimoPeriodo`, config)
         .toPromise()
         .then(response => {
            response = response.json();
            return response;
         });
   }

   buscarKmMaximoASerInformado(dataChegada: string, veiculoId: string) {
      const config = {
         params: {
            'veiculoId': veiculoId,
            'dataChegada': moment(dataChegada, 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss').toString()
         }
      };
      return this.http.get(`${this.apiUrl}/kmMaximoPeriodo`, config)
         .toPromise()
         .then(response => {
            response = response.json();
            return response;
         });
   }




   /**
    * Exclui o registro de acordo com o chave passada por parametro
    *
    * @param {String} key
    * @returns {Promise<any>}
    */
   delete(key: String) {
      return this.http.delete(`${this.apiUrl}/${key}`)
         .toPromise()
         .then(() => null);
   }

   /**
    * Salva o registro
    */
   save(obj) {

      let clone = JSON.parse(JSON.stringify(obj));
      clone = this.formatarDados(clone);

      return this.http.post(this.apiUrl,
         JSON.stringify(clone))
         .toPromise()
         .then(response => {
            return response.json();
         });
   }

   /**
    * Atualiza o registro
    *
    * @param  obj
    */
   update(obj) {
      const key = obj.key;

      let clone = JSON.parse(JSON.stringify(obj));
      clone = this.formatarDados(clone);

      return this.http.put(`${this.apiUrl}/${key}`,
         JSON.stringify(clone))
         .toPromise()
         .then(response => {
            return response.json();
         });
   }

   private formatarDados(obj) {
      delete obj['key'];
      delete obj['controle'];
      obj['dataHoraSaida'] = moment(obj['dataHoraSaida'], 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss').toString();
      obj['dataHoraChegada'] = moment(obj['dataHoraChegada'], 'DD/MM/YYYY HH:mm').format('YYYY-MM-DD HH:mm:ss').toString();
      return obj;
   }

}
