import {Injectable} from '@angular/core';
import {LevelOfEducationFilters} from '../core/model/levelOfEducationFilters';
import {AuthHttp} from 'angular2-jwt';
import {environment} from '../../environments/environment';

@Injectable()
export class LevelOfEducationService {

   apiUrl: string;

   constructor(private http: AuthHttp) {
      this.apiUrl = `${environment.apiUrl}/levels-of-education`;
   }

   /**
    * List all records according to the filters passed by parameters
    *
    * @param filter
    * @param {BancoFiltro} levelOfEducationFilters
    * @returns {Promise<any>}
    */
   findAll(grid: any, levelOfEducationFilters: LevelOfEducationFilters): Promise<any> {
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


      if (levelOfEducationFilters.name && levelOfEducationFilters.name.length > 0) {
         config.params['name'] = levelOfEducationFilters.name;
      }
      if (levelOfEducationFilters.description && levelOfEducationFilters.description.length > 0) {
         config.params['description'] = levelOfEducationFilters.description;
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
    * @returns {Promise<any>}
    */
   findOne(key): Promise<any> {
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
    * @param  obj
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
