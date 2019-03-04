import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {PersonFilters} from '../core/model/PersonFilters';
import {AuthHttp} from 'angular2-jwt';
import * as moment from 'moment';

@Injectable()
export class PersonService {

   apiUrl: string;

   constructor(private http: AuthHttp) {
      this.apiUrl = `${environment.apiUrl}/pessoas`;
   }

   /**
    * List all records according to the filters passed by parameters
    *
    * @param filter
    * @param {BancoFiltro} personFilters
    * @returns {Promise<any>}
    */
   findAll(grid: any, personFilters: PersonFilters): Promise<any> {
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
            'size': grid.rows,
            'page': grid.first / grid.rows,
            'ordemClassificacao': grid.sortOrder > 0 ? 'ASC' : 'DESC',
            'campoOrdenacao': grid.sortField
         }
      };
      if (grid.globalFilter && grid.globalFilter.length > 0) {
         config.params['filtroGlobal'] = grid.globalFilter;
      }

      if (personFilters) {
         if (personFilters.name && personFilters.name.length > 0) {
            config.params['name'] = personFilters.name;
         }
      }

      return this.http.get(`${this.apiUrl}`, config)
         .toPromise()
         .then(response => {

            const lista = response.json();
            for (let i = 0; i < lista.content.length; i++) {
               lista.content[i] = this.formatarCamposDoTipoData(lista.content[i]);
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
   findOne(key): Promise<any> {
      return this.http.get(`${this.apiUrl}/${key}`)
         .toPromise()
         .then(response => {
            let obj = response.json();
            obj = this.formatarCamposDoTipoData(obj);
            return obj;
         });
   }

   formatarCamposDoTipoData(obj): any {

      if (obj['pessoaFisica']) {
         if (obj['pessoaFisica']['dataNascimento']) {
            obj['pessoaFisica']['dataNascimento'] = new Date(obj['pessoaFisica']['dataNascimento']);
         }
         if (obj['pessoaFisica']['dataEmissaoRg']) {
            obj['pessoaFisica']['dataEmissaoRg'] = new Date(obj['pessoaFisica']['dataEmissaoRg']);
         }
         if (obj['pessoaFisica']['cnhVencimento']) {
            obj['pessoaFisica']['cnhVencimento'] = new Date(obj['pessoaFisica']['cnhVencimento']);
         }
      }
      return obj;
   }

   /**
    * Delete the record according to the key passed by parameter
    *
    * @param {String} key
    * @returns {Promise<any>}
    */
   delete(key: String): Promise<any> {
      return this.http.delete(`${this.apiUrl}/${key}`)
         .toPromise()
         .then(() => null);
   }

   /**
    * Save the record
    *
    * @param obj
    * @returns {Promise<any>}
    */
   save(obj): Promise<any> {
      const clone = JSON.parse(JSON.stringify(obj));
      delete clone['key'];
      delete clone['properties'];

      return this.http.post(this.apiUrl,
         JSON.stringify(clone))
         .toPromise()
         .then(response => {
            return response.json();
         });
   }

   /**
    * Updates the registry
    *
    * @param {Person} obj
    * @returns {Promise<any>}
    */
   update(obj): Promise<any> {
      const key = obj.key;

      const clone = JSON.parse(JSON.stringify(obj));
      delete clone['key'];
      delete clone['properties'];

      return this.http.put(`${this.apiUrl}/${key}`,
         JSON.stringify(clone))
         .toPromise()
         .then(response => {
            return response.json();
         });
   }
}
