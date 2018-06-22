import { Injectable } from '@angular/core';
import {ItinerarioFiltro} from '../core/model/itinerarioFiltro';
import {environment} from '../../environments/environment';
import {AuthHttp} from 'angular2-jwt';
import {ControleKmFiltro} from '../core/model/ControleKmFiltro';

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
            'sortOrder': filter.sortOrder > 0 ? 'asc' : 'desc'
         }
      };
      if (filter.sortField != null) {
         config.params['sortField'] = filter.sortField;
      }
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
            for (let i = 0; lista.content > 0; i++) {
               // lista.content[i] = new Date(lista.content[i]['validoAte']);
            }
            return lista;
         });
   }

   /**
    * Search for the record according to the key passed by parameter
    *
    * @param key
    * @returns {Promise<any>}
    */
   findOne(key) {
      return this.http.get(`${this.apiUrl}/${key}`)
         .toPromise()
         .then(response => {
            response = response.json();
            // if (response['validoAte']) {
            //    response['validoAte'] = response['validoAte'] ? new Date(response['validoAte']) : response['validoAte'];
            // }

            return response;
         });
   }

   /**
    * Delete the record according to the key passed by parameter
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
    * Save the record
    */
   save(obj) {
      delete obj['key'];
      delete obj['controle'];

      return this.http.post(this.apiUrl,
         JSON.stringify(obj))
         .toPromise()
         .then(response => {
            return response.json();
         });
   }

   /**
    * Updates the registry
    *
    * @param  obj
    */
   update(obj) {
      const key = obj.key;

      delete obj['key'];
      delete obj['controle'];

      return this.http.put(`${this.apiUrl}/${key}`,
         JSON.stringify(obj))
         .toPromise()
         .then(response => {
            return response.json();
         });
   }

}
