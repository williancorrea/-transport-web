import {Injectable} from '@angular/core';
import {EstadoCivilFiltro} from '../core/model/estadoCivilFiltro';
import {ProductUnit} from '../core/model/bank';
import {environment} from '../../environments/environment';
import {AuthHttp} from 'angular2-jwt';

@Injectable()
export class EstadoCivilService {

   apiUrl: string;

   constructor(private http: AuthHttp) {
      this.apiUrl = `${environment.apiUrl}/estado-civil`;
   }

   /**
    * Lista todos os registro de acordo com os filtros passados por parametros
    *
    * @param filter
    * @param {BankFilters} maritalStatusFilters
    * @returns {Promise<any>}
    */
   findAll(filter: any, maritalStatusFilters: EstadoCivilFiltro): Promise<any> {
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


      if (maritalStatusFilters) {
         if (maritalStatusFilters.nome && maritalStatusFilters.nome.length > 0) {
            config.params['nome'] = maritalStatusFilters.nome;
         }
         if (maritalStatusFilters.descricao && maritalStatusFilters.descricao.length > 0) {
            config.params['descricao'] = maritalStatusFilters.descricao;
         }
      }

      return this.http.get(`${this.apiUrl}`, config)
         .toPromise()
         .then(response => {
            return response.json();
         });
   }

   /**
    * Search for the record according to the key passed by parameter
    *
    * @param key
    * @returns {Promise<ProductUnit>}
    */
   findOne(key): Promise<ProductUnit> {
      return this.http.get(`${this.apiUrl}/${key}`)
         .toPromise()
         .then(response => {
            return response.json();
         });
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
    * @returns {Promise<any>}
    */
   save(obj): Promise<any> {
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
    * @returns {Promise<any>}
    */
   update(obj): Promise<any> {
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