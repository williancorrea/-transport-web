import {Injectable} from '@angular/core';
import {Bank} from '../core/model/bank';
import {AuthHttp} from 'angular2-jwt';
import {environment} from '../../environments/environment';
import {VeiculoFiltro} from '../core/model/veiculoFiltro';

@Injectable()
export class VeiculoService {
   apiUrl: string;

   constructor(private http: AuthHttp) {
      this.apiUrl = `${environment.apiUrl}/veiculo`;
   }

   /**
    * Lista todos os registro de acordo com os filtros passados por parametros
    *
    * @param filter
    * @param {BankFilters} veiculoFiltro
    * @returns {Promise<any>}
    */
   findAll(filter: any, veiculoFiltro: VeiculoFiltro): Promise<any> {
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


      if (veiculoFiltro) {
         if (veiculoFiltro.placa && veiculoFiltro.placa.length > 0) {
            config.params['placa'] = veiculoFiltro.placa;
         }
         if (veiculoFiltro.frota && veiculoFiltro.frota.length > 0) {
            config.params['frota'] = veiculoFiltro.frota;
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
    * @returns {Promise<Bank>}
    */
   findOne(key): Promise<Bank> {
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
